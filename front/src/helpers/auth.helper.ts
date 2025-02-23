import { Toast } from '@/components/Toast/Toast';
import { IRegister } from '@/interfaces/IRegister';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function Register(userData: IRegister) {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);

    if (response.status === 201) {
      Toast.fire({
        icon: 'success',
        title: '¡Registro Exitoso!',
      });
      return response;
    }
  } catch (error: any) {
    console.log(error);
    Toast.fire({
      icon: 'error',
      title: 'Registro Fallido',
      text: error.response.data.message,
    });
    throw new Error(error);
  }
}
