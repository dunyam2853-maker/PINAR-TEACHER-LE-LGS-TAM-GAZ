import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  Gamepad2,
  Trophy,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Play,
  CheckCircle,
  XCircle,
  Flame,
  Award,
  Layers,
  Compass,
  Rocket
} from "lucide-react";
import confetti from "canvas-confetti";
import { UserAuth } from "../types";

interface ThreeDGamesProps {
  currentUser: UserAuth;
  onActivityLog?: (materialId: string, title: string, actionType: any, details?: string) => void;
}

interface VocabQuestion {
  word: string;
  options: string[];
  correct: number;
  unit: string;
  hint: string;
}

const VOCAB_DATABASE: VocabQuestion[] = [
  { word: "Back up", options: ["Desteklemek", "Yalan söylemek", "Aramak", "Pişirmek"], correct: 0, unit: "Unit 1: Friendship", hint: "To support someone in difficult times" },
  { word: "Count on", options: ["Güvenmek", "Saymak", "Reddetmek", "Ödemek"], correct: 0, unit: "Unit 1: Friendship", hint: "To rely on a trustworthy person" },
  { word: "Unbearable", options: ["Dayanılmaz", "Eğlenceli", "Modaya uygun", "Sakin"], correct: 0, unit: "Unit 2: Teen Life", hint: "Too annoying or painful to tolerate" },
  { word: "Snob", options: ["Kendini beğenmiş", "Cömert", "Çalışkan", "Dürüst"], correct: 0, unit: "Unit 2: Teen Life", hint: "Arrogant, thinks they are better" },
  { word: "Dice", options: ["Küp küp doğramak", "Kaynatmak", "Fırınlamak", "Süzmek"], correct: 0, unit: "Unit 3: In the Kitchen", hint: "Cut food into small square pieces" },
  { word: "Chop", options: ["Doğramak/Kıymak", "Kızartmak", "Yoğurmak", "Rendelemek"], correct: 0, unit: "Unit 3: In the Kitchen", hint: "Cut into pieces with a knife" },
  { word: "Put through", options: ["Telefonda bağlamak", "Kapatmak", "Mesaj bırakmak", "Meşgul olmak"], correct: 0, unit: "Unit 4: On the Phone", hint: "Connect someone on phone line" },
  { word: "Hold on", options: ["Hatta beklemek", "Geri aramak", "Numarayı silmek", "Ulaşamamak"], correct: 0, unit: "Unit 4: On the Phone", hint: "Wait on the phone" },
  { word: "Attachment", options: ["E-posta eki/Dosya", "Şifre", "Ağ bağlantısı", "Ekran görüntüsü"], correct: 0, unit: "Unit 5: The Internet", hint: "Document added to an email" },
  { word: "Adrenaline seeker", options: ["Heyecan tutkunu", "Sakin insan", "Ev kuşu", "Seyirci"], correct: 0, unit: "Unit 6: Adventures", hint: "Loves dangerous & thrilling sports" },
  { word: "All-inclusive", options: ["Her şey dahil", "Yarım pansiyon", "Sadece oda", "Pahalı"], correct: 0, unit: "Unit 7: Tourism", hint: "Includes meals, drinks, and stay" },
  { word: "Vacuum the floor", options: ["Evi süpürmek", "Toz almak", "Bulaşık yıkamak", "Ütü yapmak"], correct: 0, unit: "Unit 8: Chores", hint: "Clean floor with vacuum cleaner" },
  { word: "Conduct experiment", options: ["Deney yapmak", "Teori yazmak", "Kitap okumak", "Ders anlatmak"], correct: 0, unit: "Unit 9: Science", hint: "Perform scientific laboratory test" },
  { word: "Drought", options: ["Kuraklık", "Deprem", "Sel", "Çığ"], correct: 0, unit: "Unit 10: Natural Forces", hint: "Long dry period without rain" }
];

export const ThreeDGames: React.FC<ThreeDGamesProps> = ({ currentUser, onActivityLog }) => {
  const [activeGame, setActiveGame] = useState<"space_runner" | "cube_arena" | "sky_pilot">("space_runner");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Space Runner State
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // 3D Canvas Refs
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const crystalMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Web Audio Synth for crisp sound effects
  const playBeep = (type: "correct" | "wrong" | "bonus") => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "correct") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === "wrong") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(140, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === "bonus") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.16); // G5
        osc.frequency.setValueAtTime(1046.5, audioCtx.currentTime + 0.24); // C6
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch {
      // Audio fallback
    }
  };

  // ----------------------------------------------------
  // Three.js 3D Scene Initialization
  // ----------------------------------------------------
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 320;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x064e3b); // Emerald Deep Dark Green
    scene.fog = new THREE.FogExp2(0x064e3b, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x34d399, 2.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x6ee7b7, 2, 50);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    // 5. 3D Crystal Gem (Center Target)
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.3,
      roughness: 0.2,
      wireframe: false,
      flatShading: true,
    });
    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);
    crystalMeshRef.current = crystal;

    // Wireframe overlay for cyber-emerald look
    const wireGeo = new THREE.IcosahedronGeometry(2.05, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa7f3d0,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    crystal.add(wireMesh);

    // 6. Orbiting Energy Rings
    const ringsGroup = new THREE.Group();
    const ringGeo1 = new THREE.TorusGeometry(3.2, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringsGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa7f3d0, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ringsGroup.add(ring2);

    scene.add(ringsGroup);
    ringsRef.current = ringsGroup;

    // 7. 3D Flying Stardust Particles
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 40;
      starPos[i + 1] = (Math.random() - 0.5) * 40;
      starPos[i + 2] = (Math.random() - 0.5) * 50;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xd1fae5,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);
    particlesRef.current = starField;

    // 8. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (crystalMeshRef.current) {
        crystalMeshRef.current.rotation.x += 0.8 * delta;
        crystalMeshRef.current.rotation.y += 1.2 * delta;
      }
      if (ringsRef.current) {
        ringsRef.current.rotation.z += 0.4 * delta;
        ringsRef.current.rotation.x += 0.3 * delta;
      }
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 2; i < positions.length; i += 3) {
          positions[i] += 12 * delta;
          if (positions[i] > 15) {
            positions[i] = -35;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.innerHTML = "";
      }
      renderer.dispose();
    };
  }, [activeGame]);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameOver || isAnswered) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, isAnswered, timeLeft]);

  const handleStartGame = () => {
    setScore(0);
    setStreak(0);
    setQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(15);
    setGameStarted(true);
    setGameOver(false);

    if (onActivityLog) {
      onActivityLog("3d-space-runner", "3D Kelime Uzay Koşusu", "play", "3D oyun başlatıldı");
    }
  };

  const handleTimeout = () => {
    setIsAnswered(true);
    setStreak(0);
    playBeep("wrong");
    if (crystalMeshRef.current) {
      (crystalMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(0xf43f5e);
    }
    setTimeout(nextQuestion, 1600);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered || gameOver) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = VOCAB_DATABASE[questionIdx];
    const isCorrect = index === currentQ.correct;

    if (isCorrect) {
      const addedPoints = 100 + streak * 25 + timeLeft * 10;
      setScore((prev) => prev + addedPoints);
      setStreak((prev) => prev + 1);

      if (streak + 1 >= 3) {
        playBeep("bonus");
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } else {
        playBeep("correct");
      }

      // 3D Crystal React: Flash bright green & spin faster
      if (crystalMeshRef.current) {
        (crystalMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(0x34d399);
        crystalMeshRef.current.scale.set(1.4, 1.4, 1.4);
        setTimeout(() => {
          if (crystalMeshRef.current) {
            (crystalMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(0x10b981);
            crystalMeshRef.current.scale.set(1, 1, 1);
          }
        }, 500);
      }
    } else {
      setStreak(0);
      playBeep("wrong");
      if (crystalMeshRef.current) {
        (crystalMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(0xf43f5e);
        setTimeout(() => {
          if (crystalMeshRef.current) {
            (crystalMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(0x10b981);
          }
        }, 500);
      }
    }

    setTimeout(nextQuestion, 1500);
  };

  const nextQuestion = () => {
    if (questionIdx + 1 < VOCAB_DATABASE.length) {
      setQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setGameOver(true);
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
      if (onActivityLog) {
        onActivityLog("3d-space-runner", "3D Kelime Uzay Koşusu", "complete", `${score} Puan ile oyunu tamamladı`);
      }
    }
  };

  const currentQ = VOCAB_DATABASE[questionIdx] || VOCAB_DATABASE[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100/90 text-emerald-800 px-3 py-1 rounded-full text-xs font-black mb-1">
              <span>🌸 Özel Güneysu Okulları 3D Oyun Arenası</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              3D Animasyonlu LGS İngilizce Oyunları
            </h2>
            <p className="text-xs text-slate-500">
              Gerçek zamanlı WebGL 3D motoru ile LGS ünite kelimelerini eğlenerek pekiştir!
            </p>
          </div>
        </div>

        {/* Game Mode Selector & Sound Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
            title={soundEnabled ? "Sesi Kapat" : "Sesi Aç"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-rose-500" />}
          </button>
        </div>
      </div>

      {/* Game Mode Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveGame("space_runner")}
          className={`p-4 rounded-2xl border-2 transition text-left flex items-center space-x-3.5 ${
            activeGame === "space_runner"
              ? "bg-emerald-50 border-emerald-500 shadow-sm"
              : "bg-white border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black flex-shrink-0">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-black text-slate-800">3D Uzay Kelime Portalı</div>
            <div className="text-[11px] text-slate-500">3D kristal hedef ve meteor hızında sorular</div>
          </div>
        </button>

        <button
          onClick={() => setActiveGame("cube_arena")}
          className={`p-4 rounded-2xl border-2 transition text-left flex items-center space-x-3.5 ${
            activeGame === "cube_arena"
              ? "bg-emerald-50 border-emerald-500 shadow-sm"
              : "bg-white border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-black text-slate-800">3D Dönen Kelime Küpü</div>
            <div className="text-[11px] text-slate-500">6 yüzlü 3D LGS kalıp & eşanlamlı keşfi</div>
          </div>
        </button>

        <button
          onClick={() => setActiveGame("sky_pilot")}
          className={`p-4 rounded-2xl border-2 transition text-left flex items-center space-x-3.5 ${
            activeGame === "sky_pilot"
              ? "bg-emerald-50 border-emerald-500 shadow-sm"
              : "bg-white border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-green-600 text-white flex items-center justify-center font-black flex-shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-black text-slate-800">3D Gökyüzü Pilotu</div>
            <div className="text-[11px] text-slate-500">Doğru anlam kapılarından uçarak geç</div>
          </div>
        </button>
      </div>

      {/* Main 3D Game Area */}
      <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-lg overflow-hidden relative">
        {/* 3D Canvas Viewport */}
        <div className="relative w-full h-80 sm:h-96 bg-slate-950 overflow-hidden">
          <div ref={mountRef} className="w-full h-full" />

          {/* Overlay Stats Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <div className="flex items-center space-x-2 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/40 text-white text-xs font-bold">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Skor: <strong className="text-emerald-400 font-mono text-sm">{score}</strong></span>
            </div>

            {streak > 1 && (
              <div className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-3.5 py-1.5 rounded-full text-xs font-black shadow-md animate-bounce">
                <Flame className="w-4 h-4" />
                <span>{streak}x SERİ ÇARPAN!</span>
              </div>
            )}

            <div className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-black backdrop-blur-md border ${
              timeLeft <= 5
                ? "bg-rose-900/90 text-rose-200 border-rose-500 animate-pulse"
                : "bg-slate-900/85 text-emerald-300 border-emerald-500/40"
            }`}>
              <Zap className="w-4 h-4" />
              <span>Süre: {timeLeft}s</span>
            </div>
          </div>

          {/* Not Started Splash Screen */}
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white z-20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 animate-pulse">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <h3 className="text-2xl font-black">3D Uzay Kelime Portalı'na Hoş Geldin!</h3>
              <p className="text-xs text-emerald-200/80 max-w-md">
                3D kristal hedeflere odaklan. Ekrana gelen LGS kelimesinin doğru Türkçe anlamını zamana karşı seç, seriyi koru ve en yüksek skora ulaş!
              </p>
              <button
                onClick={handleStartGame}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-sm transition shadow-lg shadow-emerald-500/30 flex items-center space-x-2"
              >
                <span>Oyunu Başlat 🌸</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Game Over Modal */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white z-20 space-y-4 animate-in zoom-in duration-200">
              <Award className="w-16 h-16 text-amber-400 animate-bounce" />
              <h3 className="text-3xl font-black text-emerald-400">Tebrikler! Oyun Tamamlandı 🌸</h3>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/30 space-y-1 text-center min-w-[240px]">
                <div className="text-xs text-slate-400">Toplam Başarı Puanın</div>
                <div className="text-4xl font-black text-emerald-400 font-mono">{score}</div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleStartGame}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tekrar Oyna</span>
                </button>
              </div>
            </div>
          )}

          {/* Active Question Banner inside 3D canvas */}
          {gameStarted && !gameOver && (
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/40 text-white z-10 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xl">
              <div>
                <span className="text-[11px] text-emerald-400 font-bold tracking-wider uppercase block">
                  {currentQ.unit} • İpucu: {currentQ.hint}
                </span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  "{currentQ.word}"
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Soru {questionIdx + 1} / {VOCAB_DATABASE.length}
              </span>
            </div>
          )}
        </div>

        {/* Option Select Buttons (Interactive Controller) */}
        {gameStarted && !gameOver && (
          <div className="p-5 bg-emerald-50/50 border-t-2 border-emerald-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "bg-white hover:bg-emerald-50 border-emerald-200 text-slate-800";
                if (isAnswered) {
                  if (idx === currentQ.correct) {
                    btnStyle = "bg-emerald-600 text-white border-emerald-600 shadow-md font-black";
                  } else if (idx === selectedOption) {
                    btnStyle = "bg-rose-500 text-white border-rose-500 shadow-md font-black";
                  } else {
                    btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(idx)}
                    className={`p-4 rounded-2xl border-2 text-sm font-bold transition flex items-center justify-between text-left shadow-2xs ${btnStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && idx === currentQ.correct && (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correct && (
                      <XCircle className="w-5 h-5 text-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
