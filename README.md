# BroNflix

This is a Netflix-inspired application built with modern technologies, providing an interactive platform for exploring movies, shows, and actors.

It features an index page, as well as separate pages for movies, shows, and people, along with additional technical pages. Key functionalities include dynamic content from the TMDB API, a sleek and responsive UI, and intuitive navigation.

---

## Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Page Descriptions](#page-descriptions)
   - [Index Page](#index-page)
   - [Movie Page](#movie-page)
   - [Show Page](#show-page)
   - [Person Page](#person-page)
   - [Collection Page](#collection-page)
   - [Profile Page](#profile-page)
   - [Main Movies Page](#main-movies-page)
   - [Main Shows Page](#main-shows-page)
   - [Genres Media Page](#genres-media-page)
   - [Additional Pages](#additional-pages)
4. [Technical Details](#technical-details)
5. [Live version](#live-version)

---

## Project Overview

BroNflix allows users to explore movies, TV shows, and actors with dynamic content fetched from the TMDB API. It includes:

- **Core Components**: A responsive header, side navigation, and footer for smooth navigation.
- **Dynamic Content**: Movies, shows, and actors are fetched from the TMDB API and shuffled on every visit, providing a fresh set of recommendations.
- **Modern UI/UX**: Sleek design with a responsive layout and intuitive navigation.

---

## Features

- **Interactive Content**: The index page includes a variety of sections such as 'What's Hot?', 'Trending Shows', 'Trending Actors', and more, offering a dynamic browsing experience. Each section presents a carousel of movies, shows, and actors, offering users a variety of recommendations.
- **Detailed Pages**: Each movie, show, and actor has its dedicated page with rich information, including posters, overviews, cast/crew, and similar recommendations.
- **Seamless Navigation**: Users can click on items to navigate to their respective pages for more detailed information.
- **User Authentication**: Users can sign up, log in, and access their personalized profile, enhancing their experience with saved preferences and recommendations.
- **Responsive Design**: Supports mobile devices with a minimum width of 360px.

### Search Functionality

- **Search Bar**: The search bar allows users to search for movies, TV shows, or people. The top three results are displayed instantly, with an option to view all available results.

- **Search Results Page**:
  - Displays detailed results based on the user's query.
  - Includes pagination for navigating through large numbers of results.
  - Shows the total number of results and the current page.

---

## Page Descriptions

### **Index Page**

The main page features several sections, including:

- **What's Hot?**: A carousel showcasing movies, where the selected movie displays detailed information like name, score, genres, and offers options to view the trailer or navigate to its page.
- **Trending Content**: A dynamic mix of carousels featuring trending shows, actors, top-rated movies, and top-rated shows, allowing users to explore popular content across various categories. Each item in the carousels is clickable and takes the user to the respective movie, show, or actor page. All content on the index page is shuffled for a fresh set of recommendations with every visit.

### **Movie Page**

Displays comprehensive information about a movie, including:

- Movie poster, cover image, ratings, release information, and other essential details.
- Ability to rate the movie on a scale from 1 to 5.
- A button to watch the trailer.
- Buttons to add or remove the movie from favorites or watch lists.
- If the movie is part of a collection, a button to explore the collection.
- Cast carousel featuring actors photos and their roles.
- Crew section highlighting key contributors such as the director, writer, and producer.
- "Movies You May Also Like" carousel with genre-based recommendations.

### **Show Page**

Similar to the movie page, but with additional details:

- Displays the series' timespan, current status, and number of episodes.
- Ability to rate the show on a scale from 1 to 5, just like with the movies.
- A button to watch the trailer.
- Buttons to add or remove the show from favorites or watch lists, similar to the movie.
- An episode guide, where users can choose a season and view episodes with overviews, air dates, and snapshot.
- Series cast carousel featuring actors photos and their roles.
- Crew section highlighting key contributors such as producers.
- "Shows You May Also Like" carousel for recommendations.

### **Person Page**

Provides in-depth details about an actor or crew member:

- Displays a profile image, name, gender, birthday, and biography.
- A "Notable Work" carousel featuring the movies and shows they are most known for.
- A complete filmography list, including both acting and crew roles, with each entry clickable for more details.

### **Collection Page**

- Accessed from a movie page within a collection.
- Displays the movie's poster, a brief overview, and a list of movies included in the collection.

### **Profile Page**

The Profile Page serves as the user's hub, displaying their personal details and curated lists.

- User Information: Shows the user's avatar, name, and other basic details.
- Profile Editing: Allows users to update their personal details, such as name and other fields.
- Clicking on the avatar lets the user select a new one from the available options.
- Password Update: Provides an option to change the account password securely.
- Watchlist: A section where users can track movies and TV shows they plan to watch.
- Favorites: Separate lists for favorite movies, TV shows, and people (actors/crew).
- If a movie, show, or person is included in any of the user's lists, the corresponding icon will be displayed on the media's preview across the site.

### **Main Movies Page**

The Main Movies Page is your gateway to a world of cinema, offering curated lists, trending films, and more:

- Movie Genres: A section featuring different movie genres, helping users explore films based on their preferred style or mood.
- Now Playing: A dynamic list showcasing movies currently in theaters, so you can keep up with the latest releases.
- Upcoming Movies: A preview of upcoming movies with their release dates, trailers, and summaries, giving you a glimpse of what’s coming soon.
- Collections: A curated selection of movie collections, from franchises to themed lists, perfect for binge-watching or discovering films in the same category.
- Acclaimed Movies: A list of highly-rated and critically acclaimed movies, ensuring you're up-to-date with the best in cinema.

### **Main Shows Page**

The Main Shows Page offers a comprehensive guide to TV series, making it easy to discover new shows and follow your favorites:

- Show Genres: A section that categorizes TV shows by genre, helping users find new shows based on what they love to watch.
- On Air Today: A dynamic list of TV shows currently airing, so you never miss an episode of your favorite series.
- Currently Running Shows: A selection of ongoing TV shows, updated regularly to keep track of the latest seasons and episodes.
- Popular Shows: A carousel featuring trending and most popular TV shows, giving you a quick view of what’s buzzing in the TV world.
- Top Rated Shows: A curated list of top-rated TV shows, offering highly recommended content for those looking for critically acclaimed series.

### **Genres Media Page**

A page that lists media based on the selected genre from the **Main Movies** or **Main Shows** pages:

- Uses a 2-column layout, similar to the Search Results page.
- Displays up to 10,000 results across 500 pages (TMDB's limit).

### **Additional pages**

Includes supplementary pages such as Contact Us, App Info, About Us, Site Map, Terms of Use and Privacy Policy.

## Technical Details

- **Framework**: React with TypeScript for type safety and scalability.
- **Routing**: React Router v6.4 for seamless navigation.
- **State Management**: Redux for managing global state.
- **Authentication**: Firebase Authentication and Firestore are used to handle secure user sign-up, login, and persistent user data for personalized experiences.
- **Icons**: HeroIcons for modern and consistent UI elements.
- **API**: TMDB API for fetching movies, shows, and actor data.
- **Meta Management**: React Helmet Async is used to manage dynamic meta tags, improving SEO and social sharing by dynamically adjusting the title, description, and other meta information based on the page the user is on.
- **Form Handling**: React Hook Form is used for handling the contact form, with Zod providing schema-based validation to ensure form data integrity.
- **Code Splitting**: The app optimizes its initial load time by dynamically loading components as needed, reducing the overall bundle size and improving performance.

---

## Future updates

- **AI Chat**: Implement a small chat with the support of AI to recommend movies it. Place restrictions to questions!
- **API Fetch**: Rewrite media fetching as API call for better caching.

---

## License

©2026 BroN

This repository is intended for portfolio/demo purposes. Permission is granted to view and run the project for personal evaluation. Reuse, redistribution, or commercial use is not permitted without written permission.

---

## Live version (VPN might be needed)

https://vsbronflix.netlify.app/
