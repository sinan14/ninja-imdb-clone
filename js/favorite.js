// {
//   Title: 'Bat Masterson',
//   Year: '1958–1961',
//   imdbID: 'tt0052445',
//   Type: 'series',
//   Poster:
//     'https://m.media-amazon.com/images/M/MV5BYzg5Y2E3ZGUtODhmNS00ZjgzLWIwODEtZjY0ODNlZjFkZWJiXkEyXkFqcGdeQXVyMTMzNzIyNDc1._V1_SX300.jpg',
// },

//! start update dom after only content is loaded safer
document.addEventListener('DOMContentLoaded', function () {
  loadData();
});
function listMovies({ Poster, Year, Title, imdbID }) {
  const listItem = document.createElement('li');
  listItem.classList.add('movie-item');
  const posterBox = document.createElement('div');
  posterBox.classList.add('poster-box');
  const img = document.createElement('img');
  img.setAttribute('src', Poster);
  img.setAttribute('alt', 'Moive poster');
  posterBox.appendChild(img);
  const movieData = document.createElement('div');
  movieData.classList.add('movie-data');
  const titleName = document.createElement('span');
  titleName.classList.add('title-name');
  titleName.textContent = Title;
  const movieYear = document.createElement('span');
  movieYear.classList.add('movie-year');
  movieYear.textContent = Year;
  movieData.append(titleName, movieYear);
  const actionBtns = document.createElement('div');
  actionBtns.classList.add('action-btns');
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'REMOVE';
  removeBtn.classList.add('btn-create');
  removeBtn.addEventListener('click', function () {
    removeItem(imdbID);
    listItem.remove();
  });
  const viewBtn = document.createElement('button');
  const anchorTag = document.createElement('a');
  const href = `movie.html?Title=${Title}&Poster=${Poster}&tt=${imdbID}&Year=${Year}`;
  anchorTag.setAttribute('href', href);
  anchorTag.classList.add(
    'data',
    'without-link-style',
    'without-link-style-white'
  );

  anchorTag.textContent = 'VIEW';
  viewBtn.appendChild(anchorTag);
  viewBtn.classList.add('btn-create');
  actionBtns.append(removeBtn, viewBtn);
  listItem.append(posterBox, movieData, actionBtns);
  document.querySelector('.favorite-movies_list').append(listItem);
}
function loadData() {
  let movies = localStorage.getItem('FAVORITE_MOVIES');
  if (movies) {
    movies = JSON.parse(movies);
  } else {
    movies = [];
  }
  if (movies.length == 0) {
    document.querySelector('.empty-screen').style.display = 'block';
    return;
  }
  document.querySelector('.favorite-movies_list').style.display = 'block';
  for (const movie of movies) {
    listMovies(movie);
  }
}
function removeItem(id) {
  let movies = localStorage.getItem('FAVORITE_MOVIES');
  if (movies) {
    movies = JSON.parse(movies);
  } else {
    movies = [];
  }

  movies = movies.filter((movie) => movie.imdbID != id);
  // store the update movie list to local storage
  localStorage.setItem('FAVORITE_MOVIES', JSON.stringify(movies));
  // show empty screen if all are removed
  if (movies.length == 0) {
    document.querySelector('.empty-screen').style.display = 'block';
    document.querySelector('.favorite-movies_list').style.display = 'none';
    return;
  }
}
