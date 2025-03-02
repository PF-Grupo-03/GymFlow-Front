"use client";

import { MyAccountItem, MyAccountItems } from "@/data/MyAccountItems";
import styles from "./MyAccount.module.css";
import { useEffect, useState } from "react";
import TitleBox from "../TitleBox/TitleBox";
import { useRouter } from "next/navigation";

interface UserData {
  Nombre: string;
  Email: string;
  Telefono: string;
  Dirección: string;
  DNI: string;
}

const MyAccountComponent = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("userSession");

    if (user) {
      const userParsed = JSON.parse(user);

      const { nameAndLastName, email, phone, address, dni } = userParsed.user;
      
      setUserData({
        Nombre: nameAndLastName,
        Email: email,
        Telefono: phone,
        Dirección: address,
        DNI: dni,
      });
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-5 font-holtwood">
        <TitleBox title="Mi Cuenta" />
      </div>
      <div className="flex justify-center items-center my-10 mb-20 mx-6 sm:mx-12 md:mx-20 lg:mx-32 xl:mx-48"> {/* Margen horizontal aumentado */}
        <div className={`flex flex-col justify-center items-center mt-5 gap-10 bg-secondary ${styles.whiteShadow} w-full sm:w-5/6 md:w-3/4 lg:w-1/2 xl:w-2/5 rounded-[10px] px-4 sm:px-8 md:px-12 py-8 sm:py-12 font-holtwood text-primary`}>
          {MyAccountItems.map((item: MyAccountItem) => {
            const value: string = userData ? userData[item.name as keyof UserData] : "";
            return (
              <div key={item.id} className="w-full">
                <span>{item.name}:</span>
                <div className="border-2 rounded-[10px] border-tertiary w-full h-8 text-xs flex justify-center items-center">
                  <span>{value}</span>
                </div>
              </div>
            );
          })}
          <button className="w-full bg-tertiary text-primary rounded-lg p-2 mt-2 hover:bg-orange-400 transition-all duration-300 hover:scale-105" onClick={() => router.push("/MyTurns")}>
            Mis Turnos
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccountComponent;