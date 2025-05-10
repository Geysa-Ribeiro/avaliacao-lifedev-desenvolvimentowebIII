import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";


function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsLoading,setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); 

  const handleEmailLogin = async(e)=> {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro de login:", error.code, error.message);
      setError(error.message);
      } finally {
        setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setError("Erro ao fazer login com o Google. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className={styles.loginPageContainer}>
   <div className={styles.mainContent}>
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      
      <div className={styles.methodSelector}>
      <button
        className={`${styles.methodTab} ${loginMethod === "email" ? styles.active : ''}`}
        onClick={() => setLoginMethod("email")} 
        >
          Email/Senha
        </button>
      <button
        className={`${styles.methodTab} ${loginMethod === 'google' ? styles.active : ''}`}
        onClick={() => setLoginMethod('google')}
        >
          Google
        </button>
        </div>

      {loginMethod === "email" && (
        <form onSubmit={handleEmailLogin} className={styles.emailForm}>
          <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Digite seu email"
            />
          </div>

          <div className={styles.formGroup}>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={IsLoading}
            className={styles.submitButton}
            >
            {IsLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      )}

      {loginMethod === "google" && (
        <div className={styles.googleLoginContainer}>
          <button
            onClick={handleGoogleLogin}
            className={styles.googleButton}
            disabled={IsLoading}
        >
          <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google Logo"
          className={styles.googleIcon}
          />
          Entrar com Google
        </button>
        </div>
      )}

      <p className={styles.signupLink}>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
      {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  </div>
  );
}


export default Login;