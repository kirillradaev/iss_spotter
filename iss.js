const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null); 
    } if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      return callback(null, data['ip']);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const {lat, lon} = JSON.parse(body);
      const coords = {lat, lon} 
      return callback(null, coords);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body).response;
      return callback(null, data);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if(error) return callback(error,null);
    fetchCoordsByIP(ip, (error, data) => {
      if(error) return callback(error, null);
        fetchISSFlyOverTimes(data, (error, coords) => {
        if(error) return callback(error, null);
        return callback(null, coords);
        })
    })
  })
};

module.exports = nextISSTimesForMyLocation;

