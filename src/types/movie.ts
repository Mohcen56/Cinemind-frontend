export type Movie = {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number;
  release_date: string;
  original_language: string;
};
export type TrendingDoc = {
  $id?: string;
  id?: number;
  searchTerm?: string;
  count?: number;
  movie_id?: number;
  poster_url?: string | null;
  poster_path?: string | null;
  title?: string | null;
  vote_average?: number;
  release_date?: string;
  original_language?: string;
}
