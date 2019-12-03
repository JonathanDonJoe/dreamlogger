import React, { Component } from 'react';
import './SearchBar.css';


export class SearchBar extends Component {

    state = {
        searching: ''
    }

    changeSearch = (e) => {
        this.setState({
            searching: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        
    }

    render() {
        return (
            <nav id="searchbar-style" className='white col s8 offset-s2'>
                <div className="nav-wrapper">
                    <form onSubmit={this.onSubmit}>
                        <div className="input-field">
                        <input id="search" onChange={this.changeSearch} value={this.state.searching} type="search" />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>
             
        )
    }
}
export default SearchBar;
