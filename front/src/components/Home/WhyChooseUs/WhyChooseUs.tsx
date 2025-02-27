import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto flex flex-col md:flex-row items-stretch px-6 gap-8">
        
        <div className="md:w-1/2 flex flex-col justify-between p-6 h-full flex-1 order-2 md:order-1">
          <h2 className="font-holtwood text-xl text-center md:text-2xl font-bold text-secondary order-1">
            ¿Por qué elegirnos?
          </h2>
          <h2 className="font-holtwood text-center text-xl md:text-2xl font-bold text-tertiary mb-6 mt-6 order-2">
            SOMOS LOS MEJORES
          </h2>
          <p className="font-ibm text-secondary text-sm md:text-base mb-10 order-3">
            ¡En <strong>GYMFlow</strong>, llevamos tu entrenamiento al siguiente nivel! Ofrecemos un espacio para todos, desde principiantes hasta atletas, con equipos de alta calidad y un ambiente motivador. Superá tus límites y sentite increíble cada día.
          </p>
          
          <div className="order-4 md:hidden w-full h-auto flex justify-center">
            <Image
              src="/GymFlowElegirnos/elegirnos.png" 
              alt="Gym Flow"
              width={500}
              height={200}
              className="w-full h-auto object-cover shadow-lg"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center order-5">
            <div className="flex flex-col items-start">
              <div className="flex items-center mb-4">
                <h3 className="font-holtwood text-sm md:text-base font-bold text-tertiary flex-1 h-auto">
                  PLANES DE ENTRENAMIENTO PERSONALIZADOS
                </h3>
                <Image
                  src="/GymFlowElegirnos/planes.png"
                  alt="Planes Personalizados"
                  width={100}
                  height={100}
                  className="h-full object-contain"
                />
              </div>
              <p className="font-ibm text-secondary text-sm md:text-base mt-4">
                Nuestras rutinas personalizadas están diseñadas para adaptarse a tus objetivos y nivel de condición física. Contamos con entrenadores que crean planes específicos para mejorar fuerza, resistencia o tonificación, asegurando un progreso eficiente y seguro.
              </p>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="flex items-center mb-8 ">
                <h3 className="font-holtwood text-sm md:text-base font-bold text-tertiary flex-1 h-auto">
                  ZONAS DE ENTRENAMIENTO PERSONALIZADO
                </h3>
                <Image
                  src="/GymFlowElegirnos/zonas.png"
                  alt="Zonas de Entrenamiento"
                  width={100}
                  height={100}
                  className="h-full object-contain"
                />
              </div>
              <p className="font-ibm text-secondary text-sm md:text-base">
                Nuestras zonas de entrenamiento personalizadas están diseñadas para maximizar tu rendimiento. Contamos con espacios equipados para fuerza, cardio, funcional y más, adaptados a diferentes niveles y objetivos para que entrenes de forma eficiente y enfocada.
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex-1 min-h-[100%] hidden md:flex justify-center items-center h-full order-1 md:order-2">
          <div className="w-full h-full">
            <Image
              src="/GymFlowElegirnos/elegirnos.png" 
              alt="Gym Flow"
              width={500}
              height={200}
              className="w-full h-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
