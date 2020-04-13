
const transform = ((data) => {
const tempArr = [];

  Object.keys(data).map((key) => {
    let obj = {};

    if (typeof (data[key]) === 'object') {
      return transform(data[key]);

      // return
    }
    // obj = {};
    obj[key] = data[key];

    tempArr.push(obj);

    // return tempArr;
  });
  // console.log(`result: ${JSON.stringify(tempArr)}`);

  return tempArr;
});


const transformJsonToArrXml = (((data) => {
  // res.send(xml({ a: 1 }));

  // use recurssion here instead, because levels depeer than 2 will be hard;

  return transform(data);
}));


module.exports = {
  transformJsonToArrXml
};
