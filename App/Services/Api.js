import { store } from '../Containers/App';
import { sessionActionCreators } from '../Redux/SessionRedux';
import apisauce, {
  SERVER_ERROR,
  CLIENT_ERROR,
  NETWORK_ERROR,
  TIMEOUT_ERROR,
  CONNECTION_ERROR
} from 'apisauce'

const responseHook = response => {
  const sessionMetadata = {};
  // QUESTION: why response doesnt not return access token wehn validation on server falied?
  // QUESTION why lack of zip code triggers 500 error
  if (response.headers && response.headers['access-token'] && response.headers['token-type'] && response.headers['client'] && response.headers['expiry'] && response.headers['uid']) {
    sessionMetadata['accessToken'] = response.headers['access-token'];
    sessionMetadata['tokenType'] = response.headers['token-type'];
    sessionMetadata['clientId'] = response.headers['client'];
    sessionMetadata['expirationDate'] = response.headers['expiry'];
    sessionMetadata['uid'] = response.headers['uid'];

    store.dispatch(sessionActionCreators.setUserSession(sessionMetadata));
  }
};

const requestHook = request => {
  const { accessToken, tokenType, clientId, expirationDate, uid } = store.getState().session;
  const { currentDrivingSchoolID } = store.getState().context;
  request.headers['access-token'] = accessToken;
  request.headers['token-type'] = tokenType;
  request.headers['client'] = clientId;
  request.headers['expiry'] = expirationDate;
  request.headers['uid'] = uid;
  //
  request.url = request.url.replace(':driving_school_id', currentDrivingSchoolID);
};

const api = apisauce.create({
  baseURL:'http://localhost:3000/api/v1/',
  // here are some default headers
  headers: {
    'Cache-Control': 'no-cache'
  },
  // 10 second timeout...
  timeout: 10000
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
const problemCodes = { // TODO check if these are not defined in api object
  SERVER_ERROR,
  CLIENT_ERROR,
  NETWORK_ERROR,
  TIMEOUT_ERROR,
  CONNECTION_ERROR
};


const getRoot = () => api.get(''),
      getRate = () => api.get('rate_limit'),
      getUser = (username) => api.get('search/users', { q: username }),
      logIn = (email, password) => api.post('auth/sign_in', { email, password }),
      signUp = userData => api.post('auth', userData),
      resetPassword = email => api.post('auth/password', { email }),
      createDrivingSchool = params => api.post('driving_schools', params),
      updateDrivingSchool = (params, id = ':driving_school_id') => api.put(`driving_schools/${id}`, params),
      updateScheduleBoundaries = (params, id = ':driving_school_id') => api.post(`driving_schools/${id}/schedule_boundaries`, params), //schould be put on server
      updateScheduleSettings = (params, id = ':driving_school_id') => api.put(`driving_schools/${id}/schedule_settings_set`, params), //schould be put on server
      updateEmployeeNotifications = (params, id = ':driving_school_id') => api.put(`driving_schools/${id}/employee_notifications_settings_set`, params);
      fetchDrivingSchools = () => api.get('driving_schools');
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
export const API = {
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
  updateEmployeeNotifications,
  updateDrivingSchool,
  updateScheduleSettings,
  fetchDrivingSchools
};

