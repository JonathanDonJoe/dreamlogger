import React, { Component } from 'react';
import { Chart } from 'chart.js';

// import './FreqGraph.css'


class FreqGraph extends Component {
    state = {

    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('componentDidUpdate')
    //     if (
    //         // prevProps.freqHist !== this.props.freqHist 
    //         // && 
    //         prevProps.showGraph !== this.props.showGraph
    //         ) {
    //         console.log('componentDidUpdate for real')
    //         this.buildGraph();
    //         // this.buildGraph();
    //     }
    // }

    componentDidMount() {
        this.buildGraph()
    }

    buildGraph = () => {
        var ctx = document.getElementById('myChart')
        // console.log('ran buildGraph')
        if (ctx) {
            // console.log('found graph')
            const rawFreqData = Object.keys(this.props.freqHist).map(key => [key, this.props.freqHist[key]])
            var ctx2 = document.getElementById('myChart').getContext('2d');

            const barColors = Object.keys(this.props.freqHist).map(item => {
                return `rgba(${Math.random(0, 255) * 255}, ${Math.random(0, 255) * 255}, ${Math.random(0, 255) * 255}, 0.2)`
            })
            // const barBorderColors = barColors.map( item => `${item.slice(0, item.length-5)} 1)`)

            console.log(barColors)
            // console.log(barBorderColors)

            new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: rawFreqData.map(item => item[0]),
                    datasets: [{
                        label: 'Dreams',
                        data: rawFreqData.map(item => item[1]),
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
                                fontFamily: 'Montserrat',
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
                                fontFamily: 'Prata',
                                labelString: '# of Dreams'
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'black',
                                fontFamily: 'Montserrat',
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
                                fontFamily: 'Prata',
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
        // console.log('rendered FreqGraph')
        // console.log(this.props)

        // if(this.props.showGraph) {
        //     this.buildGraph()
        // }
        return (
            <div className='canvas-container'>
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        );
    }
}

export default FreqGraph;