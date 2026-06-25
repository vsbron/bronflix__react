import { IGradedList } from "@/lib/types";
import store from "@/redux/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// User slice
export interface IUserState {
  uid: string;
  name: string;
  email: string;
  createdAt: string;
  title: string;
  gender: string;
  birthday: string | number;
  likedMovies: number[];
  likedShows: number[];
  likedPeople: number[];
  watchlistMovies: number[];
  watchlistShows: number[];
  ratedMovies: IGradedList[];
  ratedShows: IGradedList[];
  avatar: string;
  isLoading: boolean;
  error: string | null;
}
