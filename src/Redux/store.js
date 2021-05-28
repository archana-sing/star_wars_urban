import { combineReducers } from 'redux';
import {createStore, compose, applyMiddleware} from 'redux'
import {reducer}from './reducer'

const customMiddleware = (store) => (next) => (action) => {
    return typeof action === "function"
      ? action(store.dispatch, store.getState)
      : next(action);
  };
  const rootReducer = combineReducers({
    people : reducer
  })



const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, createComposer(applyMiddleware(customMiddleware)));
// console.log(store.getState())

export {store}