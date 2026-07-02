import { useState } from "react";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "@firebase/firestore";

import useModal from "@/context/ModalContext";
import { BASE_GAP_CLASS } from "@/lib/constants";
import { AppDispatch } from "@/lib/typesRedux";
import { updateUserData, useUser } from "@/redux/reducers/userReducer";
import { auth, db } from "@/utils/firebase";

import Button from "@/components/ui/Button";

function RateMedia({
  type,
  name,
  id,
}: {
  type: string;
  name: string;
  id: number;
}) {
  // Getting the user data from redux store
  const { ratedMovies, ratedShows } = useUser();

  // Getting close function from Modal
  const { closeModal } = useModal();

  // Getting the navigate and dispatch functions
  const dispatch = useDispatch<AppDispatch>();

  // Checking whether we deal with movie or not
  const isMovie = type === "movie";

  // Assigning the correct rated list
  const ratedArray = isMovie ? ratedMovies : ratedShows;
  const currentRate = ratedArray.find((m) => m.id === id)?.rate;

  // Setting the state for the updating state, the error and the current rate of the media
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [rateError, setRateError] = useState<string | null>(null);
  const [rate, setRate] = useState<number | undefined>(
    currentRate || undefined,
  );

  // Button handlers
  const handleRateChange = async (newRate: number) => {
    // Enable submitting state
    setIsSubmitting(true);

    try {
      // Guard clause
      if (!auth.currentUser) {
        setRateError("No authenticated user found.");
        return;
      }

      // Fetch the latest user data from Firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      // Guard clause
      if (!userSnap.exists()) return;

      // Extracting the actual data
      const currentData = userSnap.data();

      // Setting the current rated list to work with
      const updatedRatedList = isMovie
        ? currentData.ratedMovies
        : currentData.ratedShows;
      const currentLikedList = Array.isArray(updatedRatedList)
        ? updatedRatedList
        : [];

      // Remove from the list if rate is 0, or update the rate otherwise
      const updatedList =
        newRate === 0
          ? currentLikedList.filter((m) => m.id !== id)
          : currentLikedList.some((m) => m.id === id)
            ? currentLikedList.map((m) =>
                m.id === id ? { id, rate: newRate } : m,
              )
            : [...currentLikedList, { id, rate: newRate }];

      // Update the rated media list in the state and firebase
      dispatch(
        updateUserData({
          updatedData: {
            [isMovie ? "ratedMovies" : "ratedShows"]: updatedList,
          },
        }),
      );
    } catch (e: unknown) {
      console.error(e);
      setRateError("Couldn't update the rating due to unknown error");
    } finally {
      // Disabling submitting state & close modal
      setIsSubmitting(false);
      closeModal();
    }
  };

  // Returned JSX
  return (
    <div className="flex flex-col gap-8 py-6 text-center">
      <h3 className="mt-0">
        Place your rating on the{" "}
        <span className="text-5xl block mt-2">{name}</span>
      </h3>
      <div className="flex justify-center gap-10">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i + 1}
            className={`inline-block border border-red-700 py-5 px-6 text-3xl rounded-md leading-none cursor-pointer  transition-colors ${
              i + 1 === rate
                ? "bg-red-700 hover:bg-red-700"
                : "hover:bg-red-900"
            }`}
            onClick={() => setRate(i + 1)}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <div className={`mt-2 self-center flex ${BASE_GAP_CLASS}`}>
        <Button onClick={() => handleRateChange(0)} disabled={isSubmitting}>
          <span>REMOVE RATING</span>
        </Button>
        <Button
          onClick={() => handleRateChange(rate || 0)}
          disabled={isSubmitting}
        >
          <span>SAVE RATING</span>
        </Button>
      </div>
      {rateError && <div className="text-red-500">{rateError}</div>}
    </div>
  );
}

export default RateMedia;
