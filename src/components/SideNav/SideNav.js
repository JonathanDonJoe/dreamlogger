import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './SideNav.css';

class SideNav extends Component {
    state = {}
    componentDidUpdate() {
        var elems = document.querySelectorAll('.sidenav');
        window.M.Sidenav.init(elems, {});
    }
    render() {
        console.log(this.props.auth.isSignedIn)

        let links =  [
            <li key='0'><NavLink to="/home">Home</NavLink></li>,
            <li key='1'><NavLink to='/login'>LogIn</NavLink></li>
        ]
        
        if(this.props.auth.isSignedIn) {
            links = [
                <li key='0'><NavLink to="/home">Home</NavLink></li>,
                <li key='1'><NavLink to="/entry">New Dream</NavLink></li>,
                <li key='2'><NavLink to="/dreams">All Dreams</NavLink></li>,
                <li key='3'><NavLink to='/stats'>Statistics</NavLink></li>,
                <li key='4'><NavLink to='/login'>LogOut</NavLink></li>
            ]
        }

        return (
            <div className='sidenav-item left'>
                <ul id="slide-out" className="sidenav">
                    {links}
                </ul>
                <a href="#sidenav" data-target="slide-out" className="sidenav-trigger show-on-large btn-floating btn-large waves-effect waves-light red lighten-1" ><i className="material-icons">menu</i></a>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps, null)(SideNav);