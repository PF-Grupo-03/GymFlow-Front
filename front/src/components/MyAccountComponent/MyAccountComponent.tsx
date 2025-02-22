import { MyAccountItem, MyAccountItems } from "@/data/MyAccountItems";

import styles from "./MyAccount.module.css";
interface UserData {
  Nombre: string;
  Email: string;
  Telefono: string;
  Dirección: string;
}

const MyAccountComponent = () => {

  
  const userData: UserData = {
    Nombre: "Juan Pérez",
    Email: "juan.perez@example.com",
    Telefono: "+54 9 351 2345678",
    Dirección: "Calle Ficticia 123, Córdoba",
  };

  return (
    <>
      <div className="flex justify-center items-center mt-5 font-holtwood">
        <div
          className={`bg-tertiary rounded-tl-lg rounded-br-lg ${styles.orangeShadow} p-6 w-3/6 flex justify-center items-center mt-5`}
        >
          <span className="text-primary text-4xl">Mi Cuenta</span>
        </div>
      </div>
      <div className="flex justify-center items-center my-10 mb-20">
        <div className={`flex flex-col justify-center items-center mt-5 gap-10 bg-secondary ${styles.whiteShadow} w-2/6 rounded-[10px] px-20 py-12 font-holtwood text-primary`}>
          {MyAccountItems.map((item: MyAccountItem) => {
            const value: string = userData[item.name as keyof UserData];
            return (
              <div key={item.id} className="w-full">
                <span>{item.name}:</span>
                <div className="border-2 rounded-[10px] border-tertiary w-full h-8 text-xs flex justify-center items-center">
                  <span>{value}</span>
                </div>
              </div>
            );
          })}

          <button className="w-full bg-tertiary text-primary rounded-lg p-2 mt-2 hover:bg-orange-400 transition-all duration-300 hover:scale-105">
            Mis Turnos
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccountComponent;
