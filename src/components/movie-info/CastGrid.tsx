import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type CastGridProps = {
  cast: CastMember[];
  maxItems?: number;
};

export default function CastGrid({ cast, maxItems = 12 }: CastGridProps) {
  const displayCast = cast.slice(0, maxItems);

  if (displayCast.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 space-y-6 pb-12 lg:px-10">
      <h2 className="text-3xl font-bold text-light-100 pl-20">Cast</h2>

      {/* Carousel */}
      <Carousel className="relative px-15 sm:px-14 md:px-16 lg:px-25">
        <CarouselContent className="">
          {displayCast.map((actor) => (
            <CarouselItem
              key={actor.id}
              className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="group cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <div className="rounded-lg overflow-hidden bg-dark-100 h-40 sm:h-48 md:h-56 lg:h-64">
                  {actor.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      width={150}
                      height={225}
                      className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-light-200 text-sm text-center px-2">
                      No Image
                    </div>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                  <h4 className="text-light-100 font-semibold text-sm truncate">
                    {actor.name}
                  </h4>
                  <p className="text-light-200 text-xs truncate">
                    {actor.character}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-16 text-light-100 hover:text-purple-400" />
        <CarouselNext className="-right-16 text-light-100 hover:text-purple-400" />
      </Carousel>
    </section>
  );
}
