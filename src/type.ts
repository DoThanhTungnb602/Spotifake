/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type INavLink = {
  name: "Home" | "Search";
  href: string;
};

export type ILibraryActiveView =
  | "Playlists"
  | "Albums"
  | "Artists"
  | "Saved Tracks"
  | "Podcasts"
  | "Shows";

export type IRepeatState = "off" | "track" | "context";

export type IPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: any;
    total: number;
  };
  href: string;
  id: string;
  images: Array<{
    height: any;
    url: string;
    width: any;
  }>;
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: Array<IPlaylistTrack>;
    limit: number;
    next: string;
    offset: number;
    previous: any;
    total: number;
  };
  type: string;
  uri: string;
};

export type IPlaylistTrack = {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  track: ITrack;
};

export type ITracks = {
  href: string;
  items: Array<{
    added_at: string;
    added_by: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    is_local: boolean;
    primary_color?: string;
    track: {
      album: {
        album_type: string;
        artists: Array<{
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }>;
        available_markets: Array<string>;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: Array<{
          height: number;
          url: string;
          width: number;
        }>;
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
      };
      artists: Array<{
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
      available_markets: Array<string>;
      disc_number: number;
      duration_ms: number;
      episode: boolean;
      explicit: boolean;
      external_ids: {
        isrc: string;
      };
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_local: boolean;
      name: string;
      popularity: number;
      preview_url: any;
      track: boolean;
      track_number: number;
      type: string;
      uri: string;
    };
    video_thumbnail: {
      url: any;
    };
  }>;
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};

export type IAlbum = {
  album_type: string;
  total_tracks: number;
  available_markets: Array<string>;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: ISimplifiedArtist[];
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: ISimplifiedTrack[];
  };
  copyrights: Array<{
    text: string;
    type: string;
  }>;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: Array<string>;
  label: string;
  popularity: number;
};

export type ISimplifiedArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type ISimplifiedTrack = {
  artists: Array<{
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }>;
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  restrictions: {
    reason: string;
  };
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type IArtist = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: any;
    total: number;
  };
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
};

export type ICategories = {
  categories: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: any;
    total: number;
    items: Array<ICategory>;
  };
};

export type ICategory = {
  href: string;
  icons: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  id: string;
  name: string;
};

export type ICurrentPlayingTrack = {
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  };
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: {
    album: {
      album_type: string;
      total_tracks: number;
      available_markets: Array<string>;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: Array<{
        url: string;
        height: number;
        width: number;
      }>;
      name: string;
      release_date: string;
      release_date_precision: string;
      type: string;
      uri: string;
      artists: Array<{
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
    };
    artists: Array<{
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    popularity: number;
    preview_url: any;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  };
  currently_playing_type: string;
  actions: {
    disallows: {
      pausing: boolean;
    };
  };
};

export type IUser = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  product: string;
  type: string;
  uri: string;
};

export type IFeaturedPlaylists = {
  message: string;
  playlists: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: ISimplifiedPlaylist[];
  };
};

export type ITrack = {
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: Array<string>;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
      reason: string;
    };
    type: string;
    uri: string;
    artists: Array<{
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }>;
  };
  artists: IArtist[];
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type IFollowedArtists = {
  artists: {
    items: IArtist[];
    next: any;
    total: number;
    cursors: {
      after: any;
    };
    limit: number;
    href: string;
  };
};

export type IArtistAlbums = {
  href: string;
  items: ISimplifiedAlbum[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};

export type ISimplifiedAlbum = {
  album_type: string;
  total_tracks: number;
  available_markets: Array<string>;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: "album";
  uri: string;
  artists: Array<{
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }>;
  album_group: string;
};

export type ICurrentUserPlaylists = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: ISimplifiedPlaylist[];
};

export type ISimplifiedPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    height?: number;
    url: string;
    width?: number;
  }>;
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: any;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: "playlist";
  uri: string;
};

export type IUserSavedAlbums = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: ISavedAlbum[];
};

export type ISavedAlbum = {
  added_at: string;
  album: IAlbum;
};

export type IDevice = {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
};

export type IContext = {
  type: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
};

export type IAction = {
  interrupting_playback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_shuffle: boolean;
  toggling_repeat_track: boolean;
  transferring_playback: boolean;
};

export type IPlaybackState = {
  device: IDevice;
  repeat_state: IRepeatState;
  shuffle_state: boolean;
  context: IContext;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: ITrack;
  currently_playing_type: string;
  actions: IAction;
};

export type IQueue = {
  currently_playing: ITrack;
  queue: ITrack[];
};

export type IDevices = {
  devices: IDevice[];
};

export type IUserSavedTracks = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: ISavedTrack[];
};

export type ISavedTrack = {
  added_at: string;
  track: ITrack;
};

export type ICredentials = {
  access_token: string;
  token_type: string;
  scope?: string;
  expires_in: number;
  refresh_token?: string;
};
