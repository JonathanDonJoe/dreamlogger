import React, { Component } from 'react';
// import * as firebase from 'firebase';
import { connect } from 'react-redux';
import DreamCard from '../DreamCard/DreamCard';
import './AllDreams.css';
import SearchBar from '../SearchBar/SearchBar';

class AllDreams extends Component {
    state = {
        filterBy:''
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.auth !== this.props.auth) {
    //         // console.log(this.props.auth.isSignedIn)
    //         if (this.props.auth.isSignedIn) {
    //             console.log('am signed in')
    //             this.getDreams()
    //         }
    //     }
    // }

    // componentDidMount() {
    // //     console.log(firebase.auth().currentUser)
    // //     const rootRef = firebase.database().ref().child(`users`);
    // //     rootRef.on('value', snap => {
    // //         this.setState({
    // //             dreams: snap.val()
    // //         })
    // //     })
    //     this.getDreams()
    // }

    // getDreams() {
    //     const rootRef = firebase.database().ref().child(`users/${firebase.auth().currentUser.uid}`);
    //     rootRef.on('value', snap => {
    //         // console.log(snap.val())
    //         const dreamArr = []
    //         for (let key in snap.val()) {
    //             dreamArr.push(snap.val()[key])
    //         }
    //         // console.log(snap.val())
    //         // console.log(dreamArr)
    //         this.setState({
    //             dreams: dreamArr
    //         })
    //     })
    // }

    submitSearch = (searchTerm) => {
        this.setState({
            filterBy: searchTerm
        })
    }

    filterDreams = dreams => {
        return dreams.filter( dream => 
            dream.title.toLowerCase().includes(this.state.filterBy.toLowerCase()) 
                || dream.contents.toLowerCase().includes(this.state.filterBy) 
                || dream.peopleArr.map( name => name.toLowerCase()).includes(this.state.filterBy))
    }

    render() {
        // console.log(this.props.auth)
        // console.log(this.state)

        // if (firebase.auth().currentUser) {
        //     console.log(firebase.auth().currentUser.uid)
        // }

        let msg = <h1>Dreams</h1>

        // console.log(this.state.dreams)

        let dreamCards = this.state.filterBy
            ? this.filterDreams(this.props.myDreams).map((dream, i) => <DreamCard dream={dream} dreamId={i} key={i} />)
            : this.props.myDreams.map((dream, i) => <DreamCard dream={dream} dreamId={i} key={i} />)

        
        // let dreamCards = this.state.dreams.map((dream, i) => <DreamCard dream={dream} dreamId={i} key={i} />)
        return (
            <div>
                {msg}
                <div className='container card-container'>
                    <div className='row'>
                        < SearchBar submitSearch={this.submitSearch}/>
                        {dreamCards}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth,
        myDreams: state.myDreams
    })
}

export default connect(mapStateToProps, null)(AllDreams);