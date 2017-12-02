export const required = value => (value ? undefined : 'This field is required.');
export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const passwordsMatch = (val, allValues) => ( val === allValues['password'] ? undefined : 'Passwords doesnt match.');
export const acceptTerms = value => ( value ? undefined : 'You must accept terms and conditions.');
export const email = value => {
  return value && ! /^([^@\\s]+)@((?:[-a-z0-9]+\\.)+[a-z]{2,})$/gi.test(value)
    ? 'Invalid email address'
    : undefined;
};

// const number = value =>
//   value && isNaN(Number(value)) ? 'Must be a number' : undefined
// const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined
// const minValue18 = minValue(18)

// const tooOld = value =>
//   value && value > 65 ? 'You might be too old for this' : undefined
// const aol = value =>
//   value && /.+@aol\.com/.test(value)
//     ? 'Really? You still use AOL for your email?'
//     : undefined
// const alphaNumeric = value =>
//   value && /[^a-zA-Z0-9 ]/i.test(value)
//     ? 'Only alphanumeric characters'
//     : undefined
// export const phoneNumber = value =>
//   value && !/^(0|[1-9][0-9]{9})$/i.test(value)
//     ? 'Invalid phone number, must be 10 digits'
//     : undefined
