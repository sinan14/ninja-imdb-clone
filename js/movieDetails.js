import { omdbValue, apiUrl } from './constants.js';

let movieData = {
  Title: 'N/A',
  Year: 'N/A',
  Released: 'N/A',
  Runtime: 'N/A',
  Genre: 'N/A',
  Director: 'N/A',
  Writer: 'N/A',
  Actors: 'N/A',
  Plot: 'Not Available',
  Language: 'N/A',
  Country: 'N/A',
  Awards: 'N/A',
  Poster: 'N/A',
  imdbRating: 'N/A',
};

async function loadData() {
  try {
    // Get the movie ID from the URL query parameter

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('tt');
    const Poster = urlParams.get('Poster');
    const Title = urlParams.get('Title');
    const Year = urlParams.get('Year');

    // show the available data to user till original data loaded since loader is not implemented
    movieData = {
      ...movieData,
      Released: Year,
      Poster,
      Title,
    };

    showData();
    const url = `${apiUrl}?i=${movieId}&apikey=${omdbValue}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error('response is not okay');
    }
    const res = await response.json();
    console.log(res);
    if (res.Response == 'True') {
      movieData = { ...res };
      showData();
    }
  } catch (error) {
    console.log('error happened =>', error);
  }
}
function showData() {
  // change title of page to movie title
  document.title = movieData.Title;
  const heading = document.querySelector('.heading-primary');
  const poster = document.querySelector('.movie-poster');
  const released = document.querySelector('.other-data.release .normal-text');
  const rating = document.querySelector('.other-data.imdbRating .normal-text');
  const genre = document.querySelector('.other-data.genre .normal-text');
  const country = document.querySelector('.other-data.country .normal-text');
  const language = document.querySelector('.other-data.language .normal-text');
  const actors = document.querySelector('.other-data.actors .normal-text');
  const director = document.querySelector('.other-data.director .normal-text');
  const writer = document.querySelector('.other-data.writer .normal-text');
  const awards = document.querySelector('.other-data.awards .normal-text');
  const runtime = document.querySelector('.other-data.runtime .normal-text');
  const plot = document.querySelector('.movie-plot');

  const {
    Title,
    Year,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    imdbRating,
  } = movieData;
  heading.textContent = Title;
  // if exact release date is not available we set year as released
  if (Released == 'N/A' && Year) {
    released.textContent = Year;
  } else {
    released.textContent = Year;
  }
  runtime.textContent = Runtime;
  genre.textContent = Genre;
  country.textContent = Country;
  language.textContent = Language;
  director.textContent = Director;
  writer.textContent = Writer;
  actors.textContent = Actors;
  awards.textContent = Awards;
  rating.textContent = imdbRating;

  plot.textContent = Plot;
  poster.setAttribute('src', Poster);
}
// to be in safe side start dom manipulation after content loaded
document.addEventListener('DOMContentLoaded', function () {
  loadData();
});
