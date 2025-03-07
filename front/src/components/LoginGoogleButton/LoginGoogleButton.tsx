// components/LoginButton.tsx
import { useRouter } from "next/router";

const LoginGoogleButton = () => {
  const handleLogin = () => {
    window.location.href = "https://gymflow-back.onrender.com/auth/google"; // Redirige al backend
  };

  return <button onClick={handleLogin}>Iniciar sesión con Google</button>;
};

export default LoginGoogleButton;
