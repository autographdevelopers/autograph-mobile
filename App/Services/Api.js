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
  // QUESTION: why response doesnt not return access token when validation on server falied?
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
  const { currentDrivingSchoolID, currentEmployeeID } = store.getState().context;
  request.headers['access-token'] = accessToken;
  request.headers['token-type'] = tokenType;
  request.headers['client'] = clientId;
  request.headers['expiry'] = expirationDate;
  request.headers['uid'] = uid;
  //
  request.url = request.url.replace(':driving_school_id', currentDrivingSchoolID);

  request.url = request.url.replace(':employee_id', currentEmployeeID);
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



export const API = {
  problemCodes: {
    SERVER_ERROR,
    CLIENT_ERROR,
    NETWORK_ERROR,
    TIMEOUT_ERROR,
    CONNECTION_ERROR
  },
  logIn: (email, password) => api.post('auth/sign_in', { email, password }),
  signUp: userData => api.post('auth', userData),
  resetPassword: email => api.post('auth/password', { email }),
  drivingSchools: {
    create: params => api.post('driving_schools', params),
    update: (params, id = ':driving_school_id') => api.put(`driving_schools/${id}`, params),
    index: () => api.get('driving_schools'),
    show: () => api.get('driving_schools/:driving_school_id'),
  },
  inviteUser: (params, id = ':driving_school_id') =>  api.post(`driving_schools/${id}/invitations`, params),

  scheduleSettings: {
    update: (params, id = ':driving_school_id') => api.put(`driving_schools/${id}/schedule_settings_set`, params),
    show: (id = ':driving_school_id') => api.get(`driving_schools/${id}/schedule_settings_set`)
  },
  scheduleBoundaries: {
    update: (params, id = ':driving_school_id') => api.post(`driving_schools/${id}/schedule_boundaries`, params),
    show: (id = ':driving_school_id') => api.get(`driving_schools/${id}/schedule_boundaries`)
  },
  notificationSettings: {
    show: (id = ':driving_school_id') => api.get(`driving_schools/${id}/employee_notifications_settings_set`),
    update: (params, id = ':driving_school_id') => api.put(`driving_schools/${id}/employee_notifications_settings_set`, params)
  },
  employees: {
    index: (id = ':driving_school_id') => api.get(`driving_schools/${id}/employees`)
  },
  students: {
    index: (id = ':driving_school_id') => api.get(`driving_schools/${id}/students`)
  },
  employeePrivileges: {
    show: (employeeID=':employee_id', id = ':driving_school_id') => api.get(`driving_schools/:driving_school_id/employees/${employeeID}/employee_privilege_set`),
    update: (data, employeeID=':employee_id', id = ':driving_school_id') => api.put(`driving_schools/:driving_school_id/employees/${employeeID}/employee_privilege_set`, data)
  }
};

// TODO update header when school name changed
