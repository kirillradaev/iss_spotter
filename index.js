const nextISSTimesForMyLocation  = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for( let i = 0; i < passTimes.length; i++) {
    const date = new Date (passTimes[i].risetime * 1000);
    date.toUTCString();
    console.log('Next pass at ' + date + ' for ' + passTimes[i].duration + ' seconds.');
  }

});

