import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-stretch px-6 gap-8">
       
        <div className="md:w-1/2 flex flex-col justify-between p-6 shadow-md rounded-2xl h-full flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegirnos?
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
            SOMOS LOS MEJORES
          </h1>
          <p className="text-gray-700 mb-6">
            ¡En <strong>GYMFlow</strong>, llevamos tu entrenamiento al siguiente nivel! Ofrecemos un espacio para todos, desde principiantes hasta atletas, con equipos de alta calidad y un ambiente motivador. Superá tus límites y sentite increíble cada día.
          </p>

         
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-tertiary">
                Planes de Entrenamiento Personalizados
              </h3>
              <p className="text-gray-600 mt-2">
                Rutinas diseñadas a medida para mejorar fuerza, resistencia o tonificación, asegurando un progreso eficiente y seguro.
              </p>
            </div>
            <div className="p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-tertiary">
                Zonas de Entrenamiento Personalizadas
              </h3>
              <p className="text-gray-600 mt-2">
                Espacios adaptados para entrenamientos de fuerza, cardio y funcional, optimizados para tu rendimiento.
              </p>
            </div>
          </div>
        </div>

        
        <div className="md:w-1/2 flex justify-center items-center h-full min-h-[100%] flex-1">
          <div className="w-full h-full">
            <Image
              src="/image1.svg" 
              alt="Gym Flow"
              width={500}
              height={200}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
