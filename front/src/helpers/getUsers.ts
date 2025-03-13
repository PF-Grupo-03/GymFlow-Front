import { NEXT_PUBLIC_API_URL } from "@/app/config/envs";
import { IUser } from "@/interfaces/IUserSession";

import axios from "axios";

export const getUsers = async (): Promise<IUser[]> => {
    try {
      const respuesta = await axios.get(`${NEXT_PUBLIC_API_URL}/users`);

      const data: IUser[] = await respuesta.data;
      console.log("Usuarios obtenidos:", data);

      const usuariosConMembresia = data.filter((usuario: IUser) => 
        ["USER_BASIC", "USER_PREMIUM", "USER_DIAMOND"].includes(usuario.role)
      );

      console.log("Usuarios con membresía:", usuariosConMembresia);
      return usuariosConMembresia;
    } catch (error) {
      console.error("Error fetching users:", error);
      return []; 
    }
  };