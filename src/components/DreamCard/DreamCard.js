import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './DreamCard.css'

class DreamCard extends Component {
    state = {}
    render() {
        let dreamTitle = 'Untitled'
        let dreamDate = 'No date'
        let dreamContents = 'No Contents'
        let dreamPeople = 'none';
        if (this.props.dream.peopleArr) {
            dreamPeople = this.props.dream.peopleArr.join(', ');
        }
        if (this.props.dream.date) {
            let dreamArr = this.props.dream.date.split('-');
            dreamDate = [dreamArr[1], dreamArr[2], dreamArr[0]].join('-')
        }
        if (this.props.dream.title) {
            dreamTitle = this.props.dream.title;
        }
        if (this.props.dream.contents) {
            dreamContents = this.props.dream.contents;
        }
        return (
            <Link to={`/dreams/${this.props.dreamId}`} >
            <div className="col s6">
              <div className="card grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{dreamTitle}</span>
                  <span className="card-date">{dreamDate}</span>
                  <p className="card-people">{dreamPeople}</p>
                  <hr/>
                  <p className='max-lines'>{dreamContents}</p>
                </div>
              </div>
            </div>
            </Link>
            // <div className='col s6 '>
            //     <div className='dreamcard blue-grey lighten-5'>
            //         <div className='row'>
            //             <div className='col s12'>
            //                 <h2>{dreamTitle}</h2>
            //             </div>
            //         </div>
            //         <div className='row'>
            //             <div className='col s12'>
            //                 <p>Dream Date: {dreamDate}</p>
            //             </div>
            //         </div>
            //         <div className="row">
            //             <div className='col s12'>
            //                 <p>{dreamContents}</p>
            //             </div>
            //         </div>
            //         <div className="row">
            //             <div className='col s12'>
            //                 <div>Associated people: {dreamPeople}</div>
            //             </div>
            //         </div>
            //     </div>
            // </div>

        );
    }
}

export default DreamCard;