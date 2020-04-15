const { compute, getObj } = require('./util/estimatorHelper');

const { impact, severeImpact } = getObj();

// console.log('getObj: ' + JSON.stringify(impact));
// console.log('compute: ' + JSON.stringify(compute));
/* eslint-disable max-len */
// {
//   region: {
//     name: "Africa",
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: "days", weeks, months
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// }
// OUTPUT

// {

//   data: { },
//   impact: { },
//   severeImpact: { }
// }

const covid19ImpactEstimator = (data) => {
  // eslint-disable-next-line object-curly-newline
  const { region, periodType, timeToElapse, reportedCases, totalHospitalBeds } = data;
  let time;

  // challenge 1
  compute('currentlyInfected', reportedCases * 10, reportedCases * 50);

  // infectionsByRequestedTime
  if (periodType === 'days') time = timeToElapse / 30;
  if (periodType === 'weeks') time = (timeToElapse * 4) / 30;
  if (periodType === 'months') time = (timeToElapse);

  time = 2 ** Math.trunc(time);

  compute('infectionsByRequestedTime', impact.currentlyInfected * time, severeImpact.currentlyInfected * time);
  // compute('infectionsByRequestedTime', impact.currentlyInfected * 512, severeImpact.currentlyInfected * 512);


  // challenge 2
  compute('severeCasesByRequestedTime', 0.15 * impact.infectionsByRequestedTime, 0.15 * severeImpact.infectionsByRequestedTime);

  compute('hospitalBedsByRequestedTime', impact.severeCasesByRequestedTime - (0.35 * totalHospitalBeds), severeImpact.severeCasesByRequestedTime - (0.35 * totalHospitalBeds));


  // challenge 3
  compute('casesForICUByRequestedTime', 0.05 * impact.infectionsByRequestedTime, 0.05 * severeImpact.infectionsByRequestedTime);

  compute('casesForVentilatorsByRequestedTime', 0.02 * impact.infectionsByRequestedTime, 0.02 * severeImpact.infectionsByRequestedTime);


  compute('dollarsInFlight', (impact.infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / 30,
    (severeImpact.infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / 30);
  // impact.dollarsInFlight = (impact.infectionsByRequestedTime * region.avgDailyIn ailyIncomePopulation * region.avgDailyIncomeInUSD) / 30;


  return { data, impact, severeImpact };
};


//
// export default covid19ImpactEstimator;
module.exports = covid19ImpactEstimator;
