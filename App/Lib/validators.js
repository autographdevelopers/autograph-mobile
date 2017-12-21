export const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const required = value => (value ? undefined : 'To pole jest wymagane.');
export const minLength = min => value => value && value.length < min ? `Musi zawierac minimum ${min} znakow lub wiecej` : undefined;
export const passwordsMatch = (val, allValues) => ( val === allValues['password'] ? undefined : 'Hasla nie pasuja do siebie.');
export const isAccepted = message => (value => ( value ? undefined : message));
export const email = value => (value && !emailRegExp.test(value) ? 'Niepoprawny adres email.' : undefined);
export const optional = _ => undefined;
export const digitsOnly = value => value && /\D/.test(value) ? 'Pole moze skladac sie wylacznie z cyfr.' : undefined;
export const address = (values, allValues) => (
  allValues['street'] && allValues['city'] && allValues['country'] && allValues['zip_code'] ? undefined : 'Nieprawidłowy lub zbyt ogólny adres.' )
