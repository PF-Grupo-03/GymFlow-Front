import GymFlowBanner from '@/components/GymFlowBanner/GymFlowBanner';
import SelectYourActivitie from '@/components/SelectYourActivity/SelectYourActivity';
import WhyChooseUs from '@/components/WhyChooseUs';

export function Home() {
  return (
    <div>
      <GymFlowBanner />
      <WhyChooseUs />
      <SelectYourActivitie />
    </div>
  );
}

export default Home;
