import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SingleDream.css'

class SingleDream extends Component {
    state = {
        dream: {
            title: '',
            peopleArr: [],
            contents: ''
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
            // console.log('componentDidUpdate')
            // console.log(this.props.myDreams)

            if (this.props.myDreams.length) {
                let dreamIndex = Object.keys(this.props.myDreams).find(key => this.props.myDreams[key].dreamKey === this.props.match.params.dreamId)
                // console.log('updated')
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

        if (this.state.dream) {
            // console.log(this.state.dream.peopleArr)
            if (this.state.dream.peopleArr) {
                dreamPeople = this.state.dream.peopleArr.filter(person => person).join(', ');
                // console.log(dreamPeople)
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

                const boldName = 'Jed';

                // ATTEMPT 1 //

                // dreamContents = <p>hello <em>my</em> friends</p>



                // ATTEMPT 2 //

                // let emphasizedContents = 
                //     dreamContents
                //         .split(' ')
                //         .map( word => 
                //             word === boldName 
                //                 ? <em>{word}</em>
                //                 : word
                //         )


                // ATTEMPT 3 //

                // let contentsArr = []
                // contentsArr.push(emphasizedContents[0])
                // for (let i=1; i < emphasizedContents.length; i++) {
                //     contentsArr.push(' ')
                //     contentsArr.push(emphasizedContents[i])
                // }


                // ATTEMPT 4 //
                // This works, but also emphasizes the name if its not its own word (bold 'me' will also bold part of 'home')

                // let emphasizedContents = 
                //     dreamContents
                //         .split(boldName)
                //         // .join(<em>{boldName}</em>)

                // let contentsArr = []
                // contentsArr.push(emphasizedContents[0])
                // for (let i=1; i < emphasizedContents.length; i++) {
                //     // contentsArr.push(' ')
                //     contentsArr.push(<em>{boldName}</em>)
                //     contentsArr.push(emphasizedContents[i])
                // }



                // // ATTEMPT 5 //
                // // Works for all instances that are surrounded by spaces.  Does not work for all instances attached to a comma or punctuation

                // let emphasizedContents =
                //     dreamContents
                //         .split(' ')
                //         // .join(<em>{boldName}</em>)
                //         .map(word =>
                //             word === boldName
                //                 ? <b>{word}</b>
                //                 : word
                //         )

                // let contentsArr = []
                // contentsArr.push(emphasizedContents[0])
                // for (let i=1; i < emphasizedContents.length; i++) {
                //     // contentsArr.push(' ')
                //     contentsArr.push(' ')
                //     contentsArr.push(emphasizedContents[i])
                // }




                // ATTEMPT 6 //
                // Works using RegExp

                function matchWord(s, word) {
                    var re = new RegExp( '\\b' + word + '\\b', 'g');
                    // console.log(re)
                    // console.log([...s.matchAll(re)])
                    return [...s.matchAll(re)];
                }

                function replaceWord(str, index, word) {
                    let newStr = str;
                    newStr = str.slice(0,index) + word + str.slice(index+word.length-1)

                    return newStr
                }

                let matchedArr = matchWord(dreamContents, boldName)
                let emphasizedContents = dreamContents
                
                for (let i=matchedArr.length-1; i>=0; i--){
                    // console.log('ran')
                    emphasizedContents = replaceWord(emphasizedContents, matchedArr[i].index, 'Joel')
                }







                // console.log(contentsArr)
                // console.log(emphasizedContents)
                dreamContents = emphasizedContents
                // dreamContents = contentsArr

                // console.log(dreamContents)

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
        myDreams: state.myDreams
    })
}

export default connect(mapStateToProps, null)(SingleDream);