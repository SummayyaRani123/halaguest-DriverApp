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
import CustomButtonhere from '../Button/CustomButton';

////////////////////app custom dropdwons////////////////
import CarCondition from '../Dropdowns/CarCondition';
import CarType from '..//Dropdowns/CarType';
import CarMake from '../Dropdowns/CarMake';
import CarYear from '../Dropdowns/CarYear';


////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace ,setTopTabPayment,setTopTabDriver,setTopTabVehicle,
setVehicleSubmitId
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


const VehicleDetail = ({navigation}) => {

  ///////////////////radio button state///////////////////
  const [checked, setChecked] = React.useState('yes');

  /////////////////////////redux///////////////////

  const {hoteltype, phone_no, condition, car_type, car_make, car_year,car_type_id,condition_id} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  //////////////dropdowns states////////////////
  const refCarConditionddRBSheet = useRef();
  const refCarTypeddRBSheet = useRef();
  const refCarMakeddRBSheet = useRef();
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
  const [modal, setModal] =useState();
  const [color, setColor] = useState('');
  const [plate_no, setPlateNO] =useState('');
  const [style, setStyle] =useState('');


  const AddVehicle = async () => {
    var user = await AsyncStorage.getItem('Userid');
    var date = new Date();
    console.log('userid:', date,condition_id,car_type_id,checked);

    axios({
      method: 'POST',
      url: BASE_URL + 'api/vehicle/createVehicle',
      data: {
        make: car_make,
        modal:modal,
        year: car_year,
        color: color,
        plate_no: plate_no,
        style: style,
        condition_id: condition_id,
        car_type_id: car_type_id,
        ac: checked,
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        dispatch(setVehicleSubmitId(response.data.data._id))
           setloading(0);
          setdisable(0);
        dispatch(setTopTabDriver(false))
       dispatch(setTopTabVehicle(false))
        dispatch(setTopTabPayment(true))
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };


  useEffect(() => {}, []);


  const VehicleValidation = async () => {
    // input validation
    if (color == '') {
      setsnackbarValue({value: 'Please Enter Vehicle Color', color: 'red'});
      setVisible('true');
    } else if (plate_no == '') {
      setsnackbarValue({value: 'Please Enter Plate Number', color: 'red'});
      setVisible('true');
    } else if (car_year == '') {
      setsnackbarValue({value: 'Please Enter Manufacture Year', color: 'red'});
      setVisible('true');
    } 
    else if (car_make == '') {
      setsnackbarValue({value: 'Please Enter Vehicle Make', color: 'red'});
      setVisible('true');
    }
      else if (style == '') {
        setsnackbarValue({value: 'Please Enter Vehicle Style', color: 'red'});
        setVisible('true');
      }  
      else if (condition_id == '') {
        setsnackbarValue({value: 'Please Enter Vehicle Condition', color: 'red'});
        setVisible('true');
      }  
      else if (car_type_id == '') {
        setsnackbarValue({value: 'Please Enter Vehicle Type', color: 'red'});
        setVisible('true');
      }  
    else {
      setloading(1);
      setdisable(1);
      AddVehicle()
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
          <View style={{flex: 1}}>
            <View style={Inputstyles.inputview}>
              <Text style={Inputstyles.inputtoptext}>Vehicle Color</Text>
                <View style={Inputstyles.action}>
                  <TextInput
                    onChangeText={setColor}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      ref_input2.current.focus();
                    }}
                    blurOnSubmit={false}
                    autoFocus={true}
                    placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                  />
                </View>
    

              <Text style={Inputstyles.inputtoptext}>Plate Number</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input2}
                  onChangeText={setPlateNO}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Year of Manufacture{car_year}</Text>
              <TouchableOpacity
                onPress={() => refCarYearddRBSheet.current.open()}>
                <View style={Inputstyles.action}>
                  <TextInput
                   
                     value={car_year}
                     editable={false}
                     placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                  />
                </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Make</Text>
              <TouchableOpacity
                onPress={() => refCarMakeddRBSheet.current.open()}>
                <View style={Inputstyles.action}>
                  <TextInput
                
                    value={car_make}
                    editable={false}
                    //onChangeText={setState}
                    placeholderTextColor={Colors.inputtextcolor}
                    autoCapitalize="none"
                    style={Inputstyles.input}
                  />
                </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Model</Text>
              <View style={Inputstyles.action}>
                <TextInput
        
                  //value={email}
                  onChangeText={setModal}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Style</Text>
              <View style={Inputstyles.action}>
                <TextInput
             
                  //value={email}
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
                    //onChangeText={setEmail}
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
                    //onChangeText={setEmail}
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
                title={'NEXT'}
                widthset={'78%'}
                topDistance={0}
                loading={loading}
                disabled={disable}
                onPress={
                  () => VehicleValidation()
                  // navigation.navigate('Drawerroute')
                }
              />
            </View>
          </View>

        <CarCondition
          refRBSheet={refCarConditionddRBSheet}
          onClose={() => refCarConditionddRBSheet.current.close()}
          title={'From Gallery'}
        />
        <CarType
          refRBSheet={refCarTypeddRBSheet}
          onClose={() => refCarTypeddRBSheet.current.close()}
          title={'From Gallery'}
        />
        <CarMake
          refRBSheet={refCarMakeddRBSheet}
          onClose={() => refCarMakeddRBSheet.current.close()}
          title={'From Gallery'}
        />
        <CarYear
          refRBSheet={refCarYearddRBSheet}
          onClose={() => refCarYearddRBSheet.current.close()}
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default VehicleDetail;
