import React, { Component } from 'react';
import { connect } from 'react-redux';

class SingleDream extends Component {
    state = {
        dream: {
            title: ''
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

        return (
            <h1>{this.state.dream.title}</h1>
        );
    }
}
 
function mapStateToProps(state) {
    return({
        myDreams: state.myDreams
    })
}

export default connect(mapStateToProps, null)(SingleDream);