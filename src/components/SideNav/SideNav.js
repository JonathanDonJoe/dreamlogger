import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SideNav extends Component {
    state = {}
    componentDidUpdate() {
        var elems = document.querySelectorAll('.sidenav');
        window.M.Sidenav.init(elems, {});
    }
    render() {
        console.log(NavLink)
        return (
            <div>
                <ul id="slide-out" className="sidenav">
                    <li><NavLink to="/dreams">Name to show</NavLink></li>
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>

            </div>
        );
    }
}

export default SideNav;