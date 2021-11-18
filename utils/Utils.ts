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

const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
};

export default utils;
