  ////////////////APP STATES/////////////////////
export const SET_HOTEL_TYPE = 'SET_HOTEL_TYPE';
export const SET_DISPATCHER = 'SET_DISPATCHER';
export const SET_DISPATCHER_ID = 'SET_DISPATCHER_ID';

////////////////////Account Data Submition////////////////
export const SET_DRIVER_SUBMIT_ID = 'SET_DRIVER_SUBMIT_ID';
export const SET_VEHICLE_SUBMIT_ID = 'SET_VEHICLE_SUBMIT_ID';
export const SET_PAYMENT_SUBMIT_ID = 'SET_PAYMENT_SUBMIT_ID';
export const SET_DOCUMENT_SUBMIT_ID = 'SET_DOCUMENT_SUBMIT_ID';


///////////////////APP TOP TAB STATES/////////////////////
export const SET_TOP_TAB_DRIVER = 'SET_TOP_TAB_DRIVER';
export const SET_TOP_TAB_VEHICLE = 'SET_TOP_TAB_VEHICLE';
export const SET_TOP_TAB_PAYMENT = 'SET_TOP_TAB_PAYMENT';
export const SET_TOP_TAB_DOCUMENT = 'SET_TOP_TAB_DOCUMENT';

  ////////////VEHICLE////////////
export const SET_CAR_CONDITION = 'SET_CAR_CONDITION';
export const SET_CAR_CONDITION_ID = 'SET_CAR_CONDITION_ID';
export const SET_CAR_TYPE = 'SET_CAR_TYPE';
export const SET_CAR_TYPE_ID = 'SET_CAR_TYPE_ID';
export const SET_CAR_MAKE = 'SET_CAR_MAKE';
export const SET_CAR_MAKE_ID = 'SET_CAR_MAKE_ID';
export const SET_CAR_MODAL = 'SET_CAR_MODAL';
export const SET_CAR_MODAL_ID = 'SET_CAR_MODAL_ID';
export const SET_CAR_YEAR = 'SET_CAR_YEAR';

//////////////////IMAGES/////////////////
export const SET_USER_IMAGE= 'SET_USER_IMAGE';
export const SET_LICENSE_BACK= 'SET_LICENSE_BACK';
export const SET_LICENSE_FRONT= 'SET_LICENSE_FRONT';
export const SET_CNIC_FRONT= 'SET_CNIC_FRONT';
export const SET_CNIC_BACK= 'SET_CNIC_BACK';
export const SET_VEHICLE_OWNERSHIP= 'SET_VEHICLE_OWNERSHIP';

/////////////////////NavPlace///////////////////
export const SET_NAV_PLACE= 'SET_NAV_PLACE';

  ////////////////APP TOP TAB STATES/////////////////////
  export const setTopTabDriver = top_tab_driver => dispatch => {
    dispatch({
        type: SET_TOP_TAB_DRIVER,
        payload: top_tab_driver,
    });
};

export const setTopTabVehicle = top_tab_vehicle => dispatch => {
    dispatch({
        type: SET_TOP_TAB_VEHICLE,
        payload: top_tab_vehicle,
    });
};

export const setTopTabPayment = top_tab_payment => dispatch => {
    dispatch({
        type: SET_TOP_TAB_PAYMENT,
        payload: top_tab_payment,
    });
};

export const setTopTabDocument = top_tab_document => dispatch => {
    dispatch({
        type: SET_TOP_TAB_DOCUMENT,
        payload: top_tab_document,
    });
};
  ////////////////APP STATES/////////////////////

  ///////////////User Login Info STATE AND FUNCTION ///////////////
    export const SET_LOGIN_USER = 'SET_LOGIN_USER';
    export const SET_PHONE_NO = 'SET_PHONE_NO';

  export const setLoginUser = login_user_id => dispatch => {
    dispatch({
        type: SET_LOGIN_USER,
        payload: login_user_id,
    });
};
export const setPhoneNumber = phone_no => dispatch => {
    dispatch({
        type: SET_PHONE_NO,
        payload: phone_no,
    });
};


////////////////////Account creation////////////////
export const setHotelType = hoteltype => dispatch => {
    dispatch({
        type: SET_HOTEL_TYPE,
        payload: hoteltype,
    });
};

export const setDispatcher = dispatcher => dispatch => {
    dispatch({
        type: SET_DISPATCHER,
        payload: dispatcher,
    });
};
export const setDispatcherId = dispatcher_id => dispatch => {
    dispatch({
        type: SET_DISPATCHER_ID,
        payload: dispatcher_id,
    });
};

////////////////////Account Data Submition////////////////
export const setDriverSubmitId = driver_submit_id => dispatch => {
    dispatch({
        type: SET_DRIVER_SUBMIT_ID,
        payload: driver_submit_id,
    });
};
export const setVehicleSubmitId = vehicle_submit_id => dispatch => {
    dispatch({
        type: SET_VEHICLE_SUBMIT_ID,
        payload: vehicle_submit_id,
    });
};

export const setPaymentSubmitId = payment_submit_id => dispatch => {
    dispatch({
        type: SET_PAYMENT_SUBMIT_ID,
        payload: payment_submit_id,
    });
};

export const setDocumentsSubmitId = document_submit_id => dispatch => {
    dispatch({
        type: SET_DOCUMENT_SUBMIT_ID,
        payload: document_submit_id,
    });
};


//////////////////////Car Info//////////////////
export const setCarCondition = condition => dispatch => {
    dispatch({
        type: SET_CAR_CONDITION,
        payload: condition,
    });
};
export const setCarConditionId = condition_id => dispatch => {
    dispatch({
        type: SET_CAR_CONDITION_ID,
        payload: condition_id,
    });
};
export const setCarType = car_type => dispatch => {
    dispatch({
        type: SET_CAR_TYPE,
        payload: car_type,
    });
};
export const setCarTypeId = car_type_id => dispatch => {
    dispatch({
        type: SET_CAR_TYPE_ID,
        payload: car_type_id,
    });
};
export const setCarMake = car_make => dispatch => {
    dispatch({
        type: SET_CAR_MAKE,
        payload: car_make,
    });
};
export const setCarMakeId = car_make_id => dispatch => {
    dispatch({
        type: SET_CAR_MAKE_ID,
        payload: car_make_id,
    });
};
export const setCarModal = car_modal => dispatch => {
    dispatch({
        type: SET_CAR_MODAL,
        payload: car_modal,
    });
};
export const setCarModalId = car_modal_id => dispatch => {
    dispatch({
        type: SET_CAR_MODAL_ID,
        payload: car_modal_id,
    });
};
export const setCarYear = car_year => dispatch => {
    dispatch({
        type: SET_CAR_YEAR,
        payload: car_year,
    });
};

//////////////////////images Info//////////////////

export const setUserImage = user_image => dispatch => {
    dispatch({
        type: SET_USER_IMAGE,
        payload: user_image,
    });
};

export const setLicenseFront = license_front => dispatch => {
    dispatch({
        type: SET_LICENSE_FRONT,
        payload: license_front,
    });
};
export const setLicenseBack = license_back => dispatch => {
    dispatch({
        type: SET_LICENSE_BACK,
        payload: license_back,
    });
};
export const setCNICFront = cnic_front => dispatch => {
    dispatch({
        type: SET_CNIC_FRONT,
        payload: cnic_front,
    });
};
export const setCNICBack = cnic_back => dispatch => {
    dispatch({
        type: SET_CNIC_BACK,
        payload: cnic_back,
    });
};
export const setOwnership = ownership => dispatch => {
    dispatch({
        type: SET_VEHICLE_OWNERSHIP,
        payload: ownership,
    });
};

///////////////Navigation place for camera picker///////////////////////
export const setNavPlace = nav_place => dispatch => {
    dispatch({
        type: SET_NAV_PLACE,
        payload: nav_place,
    });
};

  ////////////////Locations STATES and Function/////////////////////
  export const SET_COUNTRY_ID = 'SET_COUNTRY_ID';
  export const SET_COUNTRY_NAME = 'SET_COUNTRY_NAME';
  export const SET_STATE_ID = 'SET_STATE_ID';
  export const SET_STATE_NAME = 'SET_STATE_NAME';
  export const SET_CITY_ID = 'SET_CITY_ID';
  export const SET_CITY_NAME = 'SET_CITY_NAME';

  export const setCountryName = country_name => dispatch => {
    dispatch({
        type: SET_COUNTRY_NAME,
        payload: country_name,
    });
};
export const setCountryId = country_id => dispatch => {
    dispatch({
        type: SET_COUNTRY_ID,
        payload: country_id,
    });
};
export const setStateName = state_name => dispatch => {
    dispatch({
        type: SET_STATE_NAME,
        payload: state_name,
    });
};
export const setStateId = state_id => dispatch => {
    dispatch({
        type: SET_STATE_ID,
        payload: state_id,
    });
};
export const setCityName = city_name => dispatch => {
    dispatch({
        type: SET_CITY_NAME,
        payload: city_name,
    });
};
export const setCityId = city_id => dispatch => {
    dispatch({
        type: SET_CITY_ID,
        payload: city_id,
    });
};

     ////////////////APP LOGIN STATES/////////////////////
     export const SET_LOCATION_LAT = 'SET_LOCATION_LAT';
     export const SET_LOCATION_LNG = 'SET_LOCATION_LNG';
     export const SET_LOCATION_ADDRESS = 'SET_LOCATION_ADDRESS';

  ///////////////User Login Info///////////////
  export const setLocationLat = location_lat => dispatch => {
    dispatch({
        type: SET_LOCATION_LAT,
        payload: location_lat,
    });
};
export const setLocationLng = location_lng => dispatch => {
    dispatch({
        type: SET_LOCATION_LNG,
        payload: location_lng,
    });
};
export const setLocationAddress = location_address => dispatch => {
    dispatch({
        type: SET_LOCATION_ADDRESS,
        payload:location_address,
    });
};

     ////////////////Time Interval STATES/////////////////////
     export const SET_TIME_INTERVAL = 'SET_TIME_INTERVAL';
     export const setTimeInterval = time_interval => dispatch => {
        dispatch({
            type: SET_TIME_INTERVAL,
            payload:time_interval,
        });
    };