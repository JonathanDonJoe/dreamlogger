import React, { Component } from 'react';
import { connect } from 'react-redux';

class Statistics extends Component {
    state = {
        // mostCommonPerson: 'None',
        freqTable: {}
    }


    checkFrequency = str => {
        if(this.props.myDreams.length) {
            console.log(this.props.myDreams)
            const containsString = this.props.myDreams.filter(dream => dream.peopleArr.includes(str))
            console.log(containsString)
        }
    }

    buildFrequency = () => {
        const newFreqTable = {};
        this.props.myDreams.forEach( dream => 
            dream.peopleArr.forEach( person => {
                if (person in newFreqTable) {
                    newFreqTable[person] += 1
                } else {
                    newFreqTable[person] = 1
                }
            })
        )
        console.log(newFreqTable)
    }

    render() {
        this.checkFrequency('Jon')
        // this.buildFrequency()


        return (
            <div className='container'>
                <h1>Statistics</h1>
                <table className='highlight centered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Frequency</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Alvin</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>Alan</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>Jonathan</td>
                            <td>8</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return({
        auth: state.auth,
        myDreams: state.myDreams
    })
}

export default connect(mapStateToProps, null)(Statistics);