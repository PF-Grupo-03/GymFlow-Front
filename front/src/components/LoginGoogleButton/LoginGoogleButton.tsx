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
};

export default LoginGoogleButton;
