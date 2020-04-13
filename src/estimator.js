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

  const impact = {};
  const severeImpact = {};


  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  impact.infectionsByRequestedTime = impact.currentlyInfected * 512;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 512;


  // challenge 2
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  impact.hospitalBedsByRequestedTime = impact.severeCasesByRequestedTime - (0.35 * totalHospitalBeds);
  severeImpact.hospitalBedsByRequestedTime = impact.severeCasesByRequestedTime - (0.35 * totalHospitalBeds);

  // challenge 3
  impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;

  impact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = 0.02 * severeImpact.infectionsByRequestedTime;

  impact.dollarsInFlight = (impact.infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / 30;
  severeImpact.dollarsInFlight = (2 / 100) * severeImpact.infectionsByRequestedTime;


  return { data, impact, severeImpact };
};


//
// export default covid19ImpactEstimator;
module.exports = covid19ImpactEstimator;
