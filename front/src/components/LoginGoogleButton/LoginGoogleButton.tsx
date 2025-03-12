<<<<<<< HEAD
// components/LoginButton.tsx
import { useRouter } from "next/router";

const LoginGoogleButton = () => {
  const handleLogin = () => {
    window.location.href = "https://gymflow-back.onrender.com/auth/google"; // Redirige al backend
  };

  return <button onClick={handleLogin}>Iniciar sesión con Google</button>;
=======
import Image from "next/image";
import { NEXT_PUBLIC_API_URL } from "@/app/config/envs";

const LoginGoogleButton = () => {
  const handleLogin = () => {
    window.location.href = `${NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="flex flex-row justify-center items-center gap-5 bg-primary p-1 rounded-lg text-white">
      <Image
        src="/icons/google-icon.svg"
        alt="Google Icon"
        width={30}
        height={30}
      />
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
    </div>
  );
>>>>>>> fad5864993e575b22134fb4b3cff5d5a8e529d5a
};

export default LoginGoogleButton;
