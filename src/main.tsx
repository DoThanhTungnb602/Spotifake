import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "./pages/home/Home.tsx";
import ErrorPage from "./error-page.tsx";
import Index from "@/pages/home/Index.tsx";
import Search from "@/pages/home/Search.tsx";
import Playlist from "./pages/home/Playlist.tsx";
import Album from "./pages/home/Album.tsx";
import Artist from "./pages/home/Artist.tsx";
import Queue from "./pages/home/Queue.tsx";
import Login from "./pages/home/Login.tsx";
import ArtistAlbums from "./pages/home/ArtistAlbums.tsx";
import UserPlaylists from "@/components/playlist/followed-playlists.tsx";
import UserSavedAlbums from "@/components/album/user-saved-albums.tsx";
import FollowedArtists from "@/components/artist/followed-artists.tsx";
import ProtectedRoute from "./pages/home/ProtectedRoute.tsx";
import { Collection } from "./pages/home/Collection.tsx";
import UserSavedTracks from "./components/track/user-saved-tracks.tsx";
import Track from "./pages/home/Track.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route path="/search" element={<Search />} />
        <Route path="/playlist/:playlistId" element={<Playlist />} />
        <Route path="/album/:albumId" element={<Album />} />
        <Route path="/artist/albums/:artistId" element={<ArtistAlbums />} />
        <Route path="/artist/:artistId" element={<Artist />} />
        <Route path="/track/:trackId" element={<Track />} />
        <Route
          path="/collection"
          element={
            <ProtectedRoute>
              <Collection />
            </ProtectedRoute>
          }
        >
          <Route path="/collection/playlists" element={<UserPlaylists />} />
          <Route path="/collection/albums" element={<UserSavedAlbums />} />
          <Route path="/collection/artists" element={<FollowedArtists />} />
          <Route path="/collection/tracks" element={<UserSavedTracks />} />
        </Route>
        <Route
          path="/queue"
          element={
            <ProtectedRoute>
              <Queue />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
