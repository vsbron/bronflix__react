import { ReactNode, RefObject } from "react";
import { z } from "zod";

import {
  changePasswordFormSchema,
  contactFormSchema,
  editProfileFormSchema,
  signInFormSchema,
  signUpFormSchema,
} from "@/lib/formSchemas";
import {
  IBase,
  ICollection,
  IEpisode,
  IGenre,
  IMediaCredit,
  IMovie,
  IMovieList,
  IPerson,
  IShow,
  ISearchedMedia,
  ISearchedMediaSmall,
  ISearchResultsObjSmall,
  IShowList,
} from "@/lib/typesAPI";

export type LayoutProps = { children?: ReactNode };

/* Unions */
type Headings = "h1" | "h2" | "h3";
type PreviewSubtitles = "character" | "job" | "department";
export type Media =
  | "person"
  | "tv"
  | "shows"
  | "movies"
  | "movie"
  | "collection";
export type RibbonDirections = "left" | "right";

/* Context */
export type GenresContextType = {
  genres: IGenre[];
};
export type GenresProviderProps = { children: ReactNode };
export type ModalContentProps = {
  children: ReactNode;
  name: string;
  alternative?: boolean;
};
export type ModalContextProps = {
  activeModal: string | null;
  openModal: (name: string) => void;
  closeModal: () => void;
};
export type ModalProviderProps = { children: ReactNode };
export type ModalTriggerProps = { children: ReactNode; name: string };

/* Components */
export type ButtonPreviewProps = {
  ribbon: RefObject<HTMLDivElement>;
  length: number;
  isScrollByOne?: boolean;
};
export type ButtonPreviewArrowProps = {
  dir: RibbonDirections;
  clickHandler: (direction: RibbonDirections) => void;
};
export type ErrorMediaProps = { type: string };
export type IconWrapperProps = {
  icon: ReactNode;
  children: ReactNode;
};
export type PreviewsProps<T> = {
  rawPreviews: T[];
  pages?: number;
  width?: string;
  height: string;
  type: Media;
  subtitle?: PreviewSubtitles;
  isTwoRows?: boolean;
  merged?: boolean;
};
export type PreviewItemProps<T> = {
  media: T;
  type: Media;
  height: string;
  width: string;
  subtitle?: keyof T;
};
export type PreviewGroupProps<T> = {
  previews: T[];
  type: Media;
  flexBasis?: string;
  height: string;
};
export type PreviewMergedProps<T> = {
  media: T;
  height: string;
  width: string;
  type: Media;
};
export type PreviewImageProps = {
  media: IBase;
  type?: Media;
  children?: ReactNode;
  posters?: boolean;
  hud?: boolean;
};
export type ScorePreviewProps = {
  score: number;
  count?: number;
  isHighlighted?: boolean;
  isBig?: boolean;
};

// UI
export type BlackGradientToTopProps = { height: string };
export type BlackGradientToRightProps = { width: string };
export type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  isActive?: boolean;
  type?: "submit" | "reset";
  disabled?: boolean;
  label?: string;
};
export type ContentWallProps = { children: ReactNode };
export type FooterHeadingProps = { children: string };
export type HeadingProps = { children: string; as?: Headings; id?: string };
export type MediaButtonsProps = { type: "movie" | "tv"; media: IBase };
export type NavItemProps = { icon: ReactNode; title: string };
export type SeparatorProps = { className?: string };
export type WrapperProps = { children: ReactNode; className?: string };

// Home page components
export type MoviesFeaturedProps = { movies: IMovieList[] };
export type MovieHighlightProps = { movie: IMovieList };

// General
export type AnchorTargetProps = { id: string };
export type AuthenticationProps = { col?: boolean };
export type GenreListProps = { data: IGenre[]; type: string };
export type GenreMediaListProps = {
  genreId: string;
  type: "movie" | "tv";
};
export type GenreMediaPreviewProps = {
  media: ISearchedMedia;
  type: "movie" | "tv";
};
export type GenreMediaResultsProps = {
  media: IMovieList | IShowList;
  type: "movie" | "tv";
};
export type MediaHeroPros = {
  media: IBase;
  children: ReactNode;
  small?: boolean;
};
export type MediaMainBGProps = { type: "movies" | "shows" };
export type PaginationNavProps = {
  page: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
};
export type ResultPreviewProps = {
  media: ISearchedMedia;
  type?: "movie" | "tv";
};
export type ResultsTwoColumnsProps = {
  media: IBase[];
  type?: "movie" | "tv";
};
export type TrailerButtonProps = { video: string; index?: boolean };

// Movie page
export type MovieCastCrewProps = { movieId: number };
export type MovieCollectionLinkProps = { collection: ICollection };
export type MovieDetailsProps = { movie: IMovie };
export type MoviesSimilarProps = { movieId: number };

// Movie collection page
export type CollectionDetailsProps = { collection: ICollection };
export type CollectionMoviesProps = { movies: IMovie[] };

// Person page
export type PersonDetailsProps = { person: IPerson };
export type PersonFilmographyProps = {
  cast: IMediaCredit[];
  crew: IMediaCredit[];
};
export type PersonNotableWorkProps = {
  credits: IMediaCredit[];
  personName: string;
};

// Show page
export type ShowCastCrewProps = { showId: number };
export type ShowDetailsProps = { show: IShow };
export type ShowSimilarProps = { showId: number };
export type SeasonDetailsProps = { seasonNumber: string };
export type SeasonEpisodeProps = { episode: IEpisode };

// Search
export type SearchBriefResultsProps = {
  clearSearch: () => void;
  results: ISearchResultsObjSmall;
  inputText: string;
};
export type SearchPreviewSmallProps = { media: ISearchedMediaSmall };
export type SearchResultsListProps = { query: string };
export type SearchSmallArrowProps = { children: string; dir: "left" | "right" };

// Profile
export type MediaListProps = {
  items: number[];
  type: Media;
};
export type ListTitleProps = { children: string };
export interface IGradedList {
  id: number;
  rate: number;
}
export type MediaTypeAndId = {
  type: Media;
  id: number;
  name?: string;
};

// Forms
export type FormWrapProps = {
  children: ReactNode;
  title: string;
  submit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  isSubmitting: boolean;
  error: string | null;
  buttonText: string;
};
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type SignInFormData = z.infer<typeof signInFormSchema>;
export type SignUpFormData = z.infer<typeof signUpFormSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;
export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;
export type FormGroupProps = { children: ReactNode };
export type FormErrorProps = { children: ReactNode };
export type FormLabelErrorProps = {
  name: string;
  children?: ReactNode;
};
