
import axios from 'axios';

const perPage = 26;
const LOADED_BEERS = 'LOADED_BEERS';
const FAILED_LOADING_BEERS = 'FAILED_LOADING_BEERS';
const TOGGLE_FAVOURITES_FILTER = 'TOGGLE_FAVOURITES_FILTER';
const GO_TO_JOIN = 'GO_TO_JOIN';
const ADD_BEER_TO_FAVOURITES = 'ADD_BEER_TO_FAVOURITES';
const REMOVE_BEER_FROM_FAVOURITES = 'REMOVE_BEER_FROM_FAVOURITES';
const SORT_BY_NAME = 'SORT_BY_NAME';
const SORT_BY_ABV = 'SORT_BY_ABV';

function compareByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
function compareByABV(a, b) {
  if (a.abv < b.abv) {
    return -1;
  }
  if (a.abv > b.abv) {
    return 1;
  }
  return 0;
}

function compareByID(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

export const selectSortByName = state => state.beerList.sortByName;

export const selectSortByABV = state => state.beerList.sortByABV;
export const selectActive = (state) => {
  if (state.beerList.hasFavouritesFilter === false) {
    return 0;
  } else if (state.beerList.hasFavouritesFilter === true) {
    return 1;
  }
  return 2;
};
export const currentPageSelector = state => state.beerList.loadedBeers.length / perPage;
export const loadedBeersSelector = (state) => {
  if (selectActive(state) === 1) {
    return state.beerList.loadedBeers.filter(item => item.isFavourite);
  }
  return state.beerList.loadedBeers;
};
export const loadedBeersCountSelector = state => loadedBeersSelector(state).length;


function loadedBeersActionCreator(beers, page) {
  return {
    type: LOADED_BEERS,
    data: {
      beers,
      page,
    },
  };
}

function errorLoadingBeersAction() {
  return {
    type: FAILED_LOADING_BEERS,
  };
}

export function loadNextPage(page = 1) {
  return (dispatch) => {
    axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
      .then((response) => {
        dispatch(loadedBeersActionCreator(response.data, page));
      })
      .catch(() => {
        dispatch(errorLoadingBeersAction());
      });
  };
}

export function addBeerToFavourites(beerName) {
  return {
    type: ADD_BEER_TO_FAVOURITES,
    data: {
      name: beerName,
    },
  };
}

export function removeBeerFromFavourites(beerName) {
  return {
    type: REMOVE_BEER_FROM_FAVOURITES,
    data: {
      name: beerName,
    },
  };
}

export function toggleFavouritesFilter(value) {
  return {
    type: TOGGLE_FAVOURITES_FILTER,
    data: {
      value,
    },
  };
}

export function toggleSortByName(value) {
  return {
    type: SORT_BY_NAME,
    data: {
      value,
    },
  };
}

export function toggleSortByABV(value) {
  return {
    type: SORT_BY_ABV,
    data: {
      value,
    },
  };
}
export function goToJoin() {
  return {
    type: GO_TO_JOIN,
  };
}

const initialState = {
  loadedBeers: [],
  loadingNewBatch: false,
  errorLoading: false,
  hasFavouritesFilter: false,
  sortByName: false,
  sortByABV: false,
};


function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADED_BEERS: {
      let sortFunction;
      if (state.sortByABV) {
        sortFunction = compareByABV;
      } else if (state.sortByName) {
        sortFunction = compareByName;
      } else {
        sortFunction = compareByID;
      }
      if (action.data.page === 1) {
        return Object.assign({}, state, { loadedBeers: action.data.beers.sort(sortFunction) });
      }
      return Object.assign({}, state, {
        loadedBeers: state.loadedBeers.concat(action.data.beers).sort(sortFunction),
      }); }
    case FAILED_LOADING_BEERS: return Object.assign({}, state, {
      errorLoading: true,
    });
    case TOGGLE_FAVOURITES_FILTER: return Object.assign({}, state, {
      hasFavouritesFilter: action.data.value,
    });
    case ADD_BEER_TO_FAVOURITES: return Object.assign({}, state, {
      loadedBeers: state.loadedBeers.map((beer) => {
        if (beer.name === action.data.name) {
          return Object.assign(beer, { isFavourite: true });
        }
        return beer;
      }),
    });
    case REMOVE_BEER_FROM_FAVOURITES: return Object.assign({}, state, {
      loadedBeers: state.loadedBeers.map((beer) => {
        if (beer.name === action.data.name) {
          return Object.assign(beer, { isFavourite: false });
        }
        return beer;
      }),
    });
    case SORT_BY_ABV: {
      if (action.data.value) {
        return Object.assign({}, state, {
          loadedBeers: state.loadedBeers.sort(compareByABV), sortByABV: true, sortByName: false,
        });
      }
      return Object.assign({}, state, {
        loadedBeers: state.loadedBeers.sort(compareByID), sortByABV: false, sortByName: false,
      });
    }
    case SORT_BY_NAME: {
      if (action.data.value) {
        return Object.assign({}, state, {
          loadedBeers: state.loadedBeers.sort(compareByName), sortByName: true, sortByABV: false,
        });
      }
      return Object.assign({}, state, {
        loadedBeers: state.loadedBeers.sort(compareByID), sortByName: false, sortByABV: false,
      });
    }
    case GO_TO_JOIN: return Object.assign({}, state, { hasFavouritesFilter: undefined });
    default: return state;
  }
}

export default reducer;
