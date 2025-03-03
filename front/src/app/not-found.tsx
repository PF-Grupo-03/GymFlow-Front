import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-white">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://equipoparagimnasioferbel.com/wp-content/uploads/2018/08/equipo-para-gimnasio2.jpg"
          alt="Página no encontrada"
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center bg-black bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-6xl font-holtwood">404</h1>
        <p className="text-lg font-ibm mt-2">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-tertiary text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
