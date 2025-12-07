export type MovieDetail = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  status: string;
  original_language: string;
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
    }>;
  };
  recommendations: {
    results: Array<{
      id: number;
      title: string;
      poster_path: string | null;
      vote_average: number;
    }>;
  };
  videos: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  "watch/providers": {
    results: {
      [country: string]: {
        flatrate?: Array<{ provider_id: number; provider_name: string }>;
        rent?: Array<{ provider_id: number; provider_name: string }>;
        buy?: Array<{ provider_id: number; provider_name: string }>;
      };
    };
  };
};
