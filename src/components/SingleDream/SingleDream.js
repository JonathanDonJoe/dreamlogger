import React, { Component } from 'react';
import { connect } from 'react-redux';

class SingleDream extends Component {



    render() { 

        console.log(this.props)

        return (
            <h1>SingleDream {this.props.match.params.dreamId}</h1>
        );
    }
}
 
function mapStateToProps(state) {
    return({
        myDreams: state.myDreams
    })
}

export default connect(mapStateToProps, null)(SingleDream);