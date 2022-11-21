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

////////////////////app custom dropdwons////////////////
import CarCondition from '../../../components/Dropdowns/CarCondition';
import CarType from '../../../components/Dropdowns/CarType';
import CarMakeDropDown from '../../../components/Dropdowns/Car/CarMake';
import CarModalDropDown from '../../../components/Dropdowns/Car/CarModal';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace ,setTopTabPayment,setTopTabDriver,setTopTabVehicle,
setVehicleSubmitId,setCarCondition,setCarMake,setCarModal,setCarType
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


const ViewVehicleDetail = ({navigation}) => {

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
  const [modal, setModal] =useState();
  const [color, setColor] = useState('');
  const [plate_no, setPlateNO] =useState('');
  const [style, setStyle] =useState('');
  const [caryear, setCarYear] = useState('');
  const [car_AC, setCar_AC] = useState('');

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
      setCar_AC(response.data[0].ac)
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
                placeholderTextColor={Colors.inputtextcolor}
                style={Inputstyles.input}
                editable={false}
              />
            </View>

            <Text style={Inputstyles.inputtoptext}>Plate Number</Text>
            <View style={Inputstyles.action}>
              <TextInput
                value={plate_no}
                placeholderTextColor={Colors.inputtextcolor}
                style={Inputstyles.input}
                editable={false}
              />
            </View>
            <Text style={Inputstyles.inputtoptext}>
              Year of Manufacture
            </Text>

            <View style={Inputstyles.action}>
              <TextInput
                value={caryear}
                placeholderTextColor={Colors.inputtextcolor}
                style={Inputstyles.input}
                keyboardType={'number-pad'}
                editable={false}
              />
            </View>

            <Text style={Inputstyles.inputtoptext}>Make</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  value={car_make}
                  editable={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
            <Text style={Inputstyles.inputtoptext}>Model</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  value={car_modal}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  editable={false}
                />
              </View>
            <Text style={Inputstyles.inputtoptext}>Style</Text>
            <View style={Inputstyles.action}>
              <TextInput
                value={style}
                placeholderTextColor={Colors.inputtextcolor}
                autoCapitalize="none"
                style={Inputstyles.input}
                editable={false}
              />
            </View>
            <Text style={Inputstyles.inputtoptext}>Condition</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  value={condition}
                  editable={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  style={Inputstyles.input}
                />
              </View>
 
            <Text style={Inputstyles.inputtoptext}>Car type</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  value={car_type}
                  editable={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Car AC</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  value={car_AC}
                  editable={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
          </View>

          <View style={{marginBottom: hp(2), marginTop: hp(12)}}>
            <CustomButtonhere
              title={'UPDATE VEHICLE DETAILS'}
              widthset={'78%'}
              topDistance={0}
              loading={loading}
              disabled={disable}
              onPress={
                () =>
                navigation.navigate('UpdateVehicleDetail')
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
        </ScrollView>
        </SafeAreaView>
    
  );
};

export default ViewVehicleDetail;
