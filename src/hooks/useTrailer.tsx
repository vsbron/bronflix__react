import { useEffect, useState } from "react";

import useModal from "@/context/ModalContext";
import { IVideo } from "@/lib/typesAPI";
import { getTrailer } from "@/services/apiTrailer";

function useTrailer(id: number, type: "tv" | "movie") {
  // Setting the state for the fetched video
  const [video, setVideo] = useState<string>();

  // Get current modal name
  const { activeModal } = useModal();

  // Use effect that fetches trailer
  useEffect(() => {
    // Prevent fetch if modal is open
    if (activeModal === "trailer") return;

    // Creating controller for cleanup function
    const controller = new AbortController();
    const { signal } = controller;

    // Fetching data
    async function fetchVideo() {
      try {
        // Get the fetched data
        const data = await getTrailer(id, type, signal);

        // Find the YouTube trailer in the data
        const trailer = data.find(
          (video: IVideo) =>
            video.type === "Trailer" && video.site === "YouTube",
        );

        // Updating the state of video
        setVideo(trailer ? `https://www.youtube.com/embed/${trailer.key}` : "");
      } catch (error) {
        // Ignore the abort controller error
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setVideo("");
        console.error("Error fetching trailer:", error);
      }
    }

    // Call the function
    fetchVideo();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [id, activeModal]);

  // Returning video
  return video;
}

export default useTrailer;
