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
import {
  NAV_LINKS_OTHER,
  NAV_LINKS_MAIN,
  NAV_LINKS_SECONDARY,
} from "./lib/navLinks";

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
        path: `${NAV_LINKS_MAIN.movies.path}/:movieId`,
        element: <Movie />,
        loader: movieLoader,
        errorElement: <ErrorMedia type="movie" />,
      },
      {
        path: `${NAV_LINKS_MAIN.movies.path}/collection/:collectionId`,
        element: <MovieCollection />,
        loader: movieCollectionLoader,
        errorElement: <ErrorMedia type="collection" />,
      },
      {
        path: `${NAV_LINKS_MAIN.shows.path}/:showId`,
        element: <Show />,
        loader: showLoader,
        shouldRevalidate: ({ currentUrl, nextUrl }) =>
          currentUrl.pathname !== nextUrl.pathname,
        errorElement: <ErrorMedia type="show" />,
      },
      {
        path: `${NAV_LINKS_OTHER.person.path}/:personId`,
        element: <Person />,
        loader: personLoader,
        errorElement: <ErrorMedia type="person" />,
      },
      {
        path: `${NAV_LINKS_OTHER.profile.path}`,
        element: <ProtectedRoute />,
        children: [{ index: true, element: <Profile /> }],
      },
      { path: `${NAV_LINKS_MAIN.movies.path}`, element: <MoviesMain /> },
      {
        path: `${NAV_LINKS_MAIN.movies.path}/genre/:genreId`,
        element: <MoviesByGenre />,
      },
      { path: `${NAV_LINKS_MAIN.shows.path}`, element: <ShowsMain /> },
      {
        path: `${NAV_LINKS_MAIN.shows.path}/genre/:genreId`,
        element: <ShowsByGenre />,
      },
      { path: `${NAV_LINKS_MAIN.aiMode.path}`, element: <AIMode /> },
      { path: `${NAV_LINKS_OTHER.search.path}`, element: <SearchResults /> },
      { path: `${NAV_LINKS_SECONDARY.siteMap.path}`, element: <Sitemap /> },
      { path: `${NAV_LINKS_MAIN.about.path}`, element: <AboutUs /> },
      { path: `${NAV_LINKS_SECONDARY.appInfo.path}`, element: <AppInfo /> },
      { path: `${NAV_LINKS_SECONDARY.contactUs.path}`, element: <ContactUs /> },
      { path: `${NAV_LINKS_SECONDARY.privacy.path}`, element: <Privacy /> },
      { path: `${NAV_LINKS_SECONDARY.terms.path}`, element: <TermsOfUse /> },
      { path: `${NAV_LINKS_OTHER.success.path}`, element: <Success /> },
      { path: `${NAV_LINKS_OTHER.errorForm.path}`, element: <ErrorForm /> },
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
