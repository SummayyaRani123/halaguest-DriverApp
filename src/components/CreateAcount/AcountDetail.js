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

////////////paper papkage///////////////
import {RadioButton,Snackbar} from 'react-native-paper';

//////////////////////app components///////////////
import CamerBottomSheet from '../CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../Button/CustomButton';
import Dispatchers from '../Dropdowns/Dispatchers';


////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace,setTopTabDriver,setTopTabVehicle,setDriverSubmitId } from '../../redux/actions';
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

const AccountDetail = ({navigation}) => {

  /////////////////////////redux///////////////////

  const {hoteltype, phone_no,user_image ,top_tab_driver,top_tab_vehicle,dispatcher,dispatcher_id
  } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  ///////////////////radio button state///////////////////
  const [checked, setChecked] = React.useState('male');

  //////////////link dropdown////////////////
  const refddRBSheet = useRef();
  
  //camera and imagepicker
  const refRBSheet = useRef();
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

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
  //////////////////Account////////////////
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] =useState('');
  const [street_address, setStreet_address] = useState('');

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

  //////////////////////Api Calling/////////////////
  const CreateAcount = async () => {
    var date = new Date();
    console.log('userid:', date, checked,phone_no,BASE_URL + 'api/driver/createDriver');

    axios({
      method: 'POST',
      url: BASE_URL + 'api/driver/createDriver',
      data: {
       img: user_image,
        email: email,
        gender:checked,
        city: city,
        state: state,
        zip_code: zipcode,
        country: country,
        street_address: street_address,
        name: name,
        phoneNo: phone_no,
        created_at: date,
        dispacher_id: dispatcher_id,
        status: 'block',
        device_token: '354ref',
        driver_location: 'Pir Mehr Ali Shah Arid Agriculture University - PMAS AAUR, Shamsabad, Muree، Road, Punjab، Rawalpindi, 46000',
        driver_lat: '33.601920',
        driver_log: '73.038080' 
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        dispatch(setDriverSubmitId(response.data.data._id))
            setloading(0);
          setdisable(0);
        dispatch(setTopTabDriver(false))
        dispatch(setTopTabVehicle(true))

      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  useEffect(() => {}, []);

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
    } else if (city == '') {
      setsnackbarValue({value: 'Please Enter City', color: 'red'});
      setVisible('true');
    } 
    else if (state == '') {
      setsnackbarValue({value: 'Please Enter State', color: 'red'});
      setVisible('true');
    }
    else if (zipcode == '') {
      setsnackbarValue({value: 'Please Enter Zipcode', color: 'red'});
      setVisible('true');
    }
    else if (country == '') {
      setsnackbarValue({value: 'Please Enter Country', color: 'red'});
      setVisible('true');
    }
    else if (street_address == '') {
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
                    ref_input3.current.focus();
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
                  ref={ref_input2}
                  value={dispatcher}
                  //onChangeText={setEmail}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input3.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
              
                  style={Inputstyles.input}
                  editable={false}
                />
              </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>City</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input3}
                  onChangeText={setCity}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input4.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>State</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input4}
                  onChangeText={setState}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input5.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Zip_Code</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input5}
                  onChangeText={setZipcode}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input6.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Country</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input6}
                  onChangeText={setCountry}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input7.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Street Address</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input7}
                  onChangeText={setStreet_address}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
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
          title={'From Gallery'}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default AccountDetail;
