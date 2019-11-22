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
            const rawFreqData = Object.keys(this.state.freqHist).map(key => [key, this.state.freqHist[key]])
            var ctx2 = document.getElementById('myChart').getContext('2d');
            // var myChart = 

            const barColors = Object.keys(this.state.freqHist).map( item => {
                return `rgba(${Math.random(0,255) * 255}, ${Math.random(0,255) * 255}, ${Math.random(0,255) * 255}, 0.2)`
            })
            // const barBorderColors = barColors.map( item => `${item.slice(0, item.length-5)} 1)`)

            console.log(barColors)
            // console.log(barBorderColors)

            new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: rawFreqData.map( item => item[0]),
                    datasets: [{
                        label: 'Dreams',
                        data: rawFreqData.map( item => item[1]),
                        backgroundColor: barColors
                        // [
                        //     'rgba(255, 99, 132, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(255, 206, 86, 0.2)',
                        //     'rgba(75, 192, 192, 0.2)',
                        //     'rgba(153, 102, 255, 0.2)',
                        //     'rgba(255, 159, 64, 0.2)'
                        // ]
                        ,
                        borderColor: "rgba(59.188817995380944, 231.68301778952002, 94.80472761770287, 1)"
                        // barBorderColors
                        // [
                        //     'rgba(255, 99, 132, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(255, 206, 86, 1)',
                        //     'rgba(75, 192, 192, 1)',
                        //     'rgba(153, 102, 255, 1)',
                        //     'rgba(255, 159, 64, 1)'
                        // ]
                        ,
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(0, 0, 255, 0.2)",
                        hoverBorderColor: "rgba(0, 0, 255, 1)"
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontColor: 'black', 
                                fontSize: 20,
                                // stepSize: 1,
                                precision: 0,
                                // maxTicksLimit: 5
                            },
                            gridLines: {
                                // color: 'gray',
                                display: false
                            },
                            scaleLabel: {
                                display: true,
                                fontColor: 'black',
                                fontSize: 30,
                                fontFamily:'Prata',
                                labelString: '# of Dreams'
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'black',
                                // sampleSize: 8,
                            },
                            gridLines: {
                                // color: 'gray',
                                display: false
                            },
                            scaleLabel: {
                                display: true,
                                fontColor: 'black',
                                fontSize: 30,
                                fontFamily:'Prata',
                                labelString: 'People'
                            },
                        }],
                        
                    },
                    title: {
                        display: true,
                        text: 'Most frequent people', 
                        fontColor: 'black',
                        fontSize: 40,
                        fontFamily: 'Prata'
                    },
                    legend: {
                        display: false
                    },
                    // layout: {
                    //     padding: 100
                    // }
                }
            })
        };
    }

    render() {
        // this.filterBy('Jon')

        let tableHolder = <div></div>
        let graphHolder = <div></div>

        tableHolder = this.buildFreqTable()
        graphHolder = 
            <div className='canvas-container'>
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>


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