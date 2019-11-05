import React, { Component } from 'react';
import './DreamCard.css'

class DreamCard extends Component {
    state = {}
    render() {
        return (

            <div className='col s6 '>
                <div className='dreamcard blue-grey lighten-5'>

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