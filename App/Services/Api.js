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

const problemCodes = { // TODO check if these are not defined in api object
  SERVER_ERROR,
  CLIENT_ERROR,
  NETWORK_ERROR,
  TIMEOUT_ERROR,
  CONNECTION_ERROR
};

export const API = {
  problemCodes,
  logIn: (email, password) => api.post('auth/sign_in', { email, password }),
  signUp: userData => api.post('auth', userData),
  resetPassword: email => api.post('auth/password', { email }),
  createDrivingSchool: params => api.post('driving_schools', params),
  updateDrivingSchool: (params, id = ':driving_school_id') => api.put(`driving_schools/${id}`, params),
  updateEmployeeNotifications: (params, id = ':driving_school_id') => api.put(`driving_schools/${id}/employee_notifications_settings_set`, params),
  fetchDrivingSchools: () => api.get('driving_schools'),
  showDrivingSchool: () => api.get('driving_schools/:driving_school_id'),
  inviteUser: (params, id = ':driving_school_id') =>  api.post(`driving_schools/${id}/invitations`, params),

  scheduleSettings: {
    update: (params, id = ':driving_school_id') => api.put(`driving_schools/${id}/schedule_settings_set`, params),
    show: (id = ':driving_school_id') => api.get(`driving_schools/${id}/schedule_settings_set`)
  },

  scheduleBoundaries: {
    update: (params, id = ':driving_school_id') => api.post(`driving_schools/${id}/schedule_boundaries`, params),
    show: (id = ':driving_school_id') => api.get(`driving_schools/${id}/schedule_boundaries`)
  }
};
