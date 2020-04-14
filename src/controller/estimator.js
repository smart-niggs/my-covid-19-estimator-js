/* eslint-disable consistent-return */
const fs = require('fs');
const xml = require('xml');
const path = require('path');
const covid19ImpactEstimator = require('../estimator');
// const { transformJsonToArrXml } = require('../util/functions');


const estimator = ((req, res) => {
  console.log('estimator');
  const resultObj = covid19ImpactEstimator(req.body);

  if (req.params.resFormat && req.params.resFormat === 'xml') {
    // res.set('Content-Type', 'text/xml');
    res.type('application/xml');

    // resultObj = {
    //   region: {
    //     regA: 'Africa',
    //     regB: 19.7
    //   },
    //   periodType: 'days',
    //   timeToElapse: 58
    // };

    // resultObj = transformJsonToArrXml(resultObj);
    console.log(`resultObj: ${JSON.stringify(resultObj)}`);

    return res.send(xml(resultObj));
    // return res.send(xml({ result: result }));
  }

  res.json(resultObj);
});


const logs = ((req, res) => {
  console.log('logs');
  fs.readFile(path.join(__dirname, '../../txt.log'), 'utf8', (err, data) => {
    if (err) throw err;
    res.set('Content-Type', 'text/plain');

    res.send(data);
  });
});


module.exports = {
  estimator,
  logs
};
