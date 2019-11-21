import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';

import './Statistics.css'

class Statistics extends Component {
    state = {
        // mostCommonPerson: 'None',
        freqHist: {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myDreams !== this.props.myDreams) {
            this.buildFrequency();
            this.buildGraph();
        }
    }

    componentDidMount() {
        this.buildFrequency()
        this.buildGraph()
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

    buildGraph = () => {
        var ctx = document.getElementById('myChart')
        if (ctx) {

            var ctx2 = document.getElementById('myChart').getContext('2d');
            // var myChart = 
            new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
        };
    }

    render() {
        // this.filterBy('Jon')

        let tableHolder = <div></div>
        let graphHolder = <div></div>

        tableHolder = this.buildFreqTable()
        graphHolder = <canvas id="myChart" width="400" height="400"></canvas>
        

        return (
            <div className='container'>
                <h1>Statistics</h1>
                {tableHolder}
                {graphHolder}
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