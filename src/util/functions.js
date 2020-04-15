/* eslint-disable array-callback-return */

const transform = ((data) => {
  const tempArr = [];//

  Object.keys(data).map((key) => {
    let obj = {};

    if (typeof (data[key]) === 'object') {
      const tempArr1 = [];
      const dataObj1 = data[key];

      Object.keys(dataObj1).map((key1) => {
        if (typeof (dataObj1[key1]) === 'object') {
          const tempArr2 = [];
          const dataObj2 = data[key];
          let obj2 = {};

          Object.keys(dataObj2).map((key2) => {
            obj2[key2] = dataObj2[key2];
            tempArr2.push(obj2);
          });

          //     obj = {};
          // obj[key] = tempArr1;
          // tempArr.push(obj);

          obj2 = {};
          obj2[key1] = tempArr2;
          tempArr1.push(obj2);
        }
        const obj1 = {};
        obj1[key1] = dataObj1[key1];
        tempArr1.push(obj1);
        // tempArr.push({ key: innerObj[key] });
      });

      obj = {};
      obj[key] = tempArr1;
      tempArr.push(obj);
      // return
    } else {
      // obj = {};
      obj[key] = data[key];

      tempArr.push(obj);
    }

    // return tempArr;
  });
  console.log(`result: ${JSON.stringify(tempArr)}`);

  return tempArr;
});


const transformJsonToArrXml = (((data) =>
// res.send(xml({ a: 1 }));
// use recurssion here instead, because levels depeer than 2 will be hard;
  // eslint-disable-next-line implicit-arrow-linebreak
  transform(data)
));


module.exports = {
  transformJsonToArrXml
};
