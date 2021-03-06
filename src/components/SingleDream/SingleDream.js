import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SingleDream.css';
import { anonymizeDream } from '../../utility/utility';

class SingleDream extends Component {
    state = {
        owner: false
    }

    componentDidMount() {
        if (this.props.myDreams.length) {
            this.checkOwnership(this.props.myDreams, true)
        } else {
            if (this.props.allDreams.length) {
                this.checkNotOwnership(this.props.allDreams, false)
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myDreams !== this.props.myDreams) {
            if (this.props.myDreams.length) {
                this.checkOwnership(this.props.myDreams, true)
            }
        }
        if (prevProps.allDreams !== this.props.allDreams) {
            if (this.props.allDreams.length) {
                this.checkOwnership(this.props.allDreams, false)
            }
        }
    }

    checkOwnership = (dreamArr, isOwnedDream) => {
        if (dreamArr.length) {
            let dreamIndex = Object.keys(dreamArr).find(key => dreamArr[key].dreamKey === this.props.match.params.dreamId)
            // console.log(dreamIndex)
            if (dreamIndex) {
                if (isOwnedDream) {
                    console.log('owner')
                    this.setState({
                        dream: dreamArr[dreamIndex],
                        owner: isOwnedDream
                    })
                } else {
                    console.log('not owner')
                    this.setState({
                        dream: dreamArr[dreamIndex]
                    })
                }
            } else if (!dreamIndex && isOwnedDream) {
                this.checkOwnership(this.props.allDreams, false)
            }
        }
    }


    render() {
        // console.log(this.state)
        // console.log(this.props.auth)
        let dreamTitle = 'Untitled'
        let dreamDate = 'No date'
        let dreamContents = 'No Contents'
        let dreamPeople = 'none';
        // let dreamPeopleArr = [];

        if (this.state.dream) {
            if (!this.state.owner) {
                const filteredDream = anonymizeDream(this.state.dream)
                dreamTitle = filteredDream.title;
                dreamDate = filteredDream.date;
                dreamContents = filteredDream.contents;
                dreamPeople = filteredDream.people;
                // dreamPeopleArr = filteredDream.dreamPeopleArr;
            }
            else {
                // console.log('other ran')
                if (this.state.dream.peopleArr) {
                    dreamPeople = this.state.dream.peopleArr.filter(person => person).join(', ');
                    // console.log(dreamPeople)
                }

                if (this.state.dream.title) {
                    dreamTitle = this.state.dream.title;
                }
                const dateArr = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"]

                if (this.state.dream.date) {
                    let dreamArr = this.state.dream.date.split('-');
                    // console.log(dateArr[dreamArr[1] - 1])
                    dreamDate = `${dateArr[dreamArr[1] - 1]} ${dreamArr[2]}, ${dreamArr[0]}`
                }
                if (this.state.dream.contents) {
                    dreamContents = this.state.dream.contents;
                }
            }
        }
        let theDream = this.state.dream
            ?
            <div className='row'>
                <h1>{dreamTitle}</h1>
                <h5>{dreamDate}</h5>
                <h5>People: {dreamPeople}</h5>
                {/* <p>{dreamContents}</p> */}
                <p>{dreamContents}</p>
            </div>
            :
            // <h1>Dream not found</h1>
            ''

        return (
            <div>
                <div className='container single-dream-container white-text grey darken-2 z-depth-2'>
                    {theDream}
                </div>
            </div>);
    }
}

function mapStateToProps(state) {
    return ({
        myDreams: state.myDreams,
        auth: state.auth,
        allDreams: state.allDreams
    })
}

export default connect(mapStateToProps, null)(SingleDream);