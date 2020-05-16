import axios from 'axios';

const url = 'https://covidtracking.com/api/v1';

export const fetchData = async () => {
    try {
        const { data } = await axios.get(`${url}/states/current.json`);

        const modifiedData = data.map((stateData) => ({
            state: stateData.state,
            pos: stateData.positive,
        }));

        return modifiedData;
    } catch(err) {
        console.log('Error!');
        console.error(err);
    }
}

export const fetchDailyData = async (state) => {
    let changeableUrl = url;
    changeableUrl = (state) ? url + `/states/${state}/daily.json` 
                            : url + '/us/daily.json'; 
                            
    try {
        const { data } = await axios(changeableUrl);

        let modifiedData = data.map((dailyData) => ({
            pos: dailyData.positive,
            death: dailyData.death,
            date: dailyData.date,
            posInc: dailyData.positiveIncrease,
            deathInc: dailyData.deathIncrease,
        }));
        modifiedData.reverse();

        modifiedData[0].posAcc = 0;
        modifiedData[0].deathAcc = 0;

        for(let i = 1; i< modifiedData.length; i++) {
            modifiedData[i].posAcc = modifiedData[i].posInc - modifiedData[i - 1].posInc ;
            modifiedData[i].deathAcc = modifiedData[i].deathInc - modifiedData[i - 1].deathInc;
        }

        console.log(modifiedData);

        return modifiedData;
    } catch(err) {
        console.log('Error!');
        console.error(err);
    }
    
}

export const fetchStates = async () => {
    try {
        const { data } = await axios.get(`${url}/states/info.json`);
        
        const states = data.map(res => res.state);
        
        return states;
    } catch(err) {
        console.log('Error!');
        console.error(err);
    }
}