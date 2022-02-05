import * as Types from './types';

const initialState = {
  accessToken: '',
  loggedInUser: '',
  restaurantType: '',
  userType: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_ACCESSTOKEN:
      return { ...state, accessToken: action.payload.accessToken };
    case Types.UPDATE_LOGGED_IN_USER:
      return { ...state, loggedInUser: action.payload.loggedInUser };
    case Types.UPDATE_RESTAURANT_TYPE:
      return { ...state, restaurantType: action.payload.restaurantType };
    case Types.UPDATE_USER_TYPE:
      return { ...state, userType: action.payload.userType };
    default: return state;
  }
};

export { reducer };