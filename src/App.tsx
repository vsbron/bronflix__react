import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { onAuthStateChanged } from "firebase/auth";

import { AppDispatch } from "@/lib/typesRedux";
import { clearUserData, fetchUserData } from "@/redux/reducers/userReducer";
import { auth } from "@/utils/firebase";

import { movieLoader } from "@/pages/Movie";
import { movieCollectionLoader } from "@/pages/MovieCollection";
import { personLoader } from "@/pages/Person";
import { showLoader } from "@/pages/Show";

import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary";
import ErrorMedia from "@/components/errorBoundary/ErrorMedia";
import Layout from "@/components/ui/Layout";
import Loader from "@/components/ui/Loader";

const Home = lazy(() => import("@/pages/Home"));
const MoviesMain = lazy(() => import("@/pages/MoviesMain"));
const MoviesByGenre = lazy(() => import("@/pages/MoviesByGenre"));
const Movie = lazy(() => import("@/pages/Movie"));
const MovieCollection = lazy(() => import("@/pages/MovieCollection"));
const Person = lazy(() => import("@/pages/Person"));
const ShowsMain = lazy(() => import("@/pages/ShowsMain"));
const ShowsByGenre = lazy(() => import("@/pages/ShowsByGenre"));
const Show = lazy(() => import("@/pages/Show"));
const SearchResults = lazy(() => import("@/pages/SearchResults"));
const Profile = lazy(() => import("@/pages/Profile"));
const AIMode = lazy(() => import("@/pages/AIMode"));
const ProtectedRoute = lazy(() => import("@/pages/ProtectedRoute"));

const AboutUs = lazy(() => import("@/pages/AboutUs"));
const AppInfo = lazy(() => import("@/pages/AppInfo"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const ErrorForm = lazy(() => import("@/pages/ErrorForm"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));
const Success = lazy(() => import("@/pages/Success"));
const TermsOfUse = lazy(() => import("@/pages/TermsOfUse"));

// Setting up the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60 * 1000 },
  },
});

// Setting the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/movies/:movieId",
        element: <Movie />,
        loader: movieLoader,
        errorElement: <ErrorMedia type="movie" />,
      },
      {
        path: "/movies/collection/:collectionId",
        element: <MovieCollection />,
        loader: movieCollectionLoader,
        errorElement: <ErrorMedia type="collection" />,
      },
      {
        path: "/shows/:showId",
        element: <Show />,
        loader: showLoader,
        shouldRevalidate: ({ currentUrl, nextUrl }) =>
          currentUrl.pathname !== nextUrl.pathname,
        errorElement: <ErrorMedia type="show" />,
      },
      {
        path: "/person/:personId",
        element: <Person />,
        loader: personLoader,
        errorElement: <ErrorMedia type="person" />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <Profile /> }],
      },
      { path: "/movies", element: <MoviesMain /> },
      { path: "/movies/genre/:genreId", element: <MoviesByGenre /> },
      { path: "/shows", element: <ShowsMain /> },
      { path: "/shows/genre/:genreId", element: <ShowsByGenre /> },
      { path: "/ai-mode", element: <AIMode /> },
      { path: "/search", element: <SearchResults /> },
      { path: "/site-map", element: <Sitemap /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/app-info", element: <AppInfo /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <TermsOfUse /> },
      { path: "/success", element: <Success /> },
      { path: "/error-form", element: <ErrorForm /> },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);

function App() {
  // Getting the dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // useEffect with that loads user data on load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user?.uid ? dispatch(fetchUserData(user.uid)) : dispatch(clearUserData());
    });
    return unsubscribe;
  }, [dispatch]);

  // Returned JSX
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
