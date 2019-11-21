import React, { Component } from 'react';
import { connect } from 'react-redux';

class Statistics extends Component {
    state = {
        // mostCommonPerson: 'None',
        freqTable: {}
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
        const newFreqTable = {};
        this.props.myDreams.forEach(dream =>
            dream.peopleArr.forEach(person => {
                newFreqTable[person] = person in newFreqTable ? newFreqTable[person] + 1 : 1
            })
        )
        // // console.log(newFreqTable)
        this.setState({
            freqTable: newFreqTable
        }, () => console.log(this.state))
    }

    render() {
        // this.filterBy('Jon')

        const rawFreqData = Object.keys(this.state.freqTable).map(key => [key, this.state.freqTable[key]])

        // increasing
        rawFreqData.sort((a, b) => b[1] - a[1])
        
        // decreasing
        // rawFreqData.sort((a, b) => a[1] - b[1])


        const tableData = rawFreqData.map(item =>
            <tr>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
            </tr>
        )

        console.log(tableData)

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
                        {tableData}
                    </tbody>
                </table>
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