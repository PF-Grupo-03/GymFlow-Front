import GymFlowBanner from '@/components/Landing/GymFlowBanner/GymFlowBanner';
import WhyChooseUs from '@/components/Landing/WhyChooseUs/WhyChooseUs';
import SelectYourActivitie from '@/components/Landing/SelectYourActivity/SelectYourActivity';

export default function Page() {
  return (
    <div className="bg-primary">
      <GymFlowBanner />
      <WhyChooseUs />
      <SelectYourActivitie />
    </div>
  );
}
