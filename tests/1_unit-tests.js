const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('testing convertHandler.getNum(input', (done) => {
    test('read whole number', (done) => {
      assert.equal(convertHandler.getNum('42mi'), 42);
      done();
    })
    test('read decimal number', (done) => {
      assert.equal(convertHandler.getNum('42.69lb'), 42.69);
      done();
    })
    test('read fraction', (done) => {
      assert.equal(convertHandler.getNum('3/4L'), 0.75);
      done();
    })
    test('read fraction with decimals', (done) => {
      assert.equal(convertHandler.getNum('0.7/1.4km'), 0.5);
      done();
    })
    test('returns error on double-fraction', (done) => {
      assert.equal(convertHandler.getNum('2/4/2gal'), 'invalid number')
      done();
    })
    test('defaults to 1 on naked unit', (done) => {
      assert.equal(convertHandler.getNum('mi'), 1);
      done();
    })
  })

  suite('test function convertHandler.getUnit()', () => {
    test('getUnit reads valid units', (done) => {
      const testUnits = ['kg', 'lbs', 'mi', 'km', 'gal', 'L'];
      for (const unit of testUnits) {
        assert.equal(convertHandler.getUnit(`3${unit}`), unit);
      }
      done();
    });
    test('return error on invalid unit', (done) => {
      assert.equal(convertHandler.getUnit('7foo'), 'invalid unit')
      done();
    })
  })

  suite('test function convertHandler.getReturn Unit', () => {
    test('convertHandler returns correct return unit', (done) => {
      const testUnits = ['kg', 'lbs', 'mi', 'km', 'gal', 'L'];
      const resultUnits = ['lbs', 'kg', 'km', 'mi', 'L', 'gal'];
      for (let i = 0; i < testUnits.length; i++) {
        assert.equal(convertHandler.getReturnUnit(testUnits[i]), resultUnits[i]);
      }
      done();
    })
  })

  suite('test function convertHandler.spellOutUnit', () => {
    test('convertHandler spells out long form unit', (done) => {
      const testUnits = ['kg', 'lbs', 'mi', 'km', 'gal', 'L'];
      const results = ['kilograms', 'pounds', 'miles', 'kilometers', 'gallons', 'litres'];
      for (let i = 0; i < testUnits.length; i++) {
        assert.equal(convertHandler.spellOutUnit(testUnits[i]), results[i]);
      }
      done();
    })
  })

  suite('test conversions', () => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    test('gal to L', (done) => {
      assert.equal(
        convertHandler.convert('1', 'gal'), galToL);
        done();
    })
    test('L to gal', (done) => {
      assert.equal(
        convertHandler.convert('1', 'L'), parseFloat((1 / galToL).toFixed(5)));
        done();
    })
    test('lbs to kg', (done) => {
      assert.equal(
        convertHandler.convert('1', 'lbs'), parseFloat(lbsToKg.toFixed(5)));
        done();
    })
    test('kg to lbs', (done) => {
      assert.equal(
        convertHandler.convert('1', 'kg'), parseFloat((1 / lbsToKg).toFixed(5)));
        done();
    })
    test('mi to km', (done) => {
      assert.equal(
        convertHandler.convert('1', 'mi'), miToKm);
        done();
    })
    test('km to mi', (done) => {
      assert.equal(
        convertHandler.convert('1', 'km'), parseFloat((1 / miToKm).toFixed(5)));
        done();
    })
  })

});