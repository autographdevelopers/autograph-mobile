// a library to wrap and simplify api calls
import apisauce, {
  SERVER_ERROR,
  CLIENT_ERROR,
  NETWORK_ERROR,
  TIMEOUT_ERROR,
  CONNECTION_ERROR
} from 'apisauce'

// our "constructor"
const create = (requestHook, responseHook, baseURL = 'http://localhost:3000/api/v1/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 60000
  });

  api.addResponseTransform(responseHook);

  api.addRequestTransform(requestHook);

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const problemCodes = {
    SERVER_ERROR,
    CLIENT_ERROR,
    NETWORK_ERROR,
    TIMEOUT_ERROR,
    CONNECTION_ERROR
  };


  const getRoot = () => api.get('');
  const getRate = () => api.get('rate_limit');
  const getUser = (username) => api.get('search/users', { q: username });
  const logIn = (email, password) => api.post('auth/sign_in', { email, password });
  const signUp = userData => api.post('auth', userData);
  const resetPassword = email => api.post('auth/password', { email });
  const createDrivingSchool = params => api.post('driving_schools', params);
  const updateScheduleBoundaries = (params, id = ':driving_school_id') => api.post(`driving_schools/${id}/schedule_boundaries`, params); //schould be put on server
  const updateEmployeeNotifications = (params, id = ':driving_school_id') => api.put(`driving_schools/${id}/employee_notifications_settings_set`, params);
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    problemCodes,
    getRoot,
    getRate,
    getUser,
    logIn,
    signUp,
    resetPassword,
    createDrivingSchool,
    updateScheduleBoundaries,
    updateEmployeeNotifications
  }
};

// let's return back our create method as the default.
export default {
  create
}
