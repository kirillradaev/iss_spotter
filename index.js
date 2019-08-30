// const  fetchMyIP  = require('./iss');
// const fetchCoordsByIP = require('./iss');
// const fetchISSFlyOverTimes = require('./iss');
const nextISSTimesForMyLocation  = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });
// '162.245.144.188'

// fetchCoordsByIP('162.245.144.188', (error, response) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   } else {
//     const {latitude, longitude} = response.data;
//     console.log('It worked! Returned coordinates: ', {latitude, longitude});
//   }
// });

// let coordinates = { latitude: '49.26200', longitude: '-123.09230' };

// fetchISSFlyOverTimes(coordinates , (error, response) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   } else {
//     console.log('It worked! Expected pass times: ', response);
//   }
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for( let i = 0; i < passTimes.length; i++) {
    const date = new Date (passTimes[i].risetime * 1000);
    date.toUTCString();
    console.log('Next pass at ' + date + ' for ' + passTimes[i].duration);
  }

});

