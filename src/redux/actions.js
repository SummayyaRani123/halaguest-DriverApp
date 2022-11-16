  ////////////////APP STATES/////////////////////
export const SET_HOTEL_TYPE = 'SET_HOTEL_TYPE';
export const SET_PHONE_NO = 'SET_PHONE_NO';
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


  ///////////////User Login Info///////////////
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