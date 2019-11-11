import React, { Component } from 'react';

class SideNav extends Component {
    state = {}
    componentDidUpdate() {
        // document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            window.M.Sidenav.init(elems, {});
        //   });
    }
    render() {
        return (
            <div>
                <ul id="slide-out" className="sidenav">
                    <li><a href="#!">First Sidebar Link</a></li>
                    <li><a href="#!">Second Sidebar Link</a></li>
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>

            </div>
        );
    }
}

export default SideNav;