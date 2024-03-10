import { omdbValue, apiUrl } from './constants.js';
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.search-input');
  const suggestionList = document.querySelector('#suggestions-list');

  searchInput.addEventListener('keyup', function (e) {
    const value = e.target.value;
    // added this special condition because it returns too many results error when tried with less than 3 characters
    if (value.length >= 3) {
      searchByKeyword(value);
    } else {
      // otherwise clear suggestion, helpful deleting search input
      suggestionList.innerHTML = '';
    }
  });
  async function searchByKeyword(searchKey) {
    try {
      const url = `${apiUrl}?s=${searchKey}&page=1&apikey=${omdbValue}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw Error('response is not okay');
      }
      const res = await response.json();
      console.log('res ==>', res);

      if (res.Response == 'True' && res.Search.length) {
        for (const movie of res.Search) {
          populateSuggestionList(movie);
        }
      } else {
        throw new Error('movie not found');
      }
    } catch (error) {
      //clearing suggestion
      suggestionList.innerHTML = '';
      console.log('error happened =>', error);
    }
  }
  function populateSuggestionList(movie) {
    const listItem = document.createElement('li');
    listItem.classList.add('suggestion-item');
    const dataEl = document.createElement('a');
    const href = `movie.html?Title=${movie.Title}&Poster=${movie.Poster}&tt=${movie.imdbID}&Year=${movie.Year}`;
    dataEl.setAttribute('href', href);
    dataEl.classList.add('data', 'without-link-style');
    const titleEl = document.createElement('span');
    titleEl.textContent = movie.Title;
    const yearEl = document.createElement('span');
    yearEl.textContent = `- ${movie.Year}`;
    dataEl.append(titleEl, yearEl);

    // Create and append the <span> element with the star icon
    const spanElement = document.createElement('span');
    spanElement.addEventListener('click', function () {
      addToFavorites(movie);
    });
    spanElement.classList.add('make-fvrt-frm-search');

    const svgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('width', '24');
    svgElement.setAttribute('height', '24');
    svgElement.setAttribute('class', 'ipc-icon ipc-icon--star-border-inline');
    svgElement.setAttribute('viewBox', '0 0 24 24');
    svgElement.setAttribute('fill', 'currentColor');
    svgElement.setAttribute('role', 'presentation');

    const pathElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    pathElement.setAttribute(
      'd',
      'M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z'
    );

    svgElement.appendChild(pathElement);
    spanElement.appendChild(svgElement);
    listItem.append(dataEl, spanElement);

    suggestionList.appendChild(listItem);
  }
  // searchByKeyword('BATMAN');
  // searchByKeyword('pk');
  function addToFavorites(movie) {
    let movies = localStorage.getItem('FAVORITE_MOVIES');
    if (movies) {
      movies = JSON.parse(movies);
    } else {
      movies = [];
    }
    // check if already added to favorites, to avoid duplication
    const isAddedAlready = movies.find((m) => m.imdbID === movie.imdbID);
    if (isAddedAlready) {
      return;
    }
    movies.push(movie);
    localStorage.setItem('FAVORITE_MOVIES', JSON.stringify(movies));
  }
});
