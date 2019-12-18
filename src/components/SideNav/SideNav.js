import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './SideNav.css';

class SideNav extends Component {
    state = {}
    componentDidUpdate() {
        var elems = document.querySelectorAll('.sidenav');
        // console.log(elems)
        window.M.Sidenav.init(elems, {});
    }
    render() {
        // console.log(this.props.auth.isSignedIn)

        let links = [
            <li key='0'><NavLink to="/">Home</NavLink></li>,
            <li key='1'><NavLink to='/login'>LogIn</NavLink></li>
        ]

        if (this.props.auth.isSignedIn) {
            links = [
                <li key='0'><NavLink to="/">Home</NavLink></li>,
                <li key='1'><NavLink to="/entry">New Dream</NavLink></li>,
                <li key='2'><NavLink to="/dreams">My Dreams</NavLink></li>,
                <li key='3'><NavLink to='/stats'>Statistics</NavLink></li>,
                <li key='4'><NavLink to='/login'>LogOut</NavLink></li>
            ]
        }

        let userView = this.props.auth.isSignedIn
            ?
            <li><div className="user-view">
                <div className="background">
                    {/* <img src="office.jpg" alt='officeImg'/> */}
                    <img className='sidenav-img' src="clouds-dark.jpg" alt='officeImg' />
                </div>
                <NavLink to="/login"><img className="circle" src={this.props.auth.userAvatar} alt='userImg'></img></NavLink>
                {/* <a href="#user"><img class="circle" src="images/yuna.jpg"></img></a> */}
                <NavLink to="/login"><span className="white-text name sidenav-user-text">{this.props.auth.displayName}</span></NavLink>
                {/* <a href="#name"><span className="white-text name">John Doe</span></a> */}
                <NavLink to="/login"><span className="white-text name sidenav-user-text">{this.props.auth.email}</span></NavLink>
                {/* <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a> */}
            </div></li>
            : ""

        // console.log(this.props.auth.isSignedIn)
        // console.log(userView)

        return (
            <div className='header'>
                <div className='sidenav-item left'>
                    <ul id="slide-out" className="sidenav">
                        {userView}
                        {links}
                    </ul>
                    <a href="#sidenav" data-target="slide-out" className="sidenav-trigger show-on-large btn-floating btn-large waves-effect waves-light my-side-nav" ><i className="material-icons">menu</i></a>
                </div>
                <NavLink to='/'><h6 className='nav-title'>DreamLogger</h6></NavLink>
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