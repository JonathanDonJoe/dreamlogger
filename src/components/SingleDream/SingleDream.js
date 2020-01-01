import React, { Component } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';

import './SingleDream.css';
import { matchWord, replaceWord } from '../../utility/utility';

class SingleDream extends Component {
    state = {
        dream: {
            title: '',
            peopleArr: [],
            contents: ''
        },
        owner: false
    }

    componentDidMount() {
        // This runs before this.props.myDreams is updated by the store
        // console.log('componentDidMount')
        // console.log(this.props)
        if (this.props.myDreams.length) {
            let dreamIndex = Object.keys(this.props.myDreams).find(key => this.props.myDreams[key].dreamKey === this.props.match.params.dreamId)
            console.log('owner')
            this.setState({
                dream: this.props.myDreams[dreamIndex]
            })
        } else {
            console.log('set dream without ownership')
            console.log(this.props.match.params.dreamId)
            console.log(this.props.allDreams)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myDreams !== this.props.myDreams) {
            // if (this.props.myDreams.length) {
            //     let dreamIndex = Object.keys(this.props.myDreams).find(key => this.props.myDreams[key].dreamKey === this.props.match.params.dreamId)
            //     console.log(dreamIndex)
            //     console.log('owner')
            //     if (dreamIndex) {
            //         this.setState({
            //             dream: this.props.myDreams[dreamIndex]
            //         })
            //     }
            // }
            this.checkOwnership(this.props.myDreams, true)
        }
        if (prevProps.allDreams !== this.props.allDreams) {
            if (this.props.allDreams.length) {
                // console.log('update setDream without ownership')
                // console.log(this.props.match.params.dreamId)
                // console.log(this.props.myDreams)
                // console.log(this.props.allDreams)
                // let dreamIndex = Object.keys(this.props.allDreams).find(key => this.props.allDreams[key].dreamKey === this.props.match.params.dreamId)
                // console.log(dreamIndex)

                // // sanitize and randomize dream here.  then setState
                // this.setState({
                //     dream: this.props.allDreams[dreamIndex]
                // })
                this.checkOwnership(this.props.allDreams, false)
            }
        }
    }

    checkOwnership = (dreamArr, isOwnedDream) => {
        if (dreamArr.length) {
            let dreamIndex = Object.keys(dreamArr).find(key => dreamArr[key].dreamKey === this.props.match.params.dreamId)
            console.log(dreamIndex)
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
            }
        }
    }

    checkNotOwnership = (dreamArr) => {
        if (dreamArr.length) {
            let dreamIndex = Object.keys(dreamArr).find(key => dreamArr[key].dreamKey === this.props.match.params.dreamId)
            console.log(dreamIndex)
            // sanitize and randomize dream here.  then setState
            this.setState({
                dream: dreamArr[dreamIndex]
            })
        }
    }


    render() {

        console.log(this.state)
        console.log(this.props.auth)
        let dreamTitle = 'Untitled'
        let dreamDate = 'No date'
        let dreamContents = 'No Contents'
        let dreamPeople = 'none';
        let dreamPeopleArr = [];

        if (this.state.dream) {
            // console.log(this.state.dream.peopleArr)


            if (!this.state.owner) {

                if (this.state.dream.date) {
                    dreamDate = ''
                }

                if (this.state.dream.title) {
                    dreamTitle = this.state.dream.title;
                }
                if (this.state.dream.peopleArr) {
                    // dreamPeople = this.state.dream.peopleArr.filter(person => person).join(', ');
                    dreamPeopleArr = this.state.dream.peopleArr.filter(person => person).map(person => [person, faker.name.findName()])
                    dreamPeople = dreamPeopleArr.map(personArr => personArr[1]).join(', ');
                    // console.log(dreamPeopleArr)
                    // console.log(dreamPeople)
                }
                if (this.state.dream.contents) {
                    // dreamContents = this.state.dream.contents;

                    // const boldName = 'Jed';
                    // const replacementName = faker.name.findName();


                    // let matchedArr = matchWord(dreamContents, boldName)
                    // let emphasizedContents = dreamContents

                    // for (let i = matchedArr.length - 1; i >= 0; i--) {
                    //     emphasizedContents = replaceWord(emphasizedContents, matchedArr[i].index, replacementName);
                    // }


                    // This does a 1:1 replacement.  It does not replace partial names
                    let emphasizedContents = this.state.dream.contents;
                    for (let i = 0; i < dreamPeopleArr.length; i++) {

                        let boldName = dreamPeopleArr[i][0];
                        let replacementName = dreamPeopleArr[i][1];
                        let matchedArr = matchWord(emphasizedContents, boldName)
                        // console.log(matchedArr)
                        for (let i = matchedArr.length - 1; i >= 0; i--) {
                            emphasizedContents = replaceWord(emphasizedContents, boldName.length, matchedArr[i].index, replacementName);
                        }
                        // console.log(emphasizedContents)
                        let boldFirstName = dreamPeopleArr[i][0].split(' ')[0]
                        // console.log(boldFirstName);
                        let replacementFirstName = dreamPeopleArr[i][1].split(' ')[0];
                        // console.log(replacementFirstName);
                        let matchedArr2 = matchWord(emphasizedContents, boldFirstName)
                        // console.log(matchedArr2);
                        // console.log(matchedArr2.length);
                        // if (matchedArr2.length) {
                        for (let i = matchedArr2.length - 1; i >= 0; i--) {
                            emphasizedContents = replaceWord(emphasizedContents, boldFirstName.length, matchedArr2[i].index, replacementFirstName);
                        }
                        // console.log(emphasizedContents)
                        // }
                    }



                    // console.log(contentsArr)
                    // console.log(emphasizedContents)
                    dreamContents = emphasizedContents
                    // dreamContents = contentsArr

                    // console.log(dreamContents)

                }
            }
            else {
                console.log('other ran')
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
            <h1>Dream not found</h1>

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