import GymFlowBanner from '@/components/GymFlowBanner/GymFlowBanner';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';
import SelectYourActivitie from '@/components/SelectYourActivity/SelectYourActivity';

export default function Home() {
  return (
    <div className="bg-primary">
      <GymFlowBanner />
      <WhyChooseUs />
      <SelectYourActivitie />
    </div>
  );
}


