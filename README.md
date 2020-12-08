# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm i`
Instals dependencies from package.json

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Acceptance Criteria

* The app shows a list of all our aircrafts to choose from
* The app shows a list of all the flights the airline plan to operate that day, their origin, destination, departure time and arrival time
* The purpose of the app is to allow the user to view and edit the daily rotation for each aircraft
* The rotation is the list of flights, in order, an individual aircraft will operate during that day
* Flights must be chosen by the user from our list of flights (right sidebar on the wireframe)
* The app lets the user edit the rotation freely but enforces the following rules:
    * All aircrafts must be on the ground at midnight.
    * The turnaround time (minimum time between the end of a flight and the beginning of the next one) is always 20min for our airline.
    * Aircrafts cannot "teleport" and cannot move without operating a flight, empty aircrafts cost too much!
* The app must display for each aircraft its utilization in percent, i.e. the time the aircraft is on scheduled service per 24 hours
* Aircraft timeline: for the selected aircraft, a horizontal bar shows a period of 24 hours, 
    * scheduled service in green
    * turnaround time in purple
    * idle time in grey

### Assumptions

* Date element at top of page is a label displaying tomorrow's date.

### Tools/Packages used

* https://coolors.co/ - for selecting app color palette
* Axios - for http requests to API
* Material-UI - for icons and layout components
* uuid - for generation unique ids to use in keys

### Notes

There is a known bug with the timeline. To reproduce, add a flight to the Rotation and then click the same flight to remove and add back to the Flights list; you will observe that the active slot on the timeline does not reset. I decided not to fix this bug due to lack of time. As per the instructions, I kept the assignment time at less than 3 hours.


