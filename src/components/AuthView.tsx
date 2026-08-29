import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Lock,
  User,
  GraduationCap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Flower2,
  Heart,
  UserPlus,
  LogIn,
  KeyRound,
  ShieldCheck
} from "lucide-react";
import { UserAuth } from "../types";

interface AuthViewProps {
  onLoginSuccess: (user: UserAuth) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<"student_login" | "student_register" | "teacher_login">("student_login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [registeredUsername, setRegisteredUsername] = useState<string | null>(null);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Focus password input after redirecting to login post-registration
  useEffect(() => {
    if (authMode === "student_login" && successMsg) {
      const timer = setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [authMode, successMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      setErrorMsg("Lütfen kullanıcı adı ve şifrenizi eksiksiz giriniz.");
      return;
    }

    if (authMode === "student_register") {
      if (cleanUsername.length < 3) {
        setErrorMsg("Kullanıcı adınız en az 3 karakter olmalıdır.");
        return;
      }
      if (password.length < 4) {
        setErrorMsg("Şifreniz en az 4 karakter olmalıdır.");
        return;
      }
      if (confirmPassword && password !== confirmPassword) {
        setErrorMsg("Girdiğiniz şifreler birbiriyle uyuşmuyor.");
        return;
      }
    }

    setLoading(true);

    try {
      if (authMode === "student_register") {
        const res = await fetch("/api/auth/register-student", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: cleanUsername, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Kayıt işlemi başarısız oldu.");
        }

        // 1. Save username
        setRegisteredUsername(cleanUsername);
        setUsername(cleanUsername);
        setPassword("");
        setConfirmPassword("");

        // 2. Set success message and redirect to login screen
        setSuccessMsg(`🌸 Harika! "${cleanUsername}" adına kaydınız başarıyla oluşturuldu. Lütfen şifrenizi girerek giriş yapınız.`);
        setAuthMode("student_login");
      } else {
        const expectedRole = authMode === "teacher_login" ? "teacher" : "student";
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: cleanUsername,
            password,
            expectedRole,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Giriş başarısız oldu.");
        }

        onLoginSuccess(data.user);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "İşlem sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillTeacherCredentials = (name: string) => {
    setUsername(name);
    setPassword("12345");
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const switchToRegister = () => {
    setAuthMode("student_register");
    setErrorMsg(null);
    setSuccessMsg(null);
    setPassword("");
    setConfirmPassword("");
  };

  const switchToLogin = () => {
    setAuthMode("student_login");
    setErrorMsg(null);
    setSuccessMsg(null);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/60 to-green-100/50 py-8 px-4 flex flex-col justify-center items-center relative overflow-hidden font-sans">
      {/* Decorative Floral Background Elements */}
      <div className="absolute top-8 left-8 text-emerald-200/50 pointer-events-none animate-pulse">
        <Flower2 className="w-28 h-28" />
      </div>
      <div className="absolute bottom-8 right-8 text-green-200/60 pointer-events-none">
        <Flower2 className="w-36 h-36" />
      </div>
      <div className="absolute top-1/3 right-12 text-teal-200/40 pointer-events-none">
        <Flower2 className="w-16 h-16" />
      </div>
      <div className="absolute bottom-24 left-12 text-emerald-300/30 pointer-events-none">
        <Flower2 className="w-20 h-20" />
      </div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-emerald-100 p-6 sm:p-8 relative z-10 space-y-5">
        {/* Floral Top Banner */}
        <div className="text-center space-y-2">
          <div className="flex flex-col items-center space-y-1">
            <div className="inline-flex items-center justify-center space-x-1.5 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-black border border-emerald-200 shadow-2xs">
              <span>🏫 Özel Güneysu Okulları</span>
            </div>
            <div className="inline-flex items-center justify-center space-x-2 bg-emerald-600 text-white px-3.5 py-1 rounded-full text-xs font-black shadow-2xs">
              <span className="text-sm">🌸</span>
              <span>Pınar Teacher ile Tam Gaz LGS 🚀</span>
              <span className="text-sm">✨</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight pt-1">
            {authMode === "student_login" && "Öğrenci Girişi 🌿"}
            {authMode === "student_register" && "Yeni Öğrenci Kaydı 🌸"}
            {authMode === "teacher_login" && "Öğretmen & Yönetici Paneli 🎓"}
          </h1>

          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            {authMode === "student_login" && "Kayıtlı kullanıcı adınız ve şifrenizle giriş yapınız."}
            {authMode === "student_register" && "Kayıtlı değilseniz sadece bir kullanıcı adı ve şifre belirleyerek hemen kaydolabilirsiniz. Kayıttan sonra giriş ekranına yönlendirileceksiniz."}
            {authMode === "teacher_login" && "MEB 8. Sınıf müfredat yönetimi, öğrenci takibi ve ödev atama merkezi."}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-emerald-50/90 p-1.5 rounded-2xl border border-emerald-100 text-xs font-bold text-center">
          <button
            type="button"
            onClick={switchToLogin}
            className={`py-2 px-1 rounded-xl transition flex items-center justify-center space-x-1 ${
              authMode === "student_login"
                ? "bg-white text-emerald-800 shadow-xs font-black border border-emerald-200"
                : "text-slate-600 hover:text-emerald-700"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Giriş Yap</span>
          </button>

          <button
            type="button"
            onClick={switchToRegister}
            className={`py-2 px-1 rounded-xl transition flex items-center justify-center space-x-1 ${
              authMode === "student_register"
                ? "bg-white text-emerald-800 shadow-xs font-black border border-emerald-200"
                : "text-slate-600 hover:text-emerald-700"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kayıt Ol 🌸</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode("teacher_login");
              setErrorMsg(null);
              setSuccessMsg(null);
              setPassword("");
              setConfirmPassword("");
            }}
            className={`py-2 px-1 rounded-xl transition flex items-center justify-center space-x-1 ${
              authMode === "teacher_login"
                ? "bg-white text-indigo-700 shadow-xs font-black border border-indigo-200"
                : "text-slate-600 hover:text-indigo-700"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Öğretmen</span>
          </button>
        </div>

        {/* Status Alert for Success (e.g., Post Registration Redirection) */}
        {successMsg && (
          <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-xs p-4 rounded-2xl flex items-start space-x-2.5 shadow-2xs animate-in fade-in zoom-in duration-200">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-black block text-emerald-800">Kayıt Başarılı! Giriş Ekranına Yönlendirildiniz.</strong>
              <p className="leading-relaxed font-medium">{successMsg}</p>
            </div>
          </div>
        )}

        {/* Status Alert for Error */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-2xl flex items-start space-x-2 shadow-2xs animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
            <div className="flex-1 space-y-1">
              <p className="font-medium">{errorMsg}</p>
              {authMode === "student_login" && (
                <button
                  type="button"
                  onClick={switchToRegister}
                  className="text-emerald-700 font-bold underline hover:text-emerald-900 block text-[11px] mt-1"
                >
                  🌸 Henüz kayıt olmadıysanız buraya tıklayarak 10 saniyede kayıt olabilirsiniz!
                </button>
              )}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kullanıcı Adı:</span>
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={
                authMode === "teacher_login"
                  ? "Örn: Pınar PEKER veya Feyza Demirci"
                  : "Örn: can_8a veya elif_yildiz"
              }
              className="w-full bg-white border-2 border-emerald-200/90 rounded-2xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 shadow-2xs font-medium"
            />
            {authMode === "student_register" && (
              <p className="text-[11px] text-slate-400 mt-1">
                E-posta veya telefon gerekmez. Sadece bir kullanıcı adı belirleyin.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Şifre:</span>
            </label>
            <input
              ref={passwordInputRef}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={authMode === "student_register" ? "En az 4 karakter şifre belirleyin" : "Şifrenizi giriniz"}
              className="w-full bg-white border-2 border-emerald-200/90 rounded-2xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 shadow-2xs font-medium"
            />
          </div>

          {authMode === "student_register" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Şifre Tekrarı:</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifrenizi tekrar yazınız"
                className="w-full bg-white border-2 border-emerald-200/90 rounded-2xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 shadow-2xs font-medium"
              />
            </div>
          )}

          {/* Teacher Quick Helper Preset Buttons */}
          {authMode === "teacher_login" && (
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 space-y-1.5 text-xs">
              <div className="text-[11px] font-bold text-indigo-900">Öğretmen / Yönetici Hızlı Seçim:</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleFillTeacherCredentials("Pınar PEKER")}
                  className="bg-white hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg font-bold border border-indigo-200 text-[11px] transition shadow-2xs"
                >
                  Pınar PEKER (Şifre: 12345)
                </button>
                <button
                  type="button"
                  onClick={() => handleFillTeacherCredentials("Feyza Demirci")}
                  className="bg-white hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg font-bold border border-indigo-200 text-[11px] transition shadow-2xs"
                >
                  Feyza Demirci (Şifre: 12345)
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-2xl text-sm font-black text-white shadow-md transition flex items-center justify-center space-x-2 ${
              authMode === "teacher_login"
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
            } disabled:opacity-50`}
          >
            {loading ? (
              <span>İşlem Yapılıyor...</span>
            ) : (
              <>
                <span>
                  {authMode === "student_login" && "Giriş Yap ve Başla 🌸"}
                  {authMode === "student_register" && "Kayıt Ol ve Girişe Yönlendir ✨"}
                  {authMode === "teacher_login" && "Öğretmen Paneline Giriş 🎓"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Clear Toggle Prompt at Bottom */}
        <div className="pt-2 border-t border-emerald-50 text-center">
          {authMode === "student_login" && (
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
              <p className="text-xs text-slate-600">
                Hesabın yok mu?{" "}
                <button
                  type="button"
                  onClick={switchToRegister}
                  className="text-emerald-700 hover:text-emerald-900 font-black underline ml-1"
                >
                  Buradan Kayıt Ol 🌸
                </button>
              </p>
            </div>
          )}

          {authMode === "student_register" && (
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
              <p className="text-xs text-slate-600">
                Zaten kayıtlı mısın?{" "}
                <button
                  type="button"
                  onClick={switchToLogin}
                  className="text-emerald-700 hover:text-emerald-900 font-black underline ml-1"
                >
                  Giriş Ekranına Dön 🌿
                </button>
              </p>
            </div>
          )}

          {authMode === "teacher_login" && (
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-600">
                Öğrenci misiniz?{" "}
                <button
                  type="button"
                  onClick={switchToLogin}
                  className="text-indigo-600 hover:text-indigo-800 font-black underline ml-1"
                >
                  Öğrenci Girişi / Kaydına Git 🌸
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Cheerful Bottom Motto */}
        <div className="text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center space-x-1">
            <span>🌿 Çiçek kokulu başarılar dileriz</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" />
          </p>
        </div>
      </div>
    </div>
  );
};
