import React from 'react';
import { Chart, StatePicker, Display, Bar } from './components';
import { fetchDailyData } from './api';
// import styles from './App.module.css';

class App extends React.Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    const fetchedData = await fetchDailyData();
    
    this.setState({ data: fetchedData});
  }

  handleStateChange = async (state) => {
    const fetchedData = await fetchDailyData(state);

    this.setState({ data: fetchedData });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <StatePicker handleStateChange={this.handleStateChange} /> 
        <Display data={data[data.length - 1]} />
        <Chart data={data}/>  
        <Bar />
      </div>
    );
  }
}

export default App;
