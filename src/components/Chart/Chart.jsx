import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data }) => {
    const arrayLength = data.length;

    const lineChart = (
        data[0]
            ? (
                <Line
                    data = {{
                        labels: data.map(res => res.date),
                        datasets: [
                            {
                                data: data.map(res => res.pos),
                                label: 'Infected Over Time (mileage)',
                                borderColor: 'blue',
                                fill: true,
                            } , {
                                data: data.map(res => res.death),
                                label: 'Deaths',
                                borderColor: 'red',
                                fill: true,
                            },
                            {
                                data: data.map(res => res.tested),
                                labels: 'Tested',
                                borderColor: 'yellow',
                                fill: true,
                            }
                        ],
                    }}

                />
            
            ) : null
    );

    const spikeChart = (
        data[0] 
            ? (
                <Line
                    data={{
                        labels: data.map(res => res.date),
                        datasets: [
                            {
                                data: data.map(res => res.posInc),
                                label: 'New Infections Per Day (velocity)',
                                borderColor: 'blue',
                                fill: true,
                            }, {
                                data: data.map(res => res.deathInc),
                                label: 'New Deaths Per Day',
                                borderColor: 'red',
                                fill: true,
                            },
                        ],
                    }}
                />
            ) : null
    );

    const accChart = (
        data[0] 
            ? (
                <Line
                    data={{
                        labels: data.map(res => res.date),
                        datasets: [
                            {
                                data: data.map(res => res.posAcc),
                                label: 'Infected Growth Rate',
                                borderColor: 'blue',
                                fill: true,
                            }, {
                                data: data.map(res => res.deathAcc),
                                label: 'Death Growth Rate',
                                borderColor: 'red',
                                fill: true,
                            },
                        ],
                    }}
                />
            ) : null
    );

    const pieChart = (
        data[0] 
            ? (
                <Pie
                    data = {{
                        labels: ['Positive', 'Tested', 'Died'],
                        datasets: [{
                            data: [
                                data[arrayLength-1].pos,
                                data[arrayLength-1].tested, 
                                data[arrayLength-1].death                                
                            ],
                            backgroundColor: ['blue', 'yellow', 'red']
                        }
                        ],
                    }}

                />
            
            ) : null
    );

    return (
        <div>
            <div className={styles.container}>
                { (lineChart) ? lineChart : 'Mileage'}
            </div>
            <div className={styles.container}>
                { (spikeChart) ? spikeChart : 'Velocity'}
            </div>
            <div className={styles.container}>
                { (accChart) ? accChart : 'Acc'}
            </div>
            <div>
                { (pieChart) ? pieChart : 'huh'}
            </div>
        </div>
    );
}

export default Chart;