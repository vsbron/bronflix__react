import { EyeIcon, HeartIcon, StarIcon } from "@heroicons/react/24/solid";

import { MediaTypeAndId } from "@/lib/types";
import { getUserListsInfo } from "@/utils/helpers";

function IsInUserList({ type, id }: MediaTypeAndId) {
  // Getting the correct user lists
  const { isLiked, isInWatchList, isRated } = getUserListsInfo({ type, id });

  // Returned JSX
  return (
    <>
      <div className="absolute top-2 md:top-3 right-3 z-10 w-[1.8rem] md:w-[2rem] lg:w-[2.2rem] flex flex-col gap-2">
        {isLiked && (
          <div className="bg-red-800 rounded-full p-1">
            <HeartIcon className="text-red-200" />
          </div>
        )}
        {isInWatchList && (
          <div className="bg-orange-800 rounded-full p-1">
            <EyeIcon className="text-orange-200" />
          </div>
        )}
      </div>
      {isRated && (
        <div className="bg-purple-800 rounded-xl px-1 pr-2 py-0 absolute left-2 md:left-3 top-10 md:top-12 flex items-center gap-0.5 text-[1rem] md:text-xl text-purple-200">
          <StarIcon className="w-5" />
          {isRated.rate}
        </div>
      )}
    </>
  );
}

export default IsInUserList;
