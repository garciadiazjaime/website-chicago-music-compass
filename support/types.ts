export interface Genre {
  name: string;
}

export interface Spotify {
  pk: number;
  followers: number;
  genres: Genre[];
  name: string;
  popularity: number;
  url: string;
}

export interface SocialMedia {
  twitter: string;
  facebook: string;
  youtube: string;
  instagram: string;
  tiktok: string;
  soundcloud: string;
  spotify: string;
  appleMusic: string;
}

export interface Social {
  website: string;
  image: string;
  twitter: string;
  facebook: string;
  youtube: string;
  instagram: string;
  tiktok: string;
  soundcloud: string;
  spotify: string;
  appleMusic: string;
  slug: string;
  type: string;
}

interface Metadata {
  slug: string;
  type: string | null;
  website: string | null;
  image: string | null;
  twitter: string | null;
  facebook: string | null;
  youtube: string | null;
  instagram: string | null;
  tiktok: string | null;
  soundcloud: string | null;
  spotify: string | null;
  appleMusic: string | null;
}

interface SlugVenue {
  name: string;
}

interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
  place_id: string;
  slug: string;
  slug_venue: SlugVenue[];
  pk: number;
  website: string;
  metadata: Metadata | null;
  url: string;
}

export interface Artist {
  pk: number;
  name: string;
  metadata: Metadata | null;
  spotify: Spotify | null;
}

interface GenerativeMetadata {
  genre: string;
  subgenre: string;
  type: string;
}

export interface Event {
  rank: number;
  name: string;
  description: string;
  image: string;
  url: string;
  buyUrl: string;
  start_date: string;
  end_date: string | null;
  provider: string;
  venue: string;
  address: string;
  city: string;
  slug: string;
  location: Location;
  artists: Artist[];
  pk: number;
  price: number;
  generativemetadata_set: GenerativeMetadata[];
  // local types
  date: string;
  time: string;
}

export interface LocationChart {
  id: string;
  lat: string;
  lng: string;
  website: string;
  provider: string;
  rank: string;
  slug: string;
  events: string;
  image: string;
  twitter: string;
  facebook: string;
  youtube: string;
  instagram: string;
  tiktok: string;
  soundcloud: string;
  appleMusic: string;
  spotify: string;
  band_camp: string;
  link_tree: string;
  distance?: number;
}

export interface EventPlain {
  id: string;
  start_date: string;
  provider: string;
  price: string;
  rank: string;
  slug: string;
  artists_count: string;
  venue: string;
  created: string;
}

export interface Network {
  twitter: string;
  facebook: string;
  youtube: string;
  instagram: string;
  tiktok: string;
  soundcloud: string;
  appleMusic: string;
  spotify: string;
  band_camp: string;
  link_tree: string;
}

export interface LocationPlain extends Network {
  id: string;
  lat: string;
  lng: string;
  website: string;
  provider: string;
  rank: string;
  slug: string;
  events: string;
  image: string;
}

export interface ArtistPlain extends Network {
  id: string;
  profile: string;
  genres_count: string;
  spotify: string;
  slug: string;
  image: string;
}
