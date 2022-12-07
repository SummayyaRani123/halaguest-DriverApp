import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

/////////////////navigation//////////////
import { useIsFocused,useNavigation } from '@react-navigation/native';

////////////paper papkage///////////////
import {RadioButton,Snackbar} from 'react-native-paper';

//////////////////////app components///////////////
import CamerBottomSheet from '../CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../Button/CustomButton';

////////////////Custom DropDowns///////////
import Dispatchers from '../Dropdowns/Dispatchers';
import CountryDropDown from '../Dropdowns/Location/Country';
import StateDropDown from '../Dropdowns/Location/State';
import CityDropDown from '../Dropdowns/Location/City';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace,setTopTabDriver,setTopTabVehicle,setDriverSubmitId,
setCountryName,setStateName,setCityName
} from '../../redux/actions';
////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////height width pakage/////////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../utills/Colors';
import Inputstyles from '../../styles/GlobalStyles/Inputstyles';

/////////////////app images///////////
import { appImages } from '../../constant/images';

// Import Map and Marker
import Geocoder from 'react-native-geocoding';
import { MapKeyApi } from '../../utills/MapKey';

////////////currrent location function/////////////
import { locationPermission,getCurrentLocation } from '../../api/CurrentLocation';
import { checkPermission } from '../../api/FCMToken';

const AccountDetail = () => {

  /////////////////navigation///////////////////
const navigation = useNavigation();

      ////////////isfocused//////////
      const isfocussed = useIsFocused()

  /////////////////////////redux///////////////////
  const {login_user_id, phone_no,user_image ,country_name,state_name,city_name,dispatcher,dispatcher_id,
    location_address,location_lng, location_lat} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  ///////////////////radio button state///////////////////
  const [checked, setChecked] = React.useState('male');

  //////////////link dropdown////////////////
  const refddRBSheet = useRef();
  const refCountryddRBSheet=useRef();
  const refStateddRBSheet=useRef();
  const refCityddRBSheet=useRef();
  
  //camera and imagepicker
  const refRBSheet = useRef();

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

   /////////button states/////////////
 const [loading, setloading] = useState(0);
 const [disable, setdisable] = useState(0);
 const [visible, setVisible] = useState(false);
 const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
 const onDismissSnackBar = () => setVisible(false);

  ///////////////API data states////////////////////
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [street_address, setStreet_address] = useState('');
  const[FCMToken,setFCMToken]=useState()

  //////////////////////Api Calling/////////////////
  const CreateAcount = async () => {
    var user= await AsyncStorage.getItem('Userid')
    var date = new Date();
    console.log('userid:', date, checked,phone_no,user,city_name);

    axios({
      method: 'PUT',
      url: BASE_URL + 'api/driver/updateDriver',
      data: {
        _id:login_user_id,
        img: user_image,
        email: email,
        gender:checked,
        country: country_name,
        city: city_name===''?state_name:city_name,
        state: state_name,
        zip_code: zipcode,
        street_address: street_address,
        name: name,
        phoneNo: phone_no,
        created_at: date,
        dispacher_id: dispatcher_id,
        status: 'block',
        device_token: FCMToken,
        driver_location:location_address,
        driver_lat: location_lat,
        driver_log: location_lng, 
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        dispatch(setDriverSubmitId(response.data._id))
            setloading(0);
          setdisable(0);
        dispatch(setTopTabDriver(false))
        dispatch(setTopTabVehicle(true))

      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

///////////////////map states//////////
const [driver_lat, setDriver_lat] = useState();
const [driver_log, setDriver_log] = useState();
const [driver_location, setDriver_location] = useState();

const getLiveLocation = async () => {
Geocoder.init(MapKeyApi); 
const locPermissionDenied = await locationPermission()
if (locPermissionDenied) {
    const { latitude, longitude, heading } = await getCurrentLocation()
    console.log("get live location after 4 second",latitude,longitude,heading)
    setDriver_lat(latitude)
    setDriver_log(longitude)
    Geocoder.from(latitude,
      longitude)
       .then(json => {
var addressComponent = json.results[0].formatted_address;
console.log('address here:',addressComponent);
setDriver_location(addressComponent)
       })
}
}
useEffect(() => {
  if (isfocussed) {
    getLiveLocation()
    checkPermission().then(result => {
      console.log("here in google password",result);
      setFCMToken(result)
      //do something with the result
    })
}

  },[isfocussed]);
 ///////////email//////////////////
 const handleValidEmail = (val) => {
  let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
  if (reg.test(val)) {
      console.log('true')
      return true;
  }
  else {
      console.log('falsse')
      return false;
  }
}

  //////////////////////// API forms validations////////////////////////
  const AcountValidation = async () => {
    // input validation
    if (name == '') {
      setsnackbarValue({value: 'Please Enter Username', color: 'red'});
      setVisible('true');
    } else if (email == '') {
      setsnackbarValue({value: 'Please Enter Email', color: 'red'});
      setVisible('true');
    } else if (!handleValidEmail(email)) {
      setsnackbarValue({value: 'Incorrect Email', color: 'red'});
      setVisible('true');
    }   else if (country_name == '') {
      setsnackbarValue({value: 'Please Enter Country', color: 'red'});
      setVisible('true');
    }    else if (state_name == '') {
      setsnackbarValue({value: 'Please Enter State', color: 'red'});
      setVisible('true');
    } else if (city_name == '') {
      setsnackbarValue({value: 'Please Enter City', color: 'red'});
      setVisible('true');
    } 

    else if (zipcode == '') {
      setsnackbarValue({value: 'Please Enter Zipcode', color: 'red'});
      setVisible('true');
    }
 
    else if (location_address == '') {
      setsnackbarValue({value: 'Please Enter Street Address', color: 'red'});
      setVisible('true');
    }
    else {
      setloading(1);
      setdisable(1);
      CreateAcount()
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() =>
                             {refRBSheet.current.open(),
                                dispatch(setNavPlace('Account_Detail'))
                                }
                 }>
              <View style={styles.userimage}>
                {user_image != '' ? (
                  <Image
                    source={{uri: BASE_URL+user_image}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={appImages.User}
                    style={{width: wp(12), height: hp(8)}}
                    resizeMode="contain"
                  />
                )}

                <Image
                  source={appImages.Camera}
                  style={{
                    width: wp(10),
                    height: hp(5),
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <View style={Inputstyles.inputview}>
              <Text style={Inputstyles.inputtoptext}>Name</Text>
                <View style={Inputstyles.action}>
                  <TextInput
                    onChangeText={setName}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      ref_input2.current.focus();
                    }}
                    blurOnSubmit={false}
                    autoFocus={true}
                    placeholderTextColor={Colors.inputtextcolor}
                    style={Inputstyles.input}
                  />
                </View>
    
              <Text style={Inputstyles.inputtoptext}>Email</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input2}
                  onChangeText={setEmail}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input5.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  keyboardType='email-address'
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Dispatcher Name</Text>
              <TouchableOpacity onPress={()=> refddRBSheet.current.open()} >
              <View style={Inputstyles.action}>
                <TextInput
                  value={dispatcher}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  editable={false}
                />
              </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Country</Text>
          <TouchableOpacity
                onPress={() => refCountryddRBSheet.current.open()}>
          <View style={Inputstyles.action}>
            <TextInput
                  value={country_name}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
              editable={false}
            />
          </View>
          </TouchableOpacity>
          <Text style={Inputstyles.inputtoptext}>State</Text>
          <TouchableOpacity
                onPress={() => refStateddRBSheet.current.open()}>
          <View style={Inputstyles.action}>
            <TextInput
                 value={state_name}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
              editable={false}
            />
          </View>
          </TouchableOpacity>
          <Text style={Inputstyles.inputtoptext}>City</Text>
          <TouchableOpacity
                onPress={() => refCityddRBSheet.current.open()}>
          <View style={Inputstyles.action}>
            <TextInput
                  value={city_name}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
              editable={false}
            />
          </View>
        </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Zip_Code</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input5}
                  onChangeText={setZipcode}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  keyboardType={'number-pad'}
                />
              </View>
      
              <Text style={Inputstyles.inputtoptext}>Street Address</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Location',{navplace:'CreateAccount'})}>
              <View style={Inputstyles.action}>
                <TextInput
              value={location_address}
                  onChangeText={setStreet_address}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  multiline={true}
                  maxLength={200}
                  numberOfLines={2.5}
                  editable={false}
                />
              </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Gender</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(12),
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    value="male"
                    status={checked === 'male' ? 'checked' : 'unchecked'}
                    color={Colors.Appthemecolor}
                    uncheckedColor={Colors.Appthemecolor}
                    onPress={() => setChecked('male')}
                  />
                  <Text style={Inputstyles.inputtoptext}>Male</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    value="female"
                    status={checked === 'female' ? 'checked' : 'unchecked'}
                    color={Colors.Appthemecolor}
                    uncheckedColor={Colors.Appthemecolor}
                    onPress={() => setChecked('female')}
                  />
                  <Text style={Inputstyles.inputtoptext}>Female</Text>
                </View>
              </View>
            </View>

            <View style={{marginBottom: hp(2), marginTop: hp(12)}}>
              <CustomButtonhere
                title={'NEXT'}
                widthset={'78%'}
                topDistance={0}
                loading={loading}
                disabled={disable}
                onPress={
                  () => 
                  AcountValidation()
                  //navigation.navigate('Drawerroute')
                }
              />
            </View>
          </View>
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={'From Gallery'}

        />
                <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom:'20%',
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>
        <Dispatchers
          refRBSheet={refddRBSheet}
          onClose={() => refddRBSheet.current.close()}
        />
                <CountryDropDown
          refRBSheet={refCountryddRBSheet}
          onClose={() => refCountryddRBSheet.current.close()}
        />
                         <StateDropDown
          refRBSheet={refStateddRBSheet}
          onClose={() => refStateddRBSheet.current.close()}
        />
                         <CityDropDown
          refRBSheet={refCityddRBSheet}
          onClose={() => refCityddRBSheet.current.close()}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default AccountDetail;
