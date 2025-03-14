import { NEXT_PUBLIC_API_URL } from "@/app/config/envs";
import { IUser } from "@/interfaces/IUserSession";
import axios from "axios";

export const getUsers = async (token: string): Promise<IUser[]> => {
  try {
    if (!token) {
      throw new Error("No se proporcionó un token de autenticación.");
    }

    console.log("Token del usuario:", token);

    const respuesta = await axios.get(`${NEXT_PUBLIC_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Respuesta del back:", respuesta);
    const data: IUser[] = respuesta.data;
    console.log("Usuarios obtenidos:", data);

    const usuariosConMembresia = data.filter((usuario: IUser) =>
      ["USER_BASIC", "USER_PREMIUM", "USER_DIAMOND"].includes(usuario.role)
    );

    console.log("Usuarios con membresía:", usuariosConMembresia);
    return usuariosConMembresia;
  } catch (error) {
    console.error("Error fetching users:", error);
    if ((error as any).response) {
      console.error("Detalles del error:", (error as any).response.data);
      throw new Error(
        (error as any).response.data.message || "Error al obtener los usuarios"
      );
    } else {
      throw new Error("Error de conexión con el servidor.");
    }
  }
};