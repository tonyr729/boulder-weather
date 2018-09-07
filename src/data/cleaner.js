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
      cellObject[cleanHeading] = el[i];
    }
    return cellObject;
  });

  return dataObject;
};




