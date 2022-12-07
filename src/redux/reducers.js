import {
  ////////////////APP LOGIN STATES/////////////////////
  SET_LOGIN_USER,
  SET_PHONE_NO,

  ////////////////APP TOP TAB STATES/////////////////////
  SET_TOP_TAB_DRIVER,
  SET_TOP_TAB_VEHICLE,
  SET_TOP_TAB_PAYMENT,
  SET_TOP_TAB_DOCUMENT,

  ////////////////APP STATES/////////////////////
  SET_HOTEL_TYPE,
  SET_DISPATCHER,
  SET_DISPATCHER_ID,

  ////////////////////Account Data Submition////////////////
  SET_DRIVER_SUBMIT_ID,
  SET_VEHICLE_SUBMIT_ID,
  SET_PAYMENT_SUBMIT_ID,
  SET_DOCUMENT_SUBMIT_ID,

  ////////////VEHICLE////////////
  SET_CAR_CONDITION,
  SET_CAR_CONDITION_ID,
  SET_CAR_TYPE,
  SET_CAR_TYPE_ID,
  SET_CAR_MAKE,
  SET_CAR_MAKE_ID,
  SET_CAR_MODAL,
  SET_CAR_MODAL_ID,
  SET_CAR_YEAR,

  ///////////////IMAGES//////////////
  SET_USER_IMAGE,
  SET_CNIC_BACK,
  SET_CNIC_FRONT,
  SET_LICENSE_BACK,
  SET_LICENSE_FRONT,
  SET_VEHICLE_OWNERSHIP,

  /////////////////NAV PLACE///////////////
  SET_NAV_PLACE,

  ////////////////Locations STATES/////////////////////
  SET_COUNTRY_NAME,
  SET_COUNTRY_ID,
  SET_STATE_NAME,
  SET_STATE_ID,
  SET_CITY_NAME,
  SET_CITY_ID,

  ////////////////Order Location detail//////////////
  SET_LOCATION_LAT,
  SET_LOCATION_LNG,
  SET_LOCATION_ADDRESS,

    ////////////////Time Interval//////////////
    SET_TIME_INTERVAL,

} from './actions';

const initialState = {
  ////////////////APP LOGIN STATES/////////////////////
  login_user_id: '',
  phone_no: '',

  ////////////////APP TOP TAB STATES/////////////////////
  top_tab_driver: true,
  top_tab_vehicle: true,
  top_tab_payment: true,
  top_tab_document: true,

  ////////////////APP STATES/////////////////////
  hoteltype: '',
  phone_no: '',
  dispatcher: '',
  dispatcher_id: '',

  ////////////////////Account Data Submition////////////////
  driver_submit_id: '',
  vehicle_submit_id: '',
  payment_submit_id: '',
  document_submit_id: '',

  ////////////VEHICLE////////////
  condition: '',
  condition_id: '',
  car_type: '',
  car_type_id: '',
  car_make: '',
  car_make_id: '',
  car_modal: '',
  car_modal_id: '',
  car_year: '',

  ////////////////IMAGES////////////
  user_image: '',
  license_front: '',
  license_back: '',
  cnic_front: '',
  cnic_back: '',
  ownership: '',

  //////////////////NAV PLACE//////////////
  nav_place: '',

  ////////////////Locations STATES/////////////////////
  country_name: '',
  country_id: '',
  state_name: '',
  state_id: '',
  city_name: '',
  city_id: '',

  ////////////////Order Location detail//////////////
  location_lat: '',
  location_lng: '',
  location_address: '',

    ////////////////Order Location detail//////////////
  time_interval: '',

};

function userReducer(state = initialState, action) {
  switch (action.type) {
    ////////////////APP LOGIN STATES/////////////////////
    case SET_LOGIN_USER:
      return {...state, login_user_id: action.payload};
    case SET_PHONE_NO:
      return {...state, phone_no: action.payload};

    ////////////////APP TOP TAB STATES/////////////////////
    case SET_TOP_TAB_DRIVER:
      return {...state, top_tab_driver: action.payload};
    case SET_TOP_TAB_VEHICLE:
      return {...state, top_tab_vehicle: action.payload};
    case SET_TOP_TAB_PAYMENT:
      return {...state, top_tab_payment: action.payload};
    case SET_TOP_TAB_DOCUMENT:
      return {...state, top_tab_document: action.payload};

    ////////////////APP STATES/////////////////////
    case SET_HOTEL_TYPE:
      return {...state, hoteltype: action.payload};
    case SET_DISPATCHER:
      return {...state, dispatcher: action.payload};
    case SET_DISPATCHER_ID:
      return {...state, dispatcher_id: action.payload};

    ////////////////////Account Data Submition////////////////
    case SET_DRIVER_SUBMIT_ID:
      return {...state, driver_submit_id: action.payload};
    case SET_VEHICLE_SUBMIT_ID:
      return {...state, vehicle_submit_id: action.payload};
    case SET_PAYMENT_SUBMIT_ID:
      return {...state, payment_submit_id: action.payload};
    case SET_DOCUMENT_SUBMIT_ID:
      return {...state, document_submit_id: action.payload};

    ////////////////VEHICLE////////////////
    case SET_CAR_CONDITION:
      return {...state, condition: action.payload};
    case SET_CAR_CONDITION_ID:
      return {...state, condition_id: action.payload};
    case SET_CAR_TYPE_ID:
      return {...state, car_type_id: action.payload};
    case SET_CAR_TYPE:
      return {...state, car_type: action.payload};
    case SET_CAR_MAKE:
      return {...state, car_make: action.payload};
    case SET_CAR_MAKE_ID:
      return {...state, car_make_id: action.payload};
      case SET_CAR_MODAL:
        return {...state, car_modal: action.payload};
      case SET_CAR_MODAL_ID:
        return {...state, car_modal_id: action.payload};
    case SET_CAR_YEAR:
      return {...state, car_year: action.payload};

    ////////////////IMAGES/////////////
    case SET_USER_IMAGE:
      return {...state, user_image: action.payload};
    case SET_LICENSE_BACK:
      return {...state, license_back: action.payload};
    case SET_LICENSE_FRONT:
      return {...state, license_front: action.payload};
    case SET_CNIC_BACK:
      return {...state, cnic_back: action.payload};
    case SET_CNIC_FRONT:
      return {...state, cnic_front: action.payload};
    case SET_VEHICLE_OWNERSHIP:
      return {...state, ownership: action.payload};

    /////////////////////NAV PLACE////////////
    case SET_NAV_PLACE:
      return {...state, nav_place: action.payload};
    ////////////////Locations STATES/////////////////////
    case SET_COUNTRY_NAME:
      return {...state, country_name: action.payload};
    case SET_COUNTRY_ID:
      return {...state, country_id: action.payload};
    case SET_STATE_NAME:
      return {...state, state_name: action.payload};
    case SET_STATE_ID:
      return {...state, state_id: action.payload};
    case SET_CITY_NAME:
      return {...state, city_name: action.payload};
    case SET_CITY_ID:
      return {...state, city_id: action.payload};

    ////////////////Order Location Detail//////////////
    case SET_LOCATION_LAT:
      return {...state, location_lat: action.payload};
    case SET_LOCATION_LNG:
      return {...state, location_lng: action.payload};
    case SET_LOCATION_ADDRESS:
      return {...state, location_address: action.payload};

       ////////////////Order Location Detail//////////////
    case SET_TIME_INTERVAL:
      return {...state, time_interval: action.payload};

    default:
      return state;
  }
}

export default userReducer;
