import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import AppWrapper from './components/App';
import rootReducer from './reducers';

//Curried form of function logger(obj, next, action)
// const logger = function({dispatch , getState}){
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('ACTION_TYPE = ', action.type);
//       next(action);
//     }
//   }
// }
//Curried form of logger function using arrow function chain
//Middleware will already have dispatch and getstate
const logger = ({dispatch , getState}) => (next) => (action) =>{
    if(typeof action !== 'function'){
      console.log('ACTION_TYPE = ', action.type);
    }
    next(action);
}

// const thunk = ({ dispatch, getState }) => (next) => (action) => {

//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store', store);

export const StoreContext = createContext();

class Provider extends React.Component {
  render() {
    const { store} = this.props;
    return (
      <StoreContext.Provider value ={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}


ReactDOM.render(
  <Provider store = {store}>
    {/* <App store={store}/> */}
    <AppWrapper />
  </Provider>,
  document.getElementById('root')
);