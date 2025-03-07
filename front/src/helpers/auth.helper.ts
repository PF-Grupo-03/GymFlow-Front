import { Toast } from '@/components/Toast/Toast';
import { ILogin } from '@/interfaces/ILogin';
import { IRegister } from '@/interfaces/IRegister';
import { IUserSession } from '@/interfaces/IUserSession';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function Register(userData: IRegister) {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    console.log("Response completa:", response);

    if (response.status === 201) {
      return response;
    }
  } catch (error: any) {
    console.log("Error en la petición:", error);
    console.log("URL llamada:", `${API_URL}/auth/signup`);

    if (error.response) {
      console.log("Error response:", error.response);

      Toast.fire({
        icon: "error",
        title: "Registro Fallido",
        text: error.response.data?.message || "Error desconocido",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Registro Fallido",
        text: "No se pudo conectar con el servidor",
      });
    }

    throw new Error(error);
  }
}


export async function Login(userData: ILogin) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      userData
    );

    console.log('Received response:', response);

    if (response.status === 200 || response.status === 201) {
      Toast.fire({
        icon: 'success',
        title: 'Acceso Concedido',
      });
      return response;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error: any) {
    console.error('Login error details:', error);
    Toast.fire({
      icon: 'error',
      title: 'Acceso Denegado',
      text: error.response?.data?.message || error.message,
    });
    throw error;
  }
}
