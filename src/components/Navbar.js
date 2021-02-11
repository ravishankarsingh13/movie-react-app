import React, { Component } from 'react';
// import { data } from '../data';
import { addMovieToList, handleMovieSearch } from '../actions';
import { StoreContext } from '..';
class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        }
    }
    handleAddToMovies = (movie) => {
        this.props.dispatch(addMovieToList(movie));
        // this.setState({
        //     showSearchResults: false
        // });
    }
    handleSearch = () => {
        const { searchText } = this.state;

        this.props.dispatch(handleMovieSearch(searchText))
    }
    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }
    render(){
        const { result: movie , showSearchResults} = this.props.search;
        return (
            <div className="nav">
                <div className="search-container">
                    <input onChange = {this.handleChange}/>
                    <button id="search-btn" onClick = {this.handleSearch}>Search</button>
                
                    {showSearchResults && 
                        <div className = "search-results">
                            <div className = "search-result">
                                <img src= {movie.Poster} alt="search-pic" />
                                <div className= "movie-info">
                                    <span>{movie.Title}</span>
                                    <button id="add-btn" onClick = {() => this.handleAddToMovies(movie)}>Add to Movies</button>
                                </div>
                            </div>
                        </div>
                                
                    }
                
                </div>
            </div>
        );
    }
}

class NavbarWrapper extends Component {
    render() {
        return (
            <StoreContext.Consumer>
                {(store) => {
                    return (<Navbar dispatch = {store.dispatch} search = { this.props.search }/>);
                       }
                }
            </StoreContext.Consumer>
        );
    }
}

export default NavbarWrapper;

