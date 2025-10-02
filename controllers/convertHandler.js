class ConvertHandler {
  
  getNum(input) {
    if (!input) return 1;

    // Extraemos la parte numérica
    const unitIndex = input.search(/[a-zA-Z]/);
    let numPart = unitIndex === 0 ? '' : input.slice(0, unitIndex);

    if (!numPart) return 1;

    // Fracciones
    if (numPart.includes('/')) {
      const numbers = numPart.split('/');
      if (numbers.length !== 2) return 'invalid number';
      const numerator = parseFloat(numbers[0]);
      const denominator = parseFloat(numbers[1]);
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return 'invalid number';
      return numerator / denominator;
    }

    const num = parseFloat(numPart);
    return isNaN(num) ? 'invalid number' : num;
  }

  getUnit(input) {
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return 'invalid unit';

    let unit = unitMatch[0].toLowerCase();
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    if (!validUnits.includes(unit)) return 'invalid unit';

    return unit === 'l' ? 'L' : unit;
  }

  getReturnUnit(initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    };
    return map[initUnit] || 'invalid unit';
  }

  spellOutUnit(unit) {
    const names = {
      gal: 'gallons',
      L: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    };
    return names[unit] || 'invalid unit';
  }

  convert(initNum, initUnit) {
    const rates = {
      gal: 3.78541,
      L: 1/3.78541,
      lbs: 0.453592,
      kg: 1/0.453592,
      mi: 1.60934,
      km: 1/1.60934
    };
    const rate = rates[initUnit];
    return rate ? parseFloat((initNum * rate).toFixed(5)) : null;
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  }

  convertAll(input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return { error: 'invalid number and unit' };
    }
    if (initNum === 'invalid number') return { error: 'invalid number' };
    if (initUnit === 'invalid unit') return { error: 'invalid unit' };

    const returnNum = this.convert(initNum, initUnit);
    const returnUnit = this.getReturnUnit(initUnit);
    const string = this.getString(initNum, initUnit, returnNum, returnUnit);

    return { initNum, initUnit, returnNum, returnUnit, string };
  }
}

module.exports = ConvertHandler;