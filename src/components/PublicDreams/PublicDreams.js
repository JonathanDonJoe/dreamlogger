import React, { Component } from 'react';
import { connect } from 'react-redux';

class PublicDreams extends Component {
    state = {

    }
    render() {
        console.log(this.props.allDreams)
        return (
            <h1>Public Dreams</h1>
        );
    }
}

function mapStateToProps(state) {
    return ({
        myDreams: state.myDreams,
        allDreams: state.allDreams,
        auth: state.auth
    })
}

export default connect(mapStateToProps, null)(PublicDreams)