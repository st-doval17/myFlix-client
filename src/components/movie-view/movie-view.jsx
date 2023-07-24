export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} width={300} height={400} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        <br></br>
        <span>{movie.Director.Birth}</span>-<span>{movie.Director.Death}</span>
        <br></br>
        <span>{movie.Director.Bio}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
        <br></br>
        <span>{movie.Genre.Description}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
