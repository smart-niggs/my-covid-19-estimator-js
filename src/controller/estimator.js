/* eslint-disable consistent-return */
const fs = require('fs');
// const xml = require('xml');
const path = require('path');
// const convert = require('xml-js');
const builder = require('xmlbuilder');
const covid19ImpactEstimator = require('../estimator');


const estimator = ((req, res) => {
  console.log('estimator');
  let resultObj = covid19ImpactEstimator(req.body);

  if (req.params.resFormat && req.params.resFormat === 'xml') {
    // res.set('Content-Type', 'text/xml');
    res.type('application/xml');

    // resultObj = convert.json2xml(resultObj);
    resultObj = builder.create(resultObj).end({ pretty: true });

    // console.log(`resultObj: ${resultObj}`);
    return res.send(resultObj);
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
