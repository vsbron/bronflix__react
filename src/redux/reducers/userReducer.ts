import { useSelector } from "react-redux";
import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { NO_AVATAR_M } from "@/lib/assets";
import { IUserState, RootState } from "@/lib/typesRedux";
import { auth, db } from "@/utils/firebase";

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk<DocumentData | null, string>(
  "user/fetchUserData",
  async (uid, { rejectWithValue }) => {
    try {
      // Guard clause
      if (!uid) return null;

      // Get the actual user data
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      // Return user data
      if (docSnap.exists()) return docSnap.data();
      return null; // Return null otherwise
    } catch (error: unknown) {
      console.error(error);
      return rejectWithValue("An error occurred while fetching user data");
    }
  },
);

export const updateUserData = createAsyncThunk<
  DocumentData | null,
  { updatedData: Partial<IUserState> }
>("user/updateUserData", async ({ updatedData }, { rejectWithValue }) => {
  // Guard clause - check that user is still authenticated
  if (!auth.currentUser) return rejectWithValue("No authenticated user found");

  // Get the UID
  const uid = auth.currentUser.uid;

  try {
    // Guard clause
    if (!uid) return rejectWithValue("No user ID provided");

    // Getting the current user data
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, updatedData);

    // Fetch the updated data from Firestore to return
    const updatedDocSnap = await getDoc(userRef);
    return updatedDocSnap.exists() ? updatedDocSnap.data() : null;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to update user data");
  }
});

// Creating initial state
const initialState: IUserState = {
  uid: "",
  name: "",
  email: "",
  createdAt: "",
  title: "",
  gender: "N/A",
  birthday: "",
  likedMovies: [],
  likedShows: [],
  likedPeople: [],
  watchlistMovies: [],
  watchlistShows: [],
  ratedMovies: [],
  ratedShows: [],
  avatar: NO_AVATAR_M,
  isLoading: false,
  error: null,
};

// Creating the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Setting the user data
    setUserData(state, action) {
      return { ...state, ...action.payload, isLoading: false, error: null };
    },
    // Clear user data
    clearUserData() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.uid = action.payload.uid;
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.title = action.payload.title;
          state.gender = action.payload.gender;
          state.birthday = action.payload.birthday;
          state.createdAt = action.payload.createdAt;
          state.likedMovies = action.payload.likedMovies;
          state.likedShows = action.payload.likedShows;
          state.likedPeople = action.payload.likedPeople;
          state.watchlistMovies = action.payload.watchlistMovies;
          state.watchlistShows = action.payload.watchlistShows;
          state.ratedMovies = action.payload.ratedMovies;
          state.ratedShows = action.payload.ratedShows;
          state.avatar = action.payload.avatar;
        } else {
          state.uid = "";
        }
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isLoading = false;
        state.uid = "";
        state.error = "Failed to get the user data";
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          Object.assign(state, action.payload);
        }
      })
      .addCase(updateUserData.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to update the user data";
      });
  },
});

// Exporting everything out
export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;

// Custom hook for easier use
export const useUser = () => {
  return useSelector((state: RootState) => state.user);
};
