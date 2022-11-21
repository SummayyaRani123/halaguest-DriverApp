import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

////////////////////app pakaage////////////////////
import DateTimePicker from '@react-native-community/datetimepicker';

//////////////////app pakages/////////////////
import { Snackbar } from 'react-native-paper';

//////////////////////app components///////////////
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomHeader from '../../../components/Header/CustomHeader';
import CustomModal from '../../../components/Modal/CustomModal';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace ,setTopTabPayment,setTopTabDriver,
  setTopTabVehicle,setTopTabDocument,
setPaymentSubmitId
} from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


/////////////////////height width pakage/////////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';

///////////////////app images////////////
import { appImages } from '../../../constant/images';

const UpdatePaymentDetail = ({navigation}) => {

  /////////////////////////redux///////////////////
  const {hoteltype, phone_no,  } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

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
  const [bank_name, setBankName] = useState('');
  const [account_holder_name, setAccountHolderName] = useState('');
  const [account_number, setAccountNumber] = useState('');
  const [iban, setiban] = useState('');
  const [swift_code, setSwiftCode] = useState('');
  const [CVV, setCVV]=useState('')
  const [Expiry, setExpiry]=useState('')


  //////////////////////Api Calling/////////////////
  const UpdatePayment = async () => {
    var payment= await AsyncStorage.getItem('Payment_id')
    console.log("order request function",payment)
    axios({
      method: 'PUT',
      url: BASE_URL + 'api/paymentDetail/updatePayment',
      data: {
        _id: payment,
        bank_name: bank_name,
        account_holder_name:account_holder_name,
        account_number:account_number,
        iban: iban,
        swift_code: swift_code 
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        //dispatch(setPaymentSubmitId(response.data.data._id))
          // setloading(0);
          // setdisable(0);
          setModalVisible(true)
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const GetAcountPament=async() => {
    var payment= await AsyncStorage.getItem('Payment_id')
    console.log("order request function",payment)

    await axios({
      method: 'GET',
      url: BASE_URL+'api/paymentDetail/specificPayment/'+payment,
    })
    .then(function (response) {
      console.log("response get here dispatcher payment", JSON.stringify(response.data))
      setBankName(response.data.data[0].bank_name)
      setAccountHolderName(response.data.data[0].account_holder_name)
      setAccountNumber(response.data.data[0].account_number)
      setiban(response.data.data[0].iban)
      setSwiftCode(response.data.data[0].swift_code)
      //setCVV(response.data[0].state)
      setshowdaywise(response.data.data[0].expiry_date)
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }
  useEffect(async() => {
  
    GetAcountPament()
  }, []);


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
           <CustomHeader
          headerlabel={'Payment Details'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
          // searchicon={'search'}
          //type={'crypto'}
          //onpresseacrh={() => onSearch()}
        />
          <View style={{flex: 1}}>
            <View style={Inputstyles.inputview}>
              <Text style={Inputstyles.inputtoptext}>Bank Name</Text>
                <View style={Inputstyles.action}>
                  <TextInput
                  value={bank_name}
                   onChangeText={setBankName}
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

              <Text style={Inputstyles.inputtoptext}>
                Account Holder's Name
              </Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input2}
                  value={account_holder_name}
                  onChangeText={setAccountHolderName}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input3.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Account Number</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input3}
                  value={account_number}
                  onChangeText={setAccountNumber}
                  maxLength={16}    
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input4.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  keyboardType='number-pad'
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Expiry Date</Text>
              <TouchableOpacity  onPress={showDatepicker}>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input4}
                  //value={account_holder_name}
                  onChangeText={onChange}
                  value={showdaywise}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input5.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  editable={false}
                />
              </View>
              </TouchableOpacity>
              {/* <Text style={Inputstyles.inputtoptext}>CVV</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input5}
                  value={CVV}
                  onChangeText={setCVV}
                  maxLength={3}    
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input6.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  keyboardType='number-pad'
                />
              </View> */}
              <Text style={Inputstyles.inputtoptext}>IBAN</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input6}
                  value={iban}
                  onChangeText={setiban}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input7.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Swift Code</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input7}
                  value={swift_code}
                  onChangeText={setSwiftCode}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  style={Inputstyles.input}
                />
              </View>
            </View>

            <View style={{marginBottom: hp(2), marginTop: hp(12)}}>
              <CustomButtonhere
                title={'UPDATE'}
                widthset={'78%'}
                topDistance={0}
                loading={loading}
                disabled={disable}
                onPress={
                  () =>
                  UpdatePayment()
                 //navigation.navigate('BottomTab')
                }
              />
            </View>
          </View>
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
        <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Payment Updated Successfully'}
                leftbuttontext={'CANCEL'}
                rightbuttontext={'OK'}
 onPress={()=> {GetAcountPament(), setModalVisible(false),navigation.goBack()}}
                /> 
      </SafeAreaView>
    </ScrollView>
  );
};

export default UpdatePaymentDetail;
