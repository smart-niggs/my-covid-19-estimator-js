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
//   periodType: "days",
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
  const { region, reportedCases, totalHospitalBeds } = data;
  // const { region, periodType, timeToElapse, reportedCases, population, totalHospitalBeds } = data;

  // challenge 1
  compute('currentlyInfected', reportedCases * 10, reportedCases * 50);
  // impact.currentlyInfected = reportedCases * 10;
  // severeImpact.currentlyInfected = reportedCases * 50;


  compute('infectionsByRequestedTime', impact.currentlyInfected * 512, severeImpact.currentlyInfected * 512);
  // impact.infectionsByRequestedTime = impact.currentlyInfected * 512;
  // severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 512;


  // challenge 2
  compute('severeCasesByRequestedTime', 0.15 * impact.infectionsByRequestedTime, 0.15 * severeImpact.infectionsByRequestedTime);
  // impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  // severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  compute('hospitalBedsByRequestedTime', impact.severeCasesByRequestedTime - (0.35 * totalHospitalBeds), severeImpact.severeCasesByRequestedTime - (0.35 * totalHospitalBeds));
  // impact.hospitalBedsByRequestedTime = impact.severeCasesByRequestedTime - (0.35 * totalHospitalBeds);
  // severeImpact.hospitalBedsByRequestedTime = severeImpact.severeCasesByRequestedTime - (0.35 * totalHospitalBeds);

  // challenge 3
  compute('casesForICUByRequestedTime', 0.05 * impact.infectionsByRequestedTime, 0.05 * severeImpact.infectionsByRequestedTime);
  // impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
  // severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;

  compute('casesForVentilatorsByRequestedTime', 0.02 * impact.infectionsByRequestedTime, 0.02 * severeImpact.infectionsByRequestedTime);
  // impact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;
  // severeImpact.casesForVentilatorsByRequestedTime = 0.02 * severeImpact.infectionsByRequestedTime;

  compute('dollarsInFlight', (impact.infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / 30,
  (severeImpact.infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / 30);
  // impact.dollarsInFlight = (impact.infectionsByRequestedTime * region.avgDailyIn ailyIncomePopulation * region.avgDailyIncomeInUSD) / 30;


  return { data, impact, severeImpact };
};


//
// export default covid19ImpactEstimator;
module.exports = covid19ImpactEstimator;
