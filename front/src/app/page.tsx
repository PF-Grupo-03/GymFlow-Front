import GymFlowBanner from '@/components/Landing/GymFlowBanner/GymFlowBanner';
import WhyChooseUs from '@/components/Landing/WhyChooseUs/WhyChooseUs';
import SelectYourActivitie from '@/components/Landing/SelectYourActivity/SelectYourActivity';
import MapComponent from '@/components/GoogleMaps/Maps';
import ContactForm from '@/components/FormContactanos/FormCotactanos';

export default function Page() {
  return (
    <div className="bg-primary">
      <GymFlowBanner />
      <WhyChooseUs />
      <SelectYourActivitie />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="w-full">
          <ContactForm />
           
          </div>
          <div className="w-full h-[400px]">
          <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
