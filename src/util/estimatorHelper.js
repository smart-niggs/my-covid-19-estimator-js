const impact = {};
const severeImpact = {};

const getObj = () => ({ impact, severeImpact });


const compute = ((item, impactVal, severeVal) => {
  impact[item] = Math.trunc(impactVal);
  severeImpact[item] = Math.trunc(severeVal);
});


module.exports = {
  // getObj: {impact, severeImpact },
  getObj,
  compute
};
