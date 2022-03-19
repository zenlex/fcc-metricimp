function ConvertHandler() {
  const UNITS = /(kg|lbs|mi|km|gal|l)$/i
  // const DIGIT_FORMAT=/\d+(?:[.]\d+)?(?:\/\d+(?:[.]\d+)?)?[^\/]/;
  const DIGIT_FORMAT=/(?<digits>[.\d\/]+)?(?<letters>[A-Za-z]+)/
  const UNIT_MAP = new Map([['gal', 'L'], ['lbs', 'kg'], ['mi', 'km']]);
  //add reverse mappings
  for(let entry of UNIT_MAP.entries()){
    const [key, val] = entry;
    UNIT_MAP.set(val, key);
  }
  const UNIT_NAMES = new Map([['gal', 'gallons'], ['l', 'litres'], ['lbs', 'pounds'], ['kg', 'kilograms'], ['mi', 'miles'], ['km', 'kilometers']]);
  // console.log({UNIT_MAP})

  this.getNum = function(input) {
    //add leading 0 if first char is .
    const str = input.charAt(0) === '.' 
      ? '0' + input 
      : input;
    const {digits, letters} = str.match(DIGIT_FORMAT).groups;
    console.log('getNum called:', {digits}, {letters}); 
     // default to qty 1 if naked unit provided
    if(!digits && letters){
      console.log('no number provided, returning 1')
    return 1;
    } 
      
    const slashes = Array.from(digits).filter(char => char === '/');
    
    let num = digits;
    if (slashes.length > 0){ //handle fraction
      console.log({slashes});
      if(slashes.length > 1) return 'invalid number';
      const[a, b] = digits.split('/');
      num = parseFloat(a) / parseFloat(b);
    } else if (/[.]{1}/g.test(num)){ //handle float
       num = parseFloat(num);
    } else num = parseInt(num); //handle int - this may not be needed - could just convert 1 to 1.0....? 
    console.log('returning: ', {num});
    return num;
  };

  this.getUnit = function(input) {
    let tokens = input.match(UNITS);
    console.log('getUnit called with ', {input})
    // console.log(tokens);
    if(tokens){
      let unit = tokens[0].trim();
      unit = (unit === 'l' || unit === 'L')  
      ? 'L' 
      : unit.toLowerCase();
      ('returning: ', unit)
      return unit;
    } else return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    console.log('getReturnUnit calld - initUnit: ', initUnit)
    testUnit = initUnit === 'L' ? initUnit : initUnit.toLowerCase();
    console.log({testUnit});
    let result = UNIT_MAP.get(testUnit);
    console.log('return unit: ', result);
    return result;
  };

  this.spellOutUnit = function(unit) {
    console.log('spellout input unit: ', unit);
    let result = UNIT_NAMES.get(unit.toLowerCase());
    console.log('result', result);
    return result;
  };
  
  this.convert = function(initNum=1, initUnit) {
    const unit = initUnit.toLowerCase();
    console.log('convert called with: ', {initNum}, {initUnit});
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if(initUnit === 'gal' || unit === 'l'){
      result = initUnit === 'gal' 
      ? initNum * galToL 
      : initNum / galToL
    }
    if(initUnit === 'lbs' || unit === 'kg'){
      result = initUnit === 'lbs' 
      ? initNum * lbsToKg
      : initNum / lbsToKg}
    if(initUnit === 'mi' || unit === 'km'){
      result = initUnit === 'mi' 
      ? initNum * miToKm 
      : initNum / miToKm
    }
  
    result = parseFloat(result.toFixed(5));
    console.log('returning', result);
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initNumRounded = Math.round(initNum * 100000)/100000;
    let result=`${initNumRounded} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
  
}

module.exports = ConvertHandler;
