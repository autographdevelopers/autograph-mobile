export const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const required = value => (value ? undefined : 'This field is required.');
export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const passwordsMatch = (val, allValues) => ( val === allValues['password'] ? undefined : 'Passwords doesnt match.');
export const isAccepted = message => (value => ( value ? undefined : message));
export const email = value => (value && !emailRegExp.test(value) ? 'Invalid email address' : undefined);
