import React, { Component } from 'react';
import { connect } from 'react-redux';


import DreamCard from '../DreamCard/DreamCard';
import SearchBar from '../SearchBar/SearchBar';

class PublicDreams extends Component {
    state = {

    }
    render() {
        let msg = <h1>Dreams</h1>

        let dreamCards = this.props.allDreams.map((dreamItem, i) => <DreamCard dream={dreamItem.dream} dreamId={i} key={i} />)

        // let dreamCards = this.state.filterBy
        //     ? this.filterDreams(this.props.allDreams).map((dream, i) => <DreamCard dream={dream} dreamId={i} key={i} />)
        //     : this.props.allDreams.map((dream, i) => <DreamCard dream={dream} dreamId={i} key={i} />)

        return (
            <div>
                {msg}
                <div className='container card-container'>
                    <div className='row'>
                        < SearchBar submitSearch={this.submitSearch}/>
                        {dreamCards}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        myDreams: state.myDreams,
        allDreams: state.allDreams,
        auth: state.auth
    })
}

export default connect(mapStateToProps, null)(PublicDreams)