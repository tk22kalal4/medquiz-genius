
import { HorizontalAd } from "@/components/ads/HorizontalAd";
import { SquareAd } from "@/components/ads/SquareAd";
import { MultiplexHorizontalAd } from "@/components/ads/MultiplexHorizontalAd";
import { MultiplexVerticalAd } from "@/components/ads/MultiplexVerticalAd";

const AdSections = () => {
  return (
    <>
      {/* Horizontal Ad below hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HorizontalAd />
      </div>

      {/* MultiplexHorizontal Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <MultiplexHorizontalAd />
      </div>
      
      {/* Square Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <SquareAd />
      </div>
      
      {/* MultiplexVertical Ad near footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <MultiplexVerticalAd />
      </div>
    </>
  );
};

export default AdSections;
