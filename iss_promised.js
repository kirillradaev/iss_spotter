const request = require('request-promise-native');

const fetchMyIp = function () {
  return request('https://api.ipify.org?format=json');
}

const fetchMyCoordsByIp = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`)
};

const fetchISSFlyOverTimes = function (coords) {
  const { lat, lon } = JSON.parse(coords);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  return request (url);
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIp()
    .then(fetchMyCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
        return response
    });
};

module.exports = nextISSTimesForMyLocation;
