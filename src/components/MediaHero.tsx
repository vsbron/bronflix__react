import { useResponsive } from "@/hooks/useResponsive";
import { BASE_GAP_CLASS } from "@/lib/constants";
import { MediaHeroPros } from "@/lib/types";
import { getMediaImages } from "@/utils/helpers";

import { DimOverlay } from "@/components/ui/Overlays";

function MediaHero({ media, small = false, children }: MediaHeroPros) {
  // Getting images paths
  const { posterPath, backgroundImage } = getMediaImages(media);

  // Getting a number of media queries from custom hook
  const { isXS, isSM, isMD, isLG } = useResponsive();

  // Setting the widths for poster
  let basicWidth, smallWidth;
  switch (true) {
    case isXS:
      basicWidth = "75%";
      smallWidth = "25rem";
      break;
    case isSM:
      basicWidth = "30rem";
      smallWidth = "25rem";
      break;
    case isMD:
      basicWidth = "22rem";
      smallWidth = "25rem";
      break;
    case isLG:
      basicWidth = "32rem";
      smallWidth = "25rem";
      break;
    default:
      basicWidth = "40rem";
      smallWidth = "25rem";
  }

  // Returned JSX
  return (
    <div
      className={`sm:flex items-stretch rounded-lg overflow-hidden max-xl:gap-4 ${BASE_GAP_CLASS}`}
    >
      <img
        src={posterPath}
        className="rounded-lg max-sm:mx-auto max-sm:object-contain"
        style={{ width: small ? smallWidth : basicWidth }}
        alt={media.title || media.name}
        title={`${media.title || media.name} poster`}
      />
      <div
        style={isSM ? {} : { backgroundImage }}
        className="bg-no-repeat bg-cover bg-center basis-full relative flex flex-col justify-end max-sm:mt-6 sm:px-10 sm:py-8 rounded-lg"
      >
        <DimOverlay />
        {children}
      </div>
    </div>
  );
}

export default MediaHero;
