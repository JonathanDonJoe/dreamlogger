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
        console.log('componentDidMount')
        console.log(this.props)
        if (this.props.myDreams.length){
            let dreamIndex = Object.keys(this.props.myDreams).find(key => this.props.myDreams[key].dreamKey === this.props.match.params.dreamId)
            console.log('updated')
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

            if (this.props.myDreams.length){
                let dreamIndex = Object.keys(this.props.myDreams).find(key => this.props.myDreams[key].dreamKey === this.props.match.params.dreamId)
                console.log('updated')
                this.setState({
                    dream: this.props.myDreams[dreamIndex]
                })
            }
        }
    }
    
    render() { 
        
    // console.log(this.state)
        let dreamTitle = 'Untitled'
        let dreamDate = 'No date'
        let dreamContents = 'No Contents'
        let dreamPeople = 'none';
        
        if (this.state.dream.peopleArr) {
            dreamPeople = this.state.dream.peopleArr.join(', ');
        }
        if (this.state.dream.date) {
            let dreamArr = this.state.dream.date.split('-');
            dreamDate = [dreamArr[1], dreamArr[2], dreamArr[0]].join('-')
        }
        if (this.state.dream.title) {
            dreamTitle = this.state.dream.title;
        }
        if (this.state.dream.contents) {
            dreamContents = this.state.dream.contents;
        }
        return (
            <div>
                <div className='container single-dream-container'>
                    <div className='row'>
                        <h1>{dreamTitle}</h1>
                        <h5>{dreamDate}</h5>
                        <h5>People: {dreamPeople}</h5>
                        <p>{dreamContents}</p>
                    </div>
                </div>
            </div>        );
    }
}
 
function mapStateToProps(state) {
    return({
        myDreams: state.myDreams
    })
}

export default connect(mapStateToProps, null)(SingleDream);