"use client";

import Image from 'next/image';
import TitleBox from '../TitleBox/TitleBox';
import '../../app/globals.css';
import { Employee, employees } from '@/data/employees';

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col justify-center text-center py-12 bg-primary gap-10 mb-10">
      <div className="flex justify-center items-center">
        <TitleBox title="Sobre Nosotros" />
      </div>
      <div>
        <div className="w-2/3 flex items-center justify-center bg-secondary font-ibm rounded-tl-lg rounded-br-lg m-auto whiteShadow">
          <p className="p-6">
            En Nuestro Gimnasio, nos apasiona ayudarte a alcanzar tus metas de
            salud y bienestar. Ofrecemos instalaciones de primer nivel,
            entrenadores capacitados y una comunidad motivadora para que des lo
            mejor de ti en cada entrenamiento. Nos comprometemos a brindarte las
            mejores herramientas, ya sea con clases, equipamiento de última
            generación o asesoramiento personalizado.
          </p>
        </div>

        <div>
          <div className="flex justify-center items-center mt-8">
            <TitleBox title="Nuestros Especialistas" />
          </div>
          <div className="w-3/4 flex flex-wrap justify-center bg-secondary rounded-tl-lg rounded-br-lg m-auto whiteShadow p-6 font-odor mt-10">
            {employees.map((employee: Employee) => (
              <div
                key={employee.id}
                className="w-full sm:w-[calc(50%-1rem)] p-4 flex flex-col items-center bg-gray-200 rounded-tl-lg rounded-br-lg m-2" // Ajustado el ancho y el margen
              >
                <Image
                  src={employee.photo}
                  alt={employee.name}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <p className="text-2xl font-odor text-black mt-2 ">
                  {employee.name}
                </p>
                <div>
                  <span>Especialidades</span>
                  <ul className="mt-4 text-left text-md text-black font-odor flex gap-5 bg-gray-400 p-2 rounded-tl-lg rounded-br-lg justify-center items-center">
                    {employee.specialties.map((specialty, i) => (
                      <li key={i} className="">
                        • {specialty}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}