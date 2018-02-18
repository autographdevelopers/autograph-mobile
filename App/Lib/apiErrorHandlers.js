export const gatherErrorsFromResponse = (response, api) => {
  const errors = {}; // or set to undefined

  switch (response.problem) {
    case api.problemCodes.CLIENT_ERROR:
      Object.keys(response.data).forEach(field => errors[field] = { all: response.data[field] });
      if(response.status === 401) {
        errors['_error'] = 'Authentication failure. Please login with valid credentials.';
      }
      break;
    case api.problemCodes.SERVER_ERROR:
      errors['_error'] = 'Upps server error occured - it\'s probably our fault, please try again later.';
      break;
    case api.problemCodes.TIMEOUT_ERROR:
      errors['_error'] = 'Timeout error occured - it took too long to respond to your request, please try again later.';
      break;
    case api.problemCodes.CONNECTION_ERROR:
      errors['_error'] = 'Connection error occured - server is not available or bad DNS..';
      break;
    case api.problemCodes.NETWORK_ERROR:
      errors['_error'] = 'Network error occured - please check your connection.';
      break;
    default:
      errors['_error'] = 'Unexpected error occured, please try again later.';
      break;
  }
  return errors;
};
