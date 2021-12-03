import moment from "moment";

function isValidEmail(value) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function isValidPhoneNumber(value) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(value));
}

function validateEmail(value, setEmailError) {
  if (value == '') {
    setEmailError('');
  } else if (isValidEmail(value)) {
    setEmailError('');
  } else {
    setEmailError('Invalid Email');
  }
}

//function to validate phoneNumber
function validatePhoneNumber(value, setPhoneNumberError) {
  if (value.length < 10) {
    setPhoneNumberError('Phone number must be 10 digits');
  } else {
    if (isValidPhoneNumber(value)) {
      setPhoneNumberError('');
    }
  }
}

function validatePassword(value, setPasswordError) {
  if (value.length < 9) {
    setPasswordError('Password must be 9 characters');
  } else {
    setPasswordError('');
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

 const formatMoney = (amount: number | string, decimalCount = 2): string => {
  let number = 0;
  if (typeof amount === 'string') {
      number = parseFloat(amount);
  } else if (typeof amount === 'number') {
      number = amount;
  } else {
      return 'NaN';
  }

  let numberString = Math.abs(number).toFixed(decimalCount);

  const [ones, decimals] = numberString.split('.');
  numberString = `${ones.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}${decimals ? `.${decimals}` : ''}`;
  if (number < 0) numberString = `-${numberString}`;
  return numberString;
};


const getNextMonday = () => {
  const today = moment();
  const day = today.day();
  const nextMonday = today.add(7 - day, 'days');
  return nextMonday.format('MMMM Do, YYYY').toString();
};

const groupBy = (xs, key) =>{
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}


const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  onlyUnique,
  formatMoney,
  getNextMonday,
  groupBy
};

export default utils;
