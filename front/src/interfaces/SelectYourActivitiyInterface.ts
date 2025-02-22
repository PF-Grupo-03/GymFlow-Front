export interface ICarouselItemProps {
  item: {
    title: string;
    image: string;
  };
  isActive: boolean;
}

export interface ICarouselProps {
  items: {
    title: string;
    image: string;
  }[];
}
