import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SingleDream.css'

class SingleDream extends Component {
    state = {
        dream: {
            title: '',
            peopleArr: [],
            conetnts: ''
        }
    }

    componentDidMount() {
        // This runs before this.props.myDreams is updated by the store
        // console.log('componentDidMount')
        // console.log(this.props)
        if (this.props.myDreams.length) {
            let dreamIndex = Object.keys(this.props.myDreams).find(key => this.props.myDreams[key].dreamKey === this.props.match.params.dreamId)
            // console.log('updated')
            this.setState({
                dream: this.props.myDreams[dreamIndex]
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myDreams !== this.props.myDreams) {
            // console.log(this.props.auth.isSignedIn)
            // if (this.props.auth.isSignedIn) {
            //     console.log('am signed in')
            //     this.getDreams()
            // }
            console.log('componentDidUpdate')
            console.log(this.props.myDreams)

            if (this.props.myDreams.length) {
                let dreamIndex = Object.keys(this.props.myDreams).find(key => this.props.myDreams[key].dreamKey === this.props.match.params.dreamId)
                console.log('updated')
                this.setState({
                    dream: this.props.myDreams[dreamIndex]
                })
            }
        }
    }

    render() {

        console.log(this.state)
        let dreamTitle = 'Untitled'
        let dreamDate = 'No date'
        let dreamContents = 'No Contents'
        let dreamPeople = 'none';

        if (this.state.dream) {
            console.log(this.state.dream.peopleArr)
            if (this.state.dream.peopleArr) {
                dreamPeople = this.state.dream.peopleArr.filter(person => person).join(', ');
                console.log(dreamPeople)
            }

            const dateArr = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"]


            if (this.state.dream.date) {
                let dreamArr = this.state.dream.date.split('-');
                // console.log(dateArr[dreamArr[1] - 1])
                dreamDate = `${dateArr[dreamArr[1] - 1]} ${dreamArr[2]}, ${dreamArr[0]}`
            }
            if (this.state.dream.title) {
                dreamTitle = this.state.dream.title;
            }
            if (this.state.dream.contents) {
                dreamContents = this.state.dream.contents;
            }
        }

        let theDream = this.state.dream
            ? 
                <div className='row'>
                    <h1>{dreamTitle}</h1>
                    <h5>{dreamDate}</h5>
                    <h5>People: {dreamPeople}</h5>
                    <p>{dreamContents}</p>
                </div>
            : 
                <h1>Dream not found</h1>
        return (
            <div>
                <div className='container single-dream-container'>
                {theDream}
                </div>
            </div>);
    }
}

function mapStateToProps(state) {
    return ({
        myDreams: state.myDreams
    })
}

export default connect(mapStateToProps, null)(SingleDream);