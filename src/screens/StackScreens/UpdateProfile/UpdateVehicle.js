import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

////////////paper papkage///////////////
import {RadioButton,Snackbar} from 'react-native-paper';

//////////////////////app components///////////////
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomHeader from '../../../components/Header/CustomHeader';
import CustomModal from '../../../components/Modal/CustomModal';

////////////////////app custom dropdwons////////////////
import CarCondition from '../../../components/Dropdowns/CarCondition';
import CarType from '../../../components/Dropdowns/CarType';
import CarMakeDropDown from '../../../components/Dropdowns/Car/CarMake';
import CarModalDropDown from '../../../components/Dropdowns/Car/CarModal';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace,setCarCondition,setCarMake,setCarModal,setCarType
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

////////////app images//////////
import { appImages } from '../../../constant/images';

const UpdateVehicleDetail = ({navigation}) => {

  ///////////////////radio button state///////////////////
  const [checked, setChecked] = React.useState('yes');

  /////////////////////////redux///////////////////

  const {hoteltype, phone_no, condition, car_type, car_make, car_modal,car_type_id,condition_id} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  //////////////dropdowns states////////////////
  const refCarConditionddRBSheet = useRef();
  const refCarTypeddRBSheet = useRef();
  const refCarMakeddRBSheet = useRef();
  const refCarModalddRBSheet = useRef();
  const refCarYearddRBSheet = useRef();

  //////////////link dropdown////////////////
  const refddRBSheet = useRef();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();

   /////////button states/////////////
 const [loading, setloading] = useState(0);
 const [disable, setdisable] = useState(0);
 const [visible, setVisible] = useState(false);
 const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
 const onDismissSnackBar = () => setVisible(false);

  ///////////////API data states////////////////////

  //////////////////Vehicle////////////////
  const [color, setColor] = useState('');
  const [plate_no, setPlateNO] =useState('');
  const [style, setStyle] =useState('');
  const [caryear, setCarYear] = useState('');

  //////////////////////Api Calling/////////////////
  const UpdatePayment = async () => {
    var vehicleid= await AsyncStorage.getItem('Vehicle_id')
    console.log("order request function",vehicleid,checked,condition_id,car_type_id)
    axios({
      method: 'PUT',
      url: BASE_URL + 'api/vehicle/updateVehicle',
      data: {
        _id: vehicleid,
        make: car_make,
        modal: car_modal,
        year: caryear,
        color: color,
        plate_no: plate_no,
        style: style,
        //condition_id: condition_id,
        //car_type_id: car_type_id,
        ac: checked,
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
  const GetVehicleDetail=async() => {
    var vehicleid= await AsyncStorage.getItem('Vehicle_id')
    console.log("order request function",vehicleid)

    await axios({
      method: 'GET',
      url: BASE_URL+'api/vehicle/specificVehicle/'+vehicleid,
    })
    .then(function (response) {
      console.log("response get here dispatcher payment", JSON.stringify(response.data))
      dispatch(setCarCondition(response.data[0].condition_id.name))
      dispatch(setCarType(response.data[0].car_type_id.name))
      dispatch(setCarMake(response.data[0].make))
      dispatch(setCarModal(response.data[0].modal))
      setColor(response.data[0].color)
      setStyle(response.data[0].style)
      setPlateNO(response.data[0].plate_no)
      setCarYear(response.data[0].year)
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }
  useEffect(async() => {
  
    GetVehicleDetail()
  }, []);

  return (
      <SafeAreaView style={styles.container}>
            <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
              <CustomHeader
          headerlabel={'Vehicle Details'}
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
            <Text style={Inputstyles.inputtoptext}>Vehicle Color</Text>
            <View style={Inputstyles.action}>
              <TextInput
              value={color}
                onChangeText={setColor}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  ref_input2.current.focus();
                }}
                placeholderTextColor={Colors.inputtextcolor}
                style={Inputstyles.input}
              />
            </View>

            <Text style={Inputstyles.inputtoptext}>Plate Number</Text>
            <View style={Inputstyles.action}>
              <TextInput
                ref={ref_input2}
                value={plate_no}
                onChangeText={setPlateNO}
                placeholderTextColor={Colors.inputtextcolor}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  ref_input3.current.focus();
                }}
                style={Inputstyles.input}
              />
            </View>
            <Text style={Inputstyles.inputtoptext}>
              Year of Manufacture
            </Text>

            <View style={Inputstyles.action}>
              <TextInput
                ref={ref_input3}
                value={caryear}
                onChangeText={setCarYear}
                placeholderTextColor={Colors.inputtextcolor}
                style={Inputstyles.input}
                keyboardType={'number-pad'}
              />
            </View>

            <Text style={Inputstyles.inputtoptext}>Make</Text>
            <TouchableOpacity
              onPress={() => refCarMakeddRBSheet.current.open()}>
              <View style={Inputstyles.action}>
                <TextInput
                  value={car_make}
                  editable={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
            </TouchableOpacity>
            <Text style={Inputstyles.inputtoptext}>Model</Text>
            <TouchableOpacity
              onPress={() => refCarModalddRBSheet.current.open()}>
              <View style={Inputstyles.action}>
                <TextInput
                  value={car_modal}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
            <Text style={Inputstyles.inputtoptext}>Style</Text>
            <View style={Inputstyles.action}>
              <TextInput
                value={style}
                onChangeText={setStyle}
                placeholderTextColor={Colors.inputtextcolor}
                autoCapitalize="none"
                style={Inputstyles.input}
              />
            </View>
            <Text style={Inputstyles.inputtoptext}>Condition</Text>
            <TouchableOpacity
              onPress={() => refCarConditionddRBSheet.current.open()}>
              <View style={Inputstyles.action}>
                <TextInput
                  value={condition}
                  editable={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  style={Inputstyles.input}
                />
              </View>
            </TouchableOpacity>
            <Text style={Inputstyles.inputtoptext}>Car type</Text>
            <TouchableOpacity
              onPress={() => refCarTypeddRBSheet.current.open()}>
              <View style={Inputstyles.action}>
                <TextInput
                  value={car_type}
                  editable={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  style={Inputstyles.input}
                />
              </View>
            </TouchableOpacity>
            <Text style={Inputstyles.inputtoptext}>Car AC</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: wp(12),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="yes"
                  status={checked === 'yes' ? 'checked' : 'unchecked'}
                  color={Colors.Appthemecolor}
                  uncheckedColor={Colors.Appthemecolor}
                  onPress={() => setChecked('yes')}
                />
                <Text style={Inputstyles.inputtoptext}>Yes</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="no"
                  status={checked === 'no' ? 'checked' : 'unchecked'}
                  color={Colors.Appthemecolor}
                  uncheckedColor={Colors.Appthemecolor}
                  onPress={() => setChecked('no')}
                />
                <Text style={Inputstyles.inputtoptext}>No</Text>
              </View>
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
                () => UpdatePayment()
                // navigation.navigate('Drawerroute')
              }
            />
          </View>
        </View>
        <CarCondition
          refRBSheet={refCarConditionddRBSheet}
          onClose={() => refCarConditionddRBSheet.current.close()}
        />
        <CarType
          refRBSheet={refCarTypeddRBSheet}
          onClose={() => refCarTypeddRBSheet.current.close()}
        />
        <CarMakeDropDown
          refRBSheet={refCarMakeddRBSheet}
          onClose={() => refCarMakeddRBSheet.current.close()}
        />
        <CarModalDropDown
          refRBSheet={refCarModalddRBSheet}
          onClose={() => refCarModalddRBSheet.current.close()}
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
        <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Vehicle Updated Successfully'}
                leftbuttontext={'CANCEL'}
                rightbuttontext={'OK'}
 onPress={()=> {GetVehicleDetail(), setModalVisible(false),navigation.goBack()}}
                /> 
        </ScrollView>
        </SafeAreaView>
    
  );
};

export default UpdateVehicleDetail;
