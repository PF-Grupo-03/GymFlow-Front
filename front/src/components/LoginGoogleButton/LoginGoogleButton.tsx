import Image from "next/image";
import GoogleIcon from "../../../public/icons/google-icon.svg"
import { NEXT_PUBLIC_API_URL } from "@/app/config/envs";

const LoginGoogleButton = () => {
  const handleLogin = () => {
    window.location.href = `${NEXT_PUBLIC_API_URL}/auth/google/redirect`;
  };

  return (
    <div className="flex flex-row justify-center items-center gap-5 bg-primary p-1 rounded-lg text-white">
    <Image src={GoogleIcon} alt="Google Icon" width={30} height={30} />
    <button onClick={handleLogin}>Iniciar sesión con Google</button>
    </div>
  ) 
};

export default LoginGoogleButton;
