import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

class AllDreams extends Component {
    state = {

    }

    // componentDidMount() {
    //     console.log(firebase.auth().currentUser)
    // }

    render() { 
        console.log(this.props.auth)
        if(firebase.auth().currentUser) {
            console.log(firebase.auth().currentUser)
        }
        return (
            <h1>Every Entry Here</h1>
        );
    }
}
 
function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps, null)(AllDreams);