const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      const input = '32L';
      const result = convertHandler.getNum(input);
      assert.equal(result, 32);
      done();
    });
    
    test('Decimal number input', function(done) {
      const input = '5.4gal';
      const result = convertHandler.getNum(input);
      assert.equal(result, 5.4);
      done();
    });
    
    test('Fractional input', function(done) {
      const input = '3/2mi';
      const result = convertHandler.getNum(input);
      assert.equal(result, 1.5);
      done();
    });
    
    test('Fractional input with decimal', function(done) {
      const input = '3.5/2lbs';
      const result = convertHandler.getNum(input);
      assert.equal(result, 1.75);
      done();
    });
    
    test('Double-fraction error', function(done) {
      const input = '3/2/3kg';
      const result = convertHandler.getNum(input);
      assert.equal(result, 'invalid number');
      done();
    });
    
    test('Default to 1 when no numerical input', function(done) {
      const input = 'gal';
      const result = convertHandler.getNum(input);
      assert.equal(result, 1);
      done();
    });
    
  });

  suite('Function convertHandler.getUnit(input)', function() {
    
    test('Read each valid input unit', function(done) {
      const inputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      inputs.forEach((input, i) => {
        assert.equal(convertHandler.getUnit(input), expected[i]);
      });
      done();
    });
    
    test('Invalid unit', function(done) {
      const input = '32g';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'invalid unit');
      done();
    });
    
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('Return correct return unit for each valid input unit', function(done) {
      const inputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      inputs.forEach((input, i) => {
        assert.equal(convertHandler.getReturnUnit(input), expected[i]);
      });
      done();
    });
    
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('Return spelled-out string unit for each valid input unit', function(done) {
      const inputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      inputs.forEach((input, i) => {
        assert.equal(convertHandler.spellOutUnit(input), expected[i]);
      });
      done();
    });
    
  });

  suite('Function convertHandler.convert(initNum, initUnit)', function() {
    
    test('Convert gal to L', function(done) {
      const initNum = 1;
      const initUnit = 'gal';
      const expected = 3.78541;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert L to gal', function(done) {
      const initNum = 1;
      const initUnit = 'L';
      const expected = 0.26417;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert mi to km', function(done) {
      const initNum = 1;
      const initUnit = 'mi';
      const expected = 1.60934;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert km to mi', function(done) {
      const initNum = 1;
      const initUnit = 'km';
      const expected = 0.62137;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert lbs to kg', function(done) {
      const initNum = 1;
      const initUnit = 'lbs';
      const expected = 0.45359;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert kg to lbs', function(done) {
      const initNum = 1;
      const initUnit = 'kg';
      const expected = 2.20462;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
  });

});