import React, { Component } from 'react';

class SingleDream extends Component {
    state = {

    }
    render() { 
        return (
            <h1>SingleDream {this.props.match.params.dreamId}</h1>
        );
    }
}
 
export default SingleDream;