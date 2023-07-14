import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = ({ movie, onBackClick }) => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Gone with the Wind",
      description:
        "A sheltered and manipulative Southern belle and a roguish profiteer face off in a turbulent romance as the society around them crumbles with the end of slavery and is rebuilt during the Civil War and Reconstruction periods.",
      image:
        "https://www.themoviedb.org/t/p/original/17NMnGyiZgemcw5YqFUogW38B4y.jpg",
      genre: "Drama",
      director: "Victor Fleming",
    },
    {
      id: 2,
      title: "Rear Window",
      description:
        "A photographer in a wheelchair spies on his neighbors from his Greenwich Village courtyard apartment window, and becomes convinced one of them has committed murder, despite the skepticism of his fashion-model girlfriend.",
      image:
        "https://www.themoviedb.org/t/p/original/am5hVQDdV5OmjrX3eWTB8GgsKu0.jpg",
      genre: "Thriller",
      director: "Alfred Hitchcock",
    },
    {
      id: 3,
      title: "Casablanca",
      description:
        "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
      image:
        "https://www.themoviedb.org/t/p/original/uGwaGjJVJBbCv5sIIsmYf09RqHz.jpg",
      genre: "Drama",
      director: "Michael Curtiz",
    },
    {
      id: 4,
      title: "The Wizard of Oz",
      description:
        "Young Dorothy Gale and her dog Toto are swept away by a tornado from their Kansas farm to the magical Land of Oz, and embark on a quest with three new friends to see the Wizard, who can return her to her home and fulfill the others wishes.",
      image:
        "https://www.themoviedb.org/t/p/original/k5MiyoVs0u4qGYxlFVGqPwa2A4b.jpg",
      genre: "Family",
      director: "Victor Fleming",
    },
    {
      id: 5,
      title: "City Lights",
      description:
        "With the aid of a wealthy erratic tippler, a dewy-eyed tramp who has fallen in love with a sightless flower girl accumulates money to be able to help her medically.",
      image:
        "https://www.themoviedb.org/t/p/original/hqaSSKk0wS1inwgSxnEQ42WkOZJ.jpg",
      genre: "Comedy",
      director: "Charles Chaplin",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
