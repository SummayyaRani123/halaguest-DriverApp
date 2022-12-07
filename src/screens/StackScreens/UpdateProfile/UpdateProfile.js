import React, { useEffect, useState, useRef } from 'react';
import {
 StatusBar, ImageBackground,SafeAreaView,ScrollView,
    Image, View, Text, TouchableOpacity, TextInput
} from 'react-native';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CamerBottomSheet from '../../../components/CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../../../components/Button/CustomButton';
import HotelTypes from '../../../components/Dropdowns/HotelTypes';
import CustomModal from '../../../components/Modal/CustomModal';

////////////////custom Dropdowns////////////
import CountryDropDown from '../../../components/Dropdowns/Location/Country';
import StateDropDown from '../../../components/Dropdowns/Location/State';
import CityDropDown from '../../../components/Dropdowns/Location/City';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setNavPlace,setUserImage,setCountryName,setStateName,setCityName} from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////height width pakage/////////////////////
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';

/////////////////app images///////////
import { appImages } from '../../../constant/images';


const UpdateProfile = ({ navigation,route }) => {

const [maxheight, setHeight] = useState(52)

    ////////////prevous data States///////////////
    const [predata] = useState(route.params);

   //////////////link dropdown////////////////
   const refddRBSheet = useRef();
   const refCountryddRBSheet=useRef();
   const refStateddRBSheet=useRef();
   const refCityddRBSheet=useRef();

     //camera and imagepicker
  const refRBSheet = useRef();

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    /////////////////redux states/////////////
    const { hoteltype,phone_no,user_image,country_name,state_name,city_name} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

     /////////TextInput References///////////
  const ref_input2 = useRef();

  ///////////////data states////////////////////
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [zipcode,  setZipcode] = React.useState();
  const [street_address,  setStreet_address] = React.useState();

  const UpdateAcount = async() => {
    var user= await AsyncStorage.getItem('Userid')
    var date=new Date()
      axios({
        method: 'PUT',
        url: BASE_URL + 'api/driver/updateDriver',
        data: {
          _id:user,
          img: user_image,
          email: email,
          country: country_name,
          city: city_name,
          state: state_name,
          zip_code: zipcode,
          street_address: street_address,
          name_of_company: name,
          phoneNo: phone_no,
          created_at:date,
          //status: 'block',
          device_token: '354ref' 
        },
      })
        .then(async function (response) {
          console.log("response", JSON.stringify(response.data))
          setModalVisible(true)
          //dispatch(setLoginUser(response.data.data._id))
          //await AsyncStorage.setItem('Userid',response.data._id);
        })
        .catch(function (error) {
          console.log("error", error)
        })
    }
  const GetAcountDetail=async() => {
    var user= await AsyncStorage.getItem('Userid')
    console.log("order request function",user)

    await axios({
      method: 'GET',
      url: BASE_URL+'api/driver/specificDriver/'+user,
    })
    .then(function (response) {
      console.log("response get here dispatcher", JSON.stringify(response.data))
      dispatch(setUserImage(response.data[0].img))
      dispatch(setCountryName(response.data[0].country))
      dispatch(setStateName(response.data[0].state))
      dispatch(setCityName(response.data[0].city))
     //setImage(BASE_URL+response.data[0].img)
      setName(response.data[0].name)
      setEmail(response.data[0].email)
      setZipcode(response.data[0].zip_code)
      setStreet_address(response.data[0].driver_location)
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }
    useEffect(() => {
      GetAcountDetail()
    }, []);

    return (
      <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={styles.container}> 
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
                headerlabel={'Update Profile'}
                iconPress={() => { navigation.goBack() }}
                icon={'chevron-back'}

            />  
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
  {/* <TouchableOpacity onPress={()=> refddRBSheet.current.open()} > */}
  <View style={Inputstyles.action}>
            <TextInput
            value={name}
              //placeholder="Username Here"
              onChangeText={setName}
              returnKeyType={"next"}
              onSubmitEditing={() => { ref_input2.current.focus() }}
              blurOnSubmit={false}
              autoFocus={true}
              placeholderTextColor={Colors.inputtextcolor}
              autoCapitalize="none"
              style={Inputstyles.input}
            />
          </View>
  {/* </TouchableOpacity> */}
          <Text style={Inputstyles.inputtoptext}>Email</Text>
          <View style={Inputstyles.action}>
            <TextInput
                  ref={ref_input2}
                  value={email}
              //placeholder="Example@gmail.com"
              onChangeText={setEmail}
              placeholderTextColor={Colors.inputtextcolor}
              autoCapitalize="none"
              style={Inputstyles.input}
              editable={false}
            />
          </View>
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
                  ref={ref_input2}
                  value={zipcode}
              onChangeText={setZipcode}
              placeholderTextColor={Colors.inputtextcolor}
              autoCapitalize="none"
              style={Inputstyles.input}
            />
          </View>
       
          <Text style={Inputstyles.inputtoptext}>Street Address</Text>
          <View style={Inputstyles.action}>
            
            <TextInput
                  ref={ref_input2}
                  value={street_address}
              onChangeText={setStreet_address}
              placeholderTextColor={Colors.inputtextcolor}
              style={[Inputstyles.input,{height:maxheight===56?hp(75):hp(18)}]}
              multiline={true}
              maxLength={200}
              numberOfLines={2.5}
              onContentSizeChange={e => 
{                console.log('heretext htt',e.nativeEvent.contentSize.height)
                setHeight(e.nativeEvent.contentSize.height)}
              }
            />
          </View>
        </View>
        
        <View style={{ marginBottom: hp(2), 
            marginTop: hp(12) }}>
            <CustomButtonhere
              title={'UPDATE'}
              widthset={'78%'}
              topDistance={0}
              onPress={() => 
                UpdateAcount()
               // navigation.navigate('ViewPaymentDetail')
              }
            />
          </View>

        <CamerBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
  
      />
                  <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Profile Updated Successfully'}
                leftbuttontext={'CANCEL'}
                rightbuttontext={'OK'}
 onPress={()=> {GetAcountDetail(), setModalVisible(false),navigation.goBack()}}
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
    )
};

export default UpdateProfile;