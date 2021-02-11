import React, { Component } from 'react';
import {data} from '../data';
import NavbarWrapper from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourite} from '../actions';
import { StoreContext } from '../index';

class AppWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) =>{
          return (
            <App store={store}/>
          );
        }
        }
      </StoreContext.Consumer> 
    );
  }
}


class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;

    store.subscribe(() => {
      console.log('Updated!');
      this.forceUpdate();
      console.log('State', this.props.store.getState());
    });
    //make API call
    //dispatch action
    store.dispatch(addMovies(data));
    console.log('State', this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const {movies} = this.props.store.getState();
    const {favourites} = movies;
    const index = favourites.indexOf(movie);

    if(index !== -1){
      //Found the movie
      return true;  
    }
    return false;
  };

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourite(val));
  } 

  render(){
    const {movies, search} = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <NavbarWrapper search = { search }/>
        <div className ="main">
          <div className = "tabs">
            <div className = {`tab ${showFavourites ? '' : 'active-tabs'}`} onClick = {() => this.onChangeTab(false)} >
              Movies
            </div>
            <div className = {`tab ${showFavourites ? 'active-tabs' : ''}`} onClick = {() => this.onChangeTab(true)}>
              Favourites
            </div>
          </div>
          <div className = "list">
                {displayMovies.map((movie, index) => (
                  <MovieCard 
                    movie={movie} 
                    key={`movies-${index}`} 
                    dispatch={this.props.store.dispatch}
                    isFavourite = {this.isMovieFavourite(movie)}
                  />
                ))}
            </div>
            {displayMovies.length === 0 ? <div className = "no-movies">No movies to display!!</div> : null}
        </div>
      </div>
    ); 
  }
}

export default AppWrapper;
