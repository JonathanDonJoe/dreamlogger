import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import DreamCard from '../DreamCard/DreamCard';

class AllDreams extends Component {
    state = {
        dreams: []
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.auth !== this.props.auth) {
            console.log('Changed Props')
            this.getDreams()
        }
    }

    // componentDidMount() {
    //     console.log(firebase.auth().currentUser)
    //     const rootRef = firebase.database().ref().child(`users`);
    //     rootRef.on('value', snap => {
    //         this.setState({
    //             dreams: snap.val()
    //         })
    //     })
    // }

    getDreams() {
        const rootRef = firebase.database().ref().child(`users/${firebase.auth().currentUser.uid}`);
        rootRef.on('value', snap => {
            console.log(snap.val())
            const dreamArr = []
            for (let key in snap.val()) {
                dreamArr.push(snap.val()[key])
            }
            console.log(snap.val())
            console.log(dreamArr)
            this.setState({
                dreams: dreamArr
            })
        })
    }

    render() {
        console.log(this.props.auth)
        console.log(this.state)
        if (firebase.auth().currentUser) {
            console.log(firebase.auth().currentUser.uid)


        }
        console.log(this.state.dreams)
        let dreamCards = this.state.dreams.map( (dream, i) => <DreamCard dream={dream} key={i}/>)
        return (
            <div>
                <h1>Every Entry Here</h1>
                {dreamCards}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps, null)(AllDreams);