import {useState, useEffect} from 'react';
import {getAllAircrafts, getAllFlights, getAircraft} from './dao.js';
import Paper from '@material-ui/core/Paper';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import AircraftList from './Components/AircraftList.js';
import FlightsList from './Components/FlightsList.js';
import Rotation from './Components/Rotation.js';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

let obj = {};
for (let index = 0; index < 288; index++) {
  obj[index] = 'idle'
}

function App() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1);
  // list of all aircrafts to choose from
  const [aircrafts, setAircrafts] = useState([]);
  // list of all the flights the airline plans to operate on a given day
  const [flights, setFlights] = useState([]);
  const [selectedAircraft, setSelectedAircraft] = useState({});
  const [rotation, setRotation] = useState([]);
  const [utilisation, setUtilisation] = useState(0);

  const setAircraft = async (id) => {
    const aircraft = await getAircraft(id);
    setSelectedAircraft(aircraft);
  };

  const addFlight = (idx) => {
    const flight = flights[idx];
    if (Object.keys(selectedAircraft).length === 0) {
      alert('Please select an aircraft to schedule a rotation.');
      return;
    }

    if (rotation.length === 0) {
      // add first flight to ratation freely
      setRotation([flight]);
    }

    if (rotation.length >= 1) {
      const prevFlight = rotation[rotation.length - 1];
      // minimum time between the end of a flight and the beginning of the next one >= 20
      if ((flight.departuretime - prevFlight.arrivaltime) / 60 >= 20) {
        // add flight to ratation, preserve previous state
        setRotation(state => ([...state, {...flight}]));
      } else if (prevFlight.destination === flight.origin) {
        setRotation(state => ([...state, {...flight}]));
      } else {
        alert('Cannot add flight, either turaround time is not enough or origin and previous destination do not match.');
        return;
      }
    }
    // remove selected flight from "available flights" list
    setFlights(flights.filter((f) => f.id !== flight.id));
  };

  const removeFlight = (idx) => {
    const flight = rotation[idx];
    const newFlightsList = [...flights];
    // remove selected flight from rotation
    setRotation(rotation.filter((f) => f.id !== flight.id));
    // add flight back to "available flights" list - sorted by flight id
    newFlightsList.push(flight);
    newFlightsList.sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
    setFlights(state => (newFlightsList));
  };

  const Timeline = () => {
    const content = [];

    if (rotation.length > 0) {
      const prevFlight = rotation[rotation.length - 1];
      const start = prevFlight.departuretime / 3600 * 12;
      const end = prevFlight.arrivaltime / 3600 * 12;
      for (let index = start; index < end; index++) {
        obj[index] = 'active';
      }
      if (rotation.length > 1) {
        for (let index = rotation[rotation.length - 2].arrivaltime / 3600 * 12; index < prevFlight.departuretime / 3600 * 12; index++) {
          obj[index] = 'turnaround';
        }
      }
    }

    Object.values(obj).forEach(val => {
      if (val === 'active') {
        content.push(<li key={uuidv4()}><div className="timeline-list"></div></li>);
      } else if (val === 'turnaround') {
        content.push(<li key={uuidv4()}><div className="timeline-list-turnaround"></div></li>);
      } else {
        content.push(<li key={uuidv4()}><div className="timeline-list-idle"></div></li>);
      }
    });
    return content;
  };

  useEffect(() => {
    // init
    if (aircrafts.length === 0 && flights.length === 0) {
      getAllAircrafts().then(setAircrafts);
      getAllFlights().then(flights => {
        flights.sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
        setFlights(flights);
      });
    }
    
    // display aircrafts utilisation in percent per 24hr service period
    if (rotation.length > 0) {
      const utilisationSeconds = rotation.reduce((sum, current) => sum + ((current.arrivaltime - current.departuretime) || 0), 0);
      setUtilisation(utilisationSeconds/86400*100);
    }
  }, [aircrafts, flights, rotation]);
  
  return (
    <>
    <header className='top-bar'>
    <h1><AirplanemodeActiveIcon/> AR Aircraft Scheduler</h1>
    </header>
    <main>
      <h2>{`Rotation Schedule for ${tomorrow.toString().slice(0,10)}`}</h2>
      <section className="grid">
        <div className="one">
          <Paper className="section">
            <h3>Aircrafts</h3>
            <AircraftList 
              items={aircrafts} 
              utilisation={utilisation}
              onClick={setAircraft}
              selected={selectedAircraft}
              />
          </Paper>          
        </div>
        <div className="two">
          <Paper className="section">
              <h3>Rotation</h3>
              <Rotation 
                items={rotation}
                onClick={removeFlight}
              />
          </Paper>          
        </div> 
        <div className="three">
          <Paper className="section">
            <h3>Flights</h3>
            <FlightsList 
              items={flights}
              onClick={addFlight}
            />
          </Paper>          
        </div>  
      </section> 
      <div className="bottom-bar">
        <span className="timeline-label">12 AM</span>
        <ul key={uuidv4()} id="timeline">
          <Timeline/>
        </ul>
        <span className="timeline-label">12 AM</span>
      </div> 
      <div className="save">
        <button className="save-button" onClick={() => alert('Rotation schedule has been saved.')}>Submit rotation schedule</button>
      </div>
    </main>
    </>
  );
}

export default App;
