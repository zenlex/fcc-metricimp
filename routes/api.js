'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    console.log(req.query)
    const input = req.query.input;
    const num = convertHandler.getNum(input);
    const unit = convertHandler.getUnit(input);
    if (num === 'invalid number' && unit === 'invalid unit') {
      return res.send('invalid number and unit');
    } else if (num === 'invalid number') {
      return res.send(num);
    } else if (unit === 'invalid unit') {
      return res.send(unit);
    } else {
        const returnNum = convertHandler.convert(num, unit);
        const returnUnit = convertHandler.getReturnUnit(unit);
        const string = convertHandler.getString(num, unit, returnNum, returnUnit);
        const result = {
          initNum: num,
          initUnit: unit,
          returnNum,
          returnUnit,
          string
        }
        console.log('result:', result);
        return res.send(result);
      }
  })
};
