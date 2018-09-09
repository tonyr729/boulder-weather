const fs = require('fs');
const precipData = fs.readFileSync(__dirname + '/boulder_precipitation.txt', 'utf8');
const tempData = fs.readFileSync(__dirname + '/boulder_temperature.txt', 'utf8');

const cleanData = (data) => {
  const allCells = data.split('\n').map(el => el.split(/\s+/) );
  const headings = allCells.filter(cell => cell[1] === "Format:")[0].splice(2)
  const numCells = allCells.filter(cell => cell[0] !== '' && !isNaN(cell[0]))

  const dataObject = numCells.map(el => {
    let cellObject = {};
    for (var i = 0; i < el.length; i++) {
      let cleanHeading = headings[i].replace(/,\s*$/, "")
      if (el[i] < -100) {
        cellObject[cleanHeading] = 0;
      } else {
        cellObject[cleanHeading] = parseInt(el[i]);
      }
    }
    return cellObject;
  });

  return dataObject
};

const combindData = (precip, temp) => {
  const largerList = precip.length >= temp.length ? precip : temp;
  const smallerList = precip.length <= temp.length ? precip : temp;
  
  const combindData = largerList.map(largeElement => {
    let newElement = largeElement;

    const matchingElement = smallerList.filter(smallElement => {
      const { year, mon, day } = smallElement;

      if (
        largeElement.year === year &&
        largeElement.mon === mon &&
        largeElement.day === day
      ) {
        return true;
      }

      return;
    });
    
    if (matchingElement.length) {
      newElement = Object.assign(largeElement, matchingElement[0]);
    }

    return newElement;
  });

  return combindData;
};


const precipFinal = JSON.stringify(cleanData(precipData));
const tempFinal = JSON.stringify(cleanData(tempData));
const finalData = JSON.stringify(combindData(cleanData(precipData), cleanData(tempData)));


fs.writeFileSync('tempData.json', precipFinal, 'utf-8');
fs.writeFileSync('precipData.json', tempFinal, 'utf-8');
fs.writeFileSync('finalData.json', finalData, 'utf-8');
