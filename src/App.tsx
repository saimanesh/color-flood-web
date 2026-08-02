import { useState, useCallback, useEffect } from 'react';
import { LevelData, ProgressState, Screen } from './game/types';
import { generateLevel, LEVELS_PER_WORLD, TOTAL_LEVELS, worldFor } from './game/levelGenerator';
import { worldById, WORLDS } from './game/worlds';
import { loadProgress, saveProgress } from './game/storage';
import ThemedBackground from './components/ThemedBackground';
import { BannerAd, InterstitialAd, RewardedAd } from './components/Ads';
import Modal from './components/Modal';
import HomeScreen from './screens/HomeScreen';
import WorldMap from './screens/WorldMap';
import LevelSelect from './screens/LevelSelect';
import GameScreen from './screens/GameScreen';
import WinScreen from './screens/WinScreen';
import LoseScreen from './screens/LoseScreen';
import Shop from './screens/Shop';
import Settings from './screens/Settings';

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [screen, setScreen] = useState<Screen>('home');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [selectedWorld, setSelectedWorld] = useState<number>(1);

  // Win/lose result for overlays
  const [winResult, setWinResult] = useState<{ moves: number; stars: number } | null>(null);
  const [, setLoseActive] = useState(false);

  // Ads
  const [interstitial, setInterstitial] = useState(false);
  const [, setWinsSinceAd] = useState(0);
  const [rewardedOpen, setRewardedOpen] = useState(false);
  const [extraMoves, setExtraMoves] = useState(0);

  // Modals
  const [howToOpen, setHowToOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Persist progress on change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const theme = worldById(worldFor(currentLevel));
  const palette = progress.colorblind ? theme.cbPalette : theme.palette;
  const levelData: LevelData | null = screen === 'game' || screen === 'win' || screen === 'lose'
    ? generateLevel(currentLevel)
    : null;

  // --- Navigation helpers ---
  const goHome = useCallback(() => {
    setScreen('home');
    setWinResult(null);
    setLoseActive(false);
    setExtraMoves(0);
  }, []);

  const openWorldMap = useCallback(() => {
    setScreen('world-map');
  }, []);

  const openLevelSelect = useCallback((worldId: number) => {
    setSelectedWorld(worldId);
    setScreen('level-select');
  }, []);

  const startLevel = useCallback((level: number) => {
    setCurrentLevel(level);
    setWinResult(null);
    setLoseActive(false);
    setExtraMoves(0);
    setScreen('game');
  }, []);

  // --- Win / lose handlers ---
  const handleWin = useCallback(
    (moves: number, stars: number) => {
      setWinResult({ moves, stars });
      setProgress((p) => {
        const prevStars = p.stars[currentLevel] ?? 0;
        const bestStars = Math.max(prevStars, stars);
        const newUnlocked = Math.max(p.unlocked, Math.min(TOTAL_LEVELS, currentLevel + 1));
        return { ...p, stars: { ...p.stars, [currentLevel]: bestStars }, unlocked: newUnlocked };
      });
      // Interstitial every 4th win
      setWinsSinceAd((n) => {
        const next = n + 1;
        if (next % 4 === 0) {
          setTimeout(() => setInterstitial(true), 900);
        }
        return next;
      });
      setScreen('win');
    },
    [currentLevel]
  );

  const handleLose = useCallback(() => {
    setLoseActive(true);
    setScreen('lose');
  }, []);

  const handleNext = useCallback(() => {
    if (currentLevel < TOTAL_LEVELS) startLevel(currentLevel + 1);
    else goHome();
  }, [currentLevel, startLevel, goHome]);

  const handleRetry = useCallback(() => {
    startLevel(currentLevel);
  }, [currentLevel, startLevel]);

  // --- Rewarded ad: +5 moves ---
  const handleWatchAd = useCallback(() => {
    setRewardedOpen(true);
  }, []);

  const handleRewardedComplete = useCallback(() => {
    setRewardedOpen(false);
    setExtraMoves((m) => m + 5);
    setLoseActive(false);
    setScreen('game');
  }, []);

  // --- Shop purchases ---
  const handleBuy = useCallback(
    (itemId: string) => {
      if (itemId === 'remove-ads') {
        setProgress((p) => ({ ...p, adsRemoved: true }));
      } else if (itemId === 'extra-moves') {
        setExtraMoves((m) => m + 5);
      } else if (itemId === 'unlock-world') {
        setProgress((p) => {
          const currentWorld = Math.ceil(p.unlocked / LEVELS_PER_WORLD);
          const nextWorldStart = (currentWorld) * LEVELS_PER_WORLD + 1;
          if (nextWorldStart > TOTAL_LEVELS) return p;
          return { ...p, unlocked: Math.max(p.unlocked, nextWorldStart) };
        });
      }
    },
    []
  );

  // --- Settings ---
  const handleReset = useCallback(() => {
    const fresh: ProgressState = { unlocked: 1, stars: {}, adsRemoved: false, colorblind: false };
    setProgress(fresh);
    goHome();
  }, [goHome]);

  const toggleColorblind = useCallback((v: boolean) => {
    setProgress((p) => ({ ...p, colorblind: v }));
  }, []);

  // The themed background should reflect the current level's world during game/win/lose,
  // otherwise a neutral dark backdrop.
  const bgTheme = screen === 'game' || screen === 'win' || screen === 'lose' ? theme : WORLDS[1];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Persistent themed background for game-related screens */}
      {(screen === 'game' || screen === 'win' || screen === 'lose' || screen === 'world-map' || screen === 'level-select') && (
        <ThemedBackground theme={bgTheme} />
      )}

      {/* Screens */}
      {screen === 'home' && (
        <HomeScreen
          progress={progress}
          onPlay={openWorldMap}
          onShop={() => setShopOpen(true)}
          onSettings={() => setSettingsOpen(true)}
          onHowTo={() => setHowToOpen(true)}
        />
      )}

      {screen === 'world-map' && (
        <WorldMap progress={progress} onSelect={(w) => openLevelSelect(w)} onBack={goHome} />
      )}

      {screen === 'level-select' && (
        <LevelSelect
          world={worldById(selectedWorld)}
          worldId={selectedWorld}
          progress={progress}
          onSelect={startLevel}
          onBack={openWorldMap}
        />
      )}

      {screen === 'game' && levelData && (
        <GameScreen
          level={levelData}
          theme={theme}
          palette={palette}
          progress={progress}
          onWin={handleWin}
          onLose={handleLose}
          onExit={goHome}
          onShop={() => setShopOpen(true)}
          extraMoves={extraMoves}
        />
      )}

      {screen === 'win' && levelData && winResult && (
        <WinScreen
          theme={theme}
          level={currentLevel}
          moves={winResult.moves}
          maxMoves={levelData.maxMoves}
          stars={winResult.stars}
          hasNext={currentLevel < TOTAL_LEVELS}
          onNext={handleNext}
          onRetry={handleRetry}
          onMenu={goHome}
        />
      )}

      {screen === 'lose' && levelData && (
        <LoseScreen
          theme={theme}
          level={currentLevel}
          maxMoves={levelData.maxMoves + extraMoves}
          adsRemoved={progress.adsRemoved}
          onRetry={handleRetry}
          onMenu={goHome}
          onShop={() => setShopOpen(true)}
          onWatchAd={handleWatchAd}
        />
      )}

      {/* Banner ad (hidden if removed) */}
      <BannerAd hidden={progress.adsRemoved || screen === 'home'} />

      {/* Interstitial after every 4th win */}
      <InterstitialAd open={interstitial} onContinue={() => setInterstitial(false)} />

      {/* Rewarded ad overlay */}
      <RewardedAd
        open={rewardedOpen}
        onComplete={handleRewardedComplete}
        onCancel={() => setRewardedOpen(false)}
      />

      {/* Shop */}
      {shopOpen && <Shop progress={progress} onClose={() => setShopOpen(false)} onBuy={handleBuy} />}

      {/* Settings */}
      {settingsOpen && (
        <Settings
          progress={progress}
          onClose={() => setSettingsOpen(false)}
          onReset={handleReset}
          onToggleColorblind={toggleColorblind}
        />
      )}

      {/* How to Play */}
      <Modal open={howToOpen} onClose={() => setHowToOpen(false)} title="How to Play">
        <div className="space-y-3 text-base leading-relaxed">
          <p>
            Flood the whole board with a single color before you run out of moves!
          </p>
          <p>
            You control the <span className="font-bold text-cyan-300">top-left cell</span>. Tap a
            color button to flood every connected cell of the same color into the new color.
          </p>
          <p>
            Connected cells of the new color join your region automatically. Plan ahead to grow
            your region efficiently.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="font-bold text-yellow-300">3 stars</span>
            <span className="text-white/70">≤ 70% of max moves used</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-yellow-300">2 stars</span>
            <span className="text-white/70">≤ 90% of max moves used</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-yellow-300">1 star</span>
            <span className="text-white/70">solved at all</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
