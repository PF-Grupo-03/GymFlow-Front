/* import { Toast } from "@/components/Toast/Toast";
import { IRegister } from "@/interfaces/IRegister";


export async function Register(userData: IRegister) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
      userData
    );

    if (response.status === 201) {
      Toast.fire({
        icon: 'success',
        title: 'Registration Successful',
      });
      return response;
    }
  } catch (error: any) {
    console.log(error);
    Toast.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: error.response.data.message,
    });
    throw new Error(error);
  }
} */
