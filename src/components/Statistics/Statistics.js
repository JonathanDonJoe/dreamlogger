import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Statistics.css'

class Statistics extends Component {
    state = {
        // mostCommonPerson: 'None',
        freqHist: {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myDreams !== this.props.myDreams) {
            this.buildFrequency()
        }
    }

    componentDidMount() {
        this.buildFrequency()
    }

    filterBy = (str) => {
        if (this.props.myDreams.length) {
            console.log(this.props.myDreams)
            const containsString = this.props.myDreams.filter(dream => dream.peopleArr.includes(str))
            console.log(containsString)
        }
    }

    buildFrequency = () => {
        const newFreqHist = {};
        this.props.myDreams.forEach(dream =>
            dream.peopleArr.forEach(person => {
                newFreqHist[person] = person in newFreqHist ? newFreqHist[person] + 1 : 1
            })
        )
        // // console.log(newFreqHist)
        this.setState({
            freqHist: newFreqHist
        })
    }

    buildFreqTable = () => {
        const rawFreqData = Object.keys(this.state.freqHist).map(key => [key, this.state.freqHist[key]])

        // increasing
        rawFreqData.sort((a, b) => b[1] - a[1])

        // decreasing
        // rawFreqData.sort((a, b) => a[1] - b[1])


        const tableData = rawFreqData.map(item =>
            <tr key={item[0]}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
            </tr>
        )

        console.log(tableData)

        const fullData =
            <table className='highlight centered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Frequency</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData}
                </tbody>
            </table>

        return fullData
    }

    render() {
        // this.filterBy('Jon')

        let tableHolder = ''
        
        tableHolder = this.buildFreqTable()


        return (
            <div className='container'>
                <h1>Statistics</h1>
                {tableHolder}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth,
        myDreams: state.myDreams
    })
}

export default connect(mapStateToProps, null)(Statistics);