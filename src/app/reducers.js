import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
import { beerListReducer } from '../features/BeerList';

const dummyReducer = (store = {}) => store;

export const reducers = combineReducers({
  dummy: dummyReducer,
  toastr: toastrReducer,
  beerList: beerListReducer,
  routing: routerReducer,
});
