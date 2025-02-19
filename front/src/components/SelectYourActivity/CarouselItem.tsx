import Image from 'next/image';
import { ICarouselItemProps } from '@/interfaces/SelectYourActivitiyInterface';

const CarouselItem: React.FC<ICarouselItemProps> = ({ item, isActive }) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-full h-[500px] rounded-xl overflow-hidden relative">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="rounded-xl object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 bg-black/50 text-white">
          <h3 className="text-xl font-holtwood">{item.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
