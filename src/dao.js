import axios from 'axios';

const URL = 'https://infinite-dawn-93085.herokuapp.com';

export const getAllAircrafts = async () => {
    try {
        const response  = await axios({
            url: `${URL}/aircrafts`
            , method: 'GET'
        });
        const {data} = response; 
        return data.data;
    } catch (error) {
        // In a real app, the error would be handled and not just logged.
        console.log(`Error: ${error}`);
        return null;
    }
};

export const getAllFlights = async () => {
    try {
        const response  = await axios({
            url: `${URL}/flights`
            , method: 'GET'
        });
        const {data} = response; 
        return data.data;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const getAircraft = async (aircraftId) => {
    try {
        const response  = await axios({
            url: `${URL}/aircrafts/${aircraftId}`
            , method: 'GET'
        });
        const {data} = response; 
        return data.data;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const getFlight = async (flightId) => {
    try {
        const response  = await axios({
            url: `${URL}/flights/${flightId}`
            , method: 'GET'
        });
        const {data} = response; 
        return data.data;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};