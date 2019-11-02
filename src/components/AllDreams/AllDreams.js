import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

class AllDreams extends Component {
    state = {

    }

    
    componentDidMount() {
        console.log(firebase.auth().currentUser)
        const rootRef = firebase.database().ref().child(`users`);
        rootRef.on('value', snap => {
            console.log(snap.val())
        })
    }

    render() {
        console.log(this.props.auth)
        if (firebase.auth().currentUser) {
            console.log(firebase.auth().currentUser.uid)


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