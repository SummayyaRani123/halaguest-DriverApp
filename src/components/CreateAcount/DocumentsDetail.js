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

/////////////////app icons////////////
import AntDesign from 'react-native-vector-icons/AntDesign';

//////////////////////app components///////////////
import CamerBottomSheet from '../CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../Button/CustomButton';
import CustomModal from '../Modal/CustomModal';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace,setDocumentsSubmitId } from '../../redux/actions';

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

/////////////////app images////////////////
import { appImages } from '../../constant/images';

/////////////////navigation///////////////////
import { useNavigation } from '@react-navigation/native';


const DocumentsDetail = ({}) => {

/////////////////navigation///////////////////
const navigation = useNavigation();

  /////////////////////////redux///////////////////
  const { license_front,license_back,cnic_front,cnic_back,ownership,
    vehicle_submit_id,payment_submit_id,document_submit_id,driver_submit_id
  } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  //camera and imagepicker
  const refRBSheet = useRef();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

     /////////button states/////////////
 const [loading, setloading] = useState(0);
 const [disable, setdisable] = useState(0);
 const [visible, setVisible] = useState(false);
 const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
 const onDismissSnackBar = () => setVisible(false);

  ///////////////API data states////////////////////
     const [cnic_issue_date, setCNICIssueDate] = useState();

  //////////////////////Api Calling/////////////////
  const DriverDocuments = async () => {

    axios({
      method: 'POST',
      url: BASE_URL + 'api/driverDoc/createdriverDoc',
      data: {
        driving_license_front: license_front,
        driving_license_back: license_back,
        cnic_front: cnic_front,
        cnic_back: cnic_back,
        vehicle_ownership: ownership,
        cnic_issue_date: showdaywise
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        dispatch(setDocumentsSubmitId(response.data.data._id))
        updateDriverDetail((response.data.data._id))

      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

    //////////////////////Api Calling/////////////////
    const DeleteImage = async (props) => {
      axios({
        method: 'DELETE',
        url: BASE_URL + 'delete-image',
        data: {
          ImageLink: props
        },
      })
        .then(function (response) {
          console.log('detele image response', JSON.stringify(response.data));

        })
        .catch(function (error) {
          console.log('error', error);
        });
    };

      //////////////////////Api Calling/////////////////
  const updateDriverDetail = async (props) => {
console.log('here ids',props)
    axios({
      method: 'PUT',
      url: BASE_URL + 'api/driver/updateDriver',
      data: {
        _id: driver_submit_id,
        doc_id: props,
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        setModalVisible(true)
       
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
              <Text style={Inputstyles.inputtoptext}>Driving License</Text>
              {license_front!=''?
                    <View style={styles.docimageview}>
          <Image
                    source={{uri: BASE_URL+license_front}}
                    style={styles.docimage}
                    resizeMode='cover'
                  />
                          <TouchableOpacity 
                          style={styles.docimagechangeview}
                          onPress={() => 
                        { 
                          DeleteImage(license_front)
                          refRBSheet.current.open(),
                          dispatch(setNavPlace('License_Front'))
                          }
                        }>
                  <Text style={styles.docimagechangetext}>Change</Text>
                  </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity onPress={() => 
                        {
                          refRBSheet.current.open(),
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
           <View style={styles.docimageview}>
           <Image
                     source={{uri: BASE_URL+license_back}}
                     style={styles.docimage}
                     resizeMode='cover'
                   />
                             <TouchableOpacity 
                          style={styles.docimagechangeview}
                          onPress={() => 
                        { 
                          DeleteImage(license_back)
                          refRBSheet.current.open(),
                          dispatch(setNavPlace('License_Back'))
                          }
                        }>
                  <Text style={styles.docimagechangetext}>Change</Text>
            </TouchableOpacity>
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
              {cnic_front!=''?
           <View style={styles.docimageview}>
           <Image
                     source={{uri: BASE_URL+cnic_front}}
                     style={styles.docimage}
                     resizeMode='cover'
                   />
                                     <TouchableOpacity 
                          style={styles.docimagechangeview}
                          onPress={() => 
                        { 
                          DeleteImage(cnic_front)
                          refRBSheet.current.open(),
                          dispatch(setNavPlace('CNIC_Front'))
                          }
                        }>
                  <Text style={styles.docimagechangetext}>Change</Text>
            </TouchableOpacity>
                     </View>
                     
                    :
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
}
{cnic_back!=''?
           <View style={styles.docimageview}>
           <Image
                     source={{uri: BASE_URL+cnic_back}}
                     style={styles.docimage}
                     resizeMode='cover'
                   />
                                         <TouchableOpacity 
                          style={styles.docimagechangeview}
                          onPress={() => 
                        { 
                          DeleteImage(cnic_back)
                          refRBSheet.current.open(),
                          dispatch(setNavPlace('CNIC_Back'))
                          }
                        }>
                  <Text style={styles.docimagechangetext}>Change</Text>
            </TouchableOpacity>
                     </View>
                    :
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
}
              <Text style={Inputstyles.inputtoptext}>Vehicle owernship</Text>
              {ownership!=''?
           <View style={styles.docimageview}>
           <Image
                     source={{uri: BASE_URL+ownership}}
                     style={styles.docimage}
                     resizeMode='cover'
                   />
                                                <TouchableOpacity 
                          style={styles.docimagechangeview}
                          onPress={() => 
                        { 
                          DeleteImage(ownership)
                          refRBSheet.current.open(),
                          dispatch(setNavPlace('Vehicle_owernship'))
                          }
                        }>
                  <Text style={styles.docimagechangetext}>Change</Text>
            </TouchableOpacity>
                     </View>
                    :
              <TouchableOpacity onPress={() => 
                         { refRBSheet.current.open(),
                          dispatch(setNavPlace('Vehicle_owernship'))
                          }
                 }>
                <View style={Inputstyles.action}>
                  <TextInput
                    value={ownership}
                    placeholder="Vehicle owernship"
                    placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
}
              <Text style={Inputstyles.inputtoptext}>CNIC Issue Date</Text>
              <TouchableOpacity  onPress={showDatepicker}>
              <View style={Inputstyles.action}>
                  <TextInput
                    onChangeText={onChange}
                    value={showdaywise}
                    placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                    editable={false}
                  />
                </View>
                </TouchableOpacity>
            </View>

            <View style={{marginBottom: hp(2), marginTop: hp(12)}}>
              <CustomButtonhere
                title={'NEXT'}
                widthset={'78%'}
                topDistance={0}
                loading={loading}
                disabled={disable}
                onPress={
                  () => DriverDocuments()
                  // navigation.navigate('Drawerroute')
                }
              />
            </View>
          </View>
          <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Account Verified Successfully'}
                leftbuttontext={'CANCEL'}
                rightbuttontext={'OK'}
 onPress={()=> { setModalVisible(false),navigation.navigate('BottomTab')}}
                /> 
  
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={'From Gallery'}
        />

      </SafeAreaView>
    </ScrollView>
  );
};

export default DocumentsDetail;
