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

////////////////////app pakaage////////////////////
import DateTimePicker from '@react-native-community/datetimepicker';

//////////////////////app components///////////////
import CamerBottomSheet from '../CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../Button/CustomButton';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace } from '../../redux/actions';

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

const DocumentsDetail = ({navigation}) => {


  /////////////////////////redux///////////////////
  const { license_front,license_back,cnic_front,cnic_back,ownership} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  //camera and imagepicker
  const refRBSheet = useRef();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  ///////////////API data states////////////////////
     const [cnic_issue_date, setCNICIssueDate] = useState();

  //////////////////////Api Calling/////////////////
  const DriverDocuments = async () => {

    axios({
      method: 'POST',
      url: BASE_URL + 'api/paymentDetail/createPayment',
      data: {
        driving_license_front: license_front,
        driving_license_back: license_back,
        cnic_front: cnic_front,
        cnic_back: cnic_back,
        vehicle_ownership: ownership,
        cnic_issue_date: cnic_issue_date
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        // if (response.data === "Email Already Exist") {
        //   setloading(0);
        //   setdisable(0);
        //   alert("Email Already Exist,Enter other email")
        // }
        // else {
        //   setloading(0);
        //   setdisable(0);
        //   navigation.navigate('Subscribe', response.data)
        // }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  useEffect(() => {}, []);
    ////////////////datetime picker states////////////////
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showyearwise, setshowyearwise] = useState(false);
    const [showdaywise, setshowdaywise] = useState('');
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      var d = new Date();
      d = selectedDate
      // console.log(d)
      //console.log(selectedDate)
      if (d != undefined) {
        let year = d.getFullYear();
        let month = (d.getMonth() + 1).toString().padStart(2, "0");
        let day = d.getDate().toString().padStart(2, "0");
        console.log(year + '-' + month + '-' + day);
        console.log(typeof (year + '-' + month + '-' + day))
        setshowyearwise(year + "-" + month + "-" + day)
        setshowdaywise(day + "-" + month + "-" + year)
        //console('date',showyearwise)
      }
    
    }
  
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
      console.log('mode',mode)
    };
    
    const showDatepicker = () => {
      showMode('date');
    };

  return (
 
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
      {show && (
      <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      display="default"
      locale="es-ES"
      themeVariant="light"
      onChange={onChange}
      style={{
      shadowColor: '#fff',
      shadowRadius: 0,
      shadowOpacity: 1,
      shadowOffset: { height: 0, width: 0 },
      color:'#1669F',
      textColor:'#1669F'
      }}
      />
      )}
          <View style={{flex: 1}}>
            <View style={Inputstyles.inputview}>
              <Text style={Inputstyles.inputtoptext}>Driving License{license_back}</Text>
              {license_front!=''?
                    <View style={{height:hp(20),width:wp(70)}}>
          <Image
                    source={{uri: BASE_URL+license_front}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                    </View>
                    :
                    <TouchableOpacity onPress={() => 
                        {refRBSheet.current.open(),
                          dispatch(setNavPlace('License_Front'))
                          }
                        }>
                        <View style={Inputstyles.action}>
                          <TextInput
                            value={license_front}
                            placeholder="Driving License Front"
                            placeholderTextColor={Colors.inputtextcolor}
                            autoCapitalize="none"
                            style={Inputstyles.input}
                            editable={false}
                          />
                        </View>
                      </TouchableOpacity>
                }
                        {license_back!=''?
                    <View style={{height:hp(20),width:wp(70)}}>
          <Image
                    source={{uri: BASE_URL+license_back}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                    </View>
                    :
              <TouchableOpacity onPress={() => 
                     {refRBSheet.current.open(),
                      dispatch(setNavPlace('License_Back'))
                      }
                 }>
                <View style={Inputstyles.action}>
                  <TextInput
                    value={license_back}
                    placeholder="Driving License Back"
                    placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
}
              <Text style={Inputstyles.inputtoptext}>CINC</Text>
              <TouchableOpacity onPress={() =>
                        { refRBSheet.current.open(),
                          dispatch(setNavPlace('CNIC_Front'))
                          }
                  }>
                <View style={Inputstyles.action}>
                  <TextInput
                    value={cnic_front}
                    placeholder="CNIC Front"
                    placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => 
                    { refRBSheet.current.open(),
                      dispatch(setNavPlace('CNIC_Back'))
                      }
                 }>
                <View style={Inputstyles.action}>
                  <TextInput
                    value={cnic_back}
                    placeholder="CNIC Back"
                    placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Vehicle owernship</Text>
              <TouchableOpacity onPress={() => 
                         { refRBSheet.current.open(),
                          dispatch(setNavPlace('Vehicle_owernship'))
                          }
                 }>
                <View style={Inputstyles.action}>
                  <TextInput
                    //value={driving_license_back}
                    placeholder="Vehicle owernship"
                    placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>CNIC Issue Date</Text>
              <View style={Inputstyles.action}>
                  <TextInput
                    //value={driving_license_back}
                    //placeholder="Driving LIcense Back"
                    onChangeText={setCNICIssueDate}
                    placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                  />
                </View>
            </View>

            <View style={{marginBottom: hp(2), marginTop: hp(12)}}>
              <CustomButtonhere
                title={'NEXT'}
                widthset={'78%'}
                topDistance={0}
                onPress={
                  () => Createuser()
                  // navigation.navigate('Drawerroute')
                }
              />
            </View>
          </View>
    
  
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={'From Gallery'}
        />

      </SafeAreaView>
    </ScrollView>
  );
};

export default CustomDatePicker;
