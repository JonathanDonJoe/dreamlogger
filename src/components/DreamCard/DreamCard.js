import React, { Component } from 'react';

class DreamCard extends Component {
    state = {}
    render() {
        return (
            <div id="event-card-style" className='col s12 m5 l3 blue-grey lighten-5'>
                <div className='col s12'>
                    <div className='row'>
                        <div className='col s12'>
                            <h2>{this.props.dream.title}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col s12'>
                            <p>{this.props.dream.contents}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col s12'>
                            <div>Associated people: {this.props.dream.peopleArr.join(', ')}</div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DreamCard;