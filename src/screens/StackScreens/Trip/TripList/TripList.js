import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView, FlatList, StatusBar, ImageBackground,BackHandler,
    ScrollView,
    Image, View, Text, TouchableOpacity, TextInput,ActivityIndicator
} from 'react-native';

////////////////////app pakages//////////////
import { Checkbox } from 'react-native-paper';

//////////////////app icons////////////////
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

//////////////////////app components///////////////
import CustomHeader from '../../../../components/Header/CustomHeader';
import TripCard from '../../../../components/CustomCards/TripsCard/TripCard';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace,setTopTabDriver,setTopTabPayment,setTopTabVehicle } from '../../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import TopTabstyles from '../../../../styles/GlobalStyles/TopTabstyles';
import Inputstyles from '../../../../styles/GlobalStyles/Inputstyles';

/////////////////app images///////////
import { appImages } from '../../../constant/images';

const TripList = ({ navigation }) => {

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    ///////////////////redux states///////////////////////
    const {hoteltype, phone_no,top_tab_driver,top_tab_payment,top_tab_vehicle } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  /////////////main menu status states/////////////
  const [Orders, setOrders] = useState('');
  const GetOrders = async () => {
    var user= await AsyncStorage.getItem('Userid')
    console.log('userid:',user);
    axios({
      method: 'GET',
      url: BASE_URL + 'api/driver/searchOrder/'+user,
    })
      .then(async function (response) {
        console.log('list data here ', response.data);
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  

    useEffect(() => {

      GetOrders()
    }, []);
    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
          headerlabel={'Trips'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
        />
{/* <NotificationView
       label={'Update Profile'}
       labelPress={()=>navigation.navigate('UpdateProfile')}
       /> */}
       <View style={{marginTop:hp(3)}}></View>
{
Orders === ''?null:
Orders.map((item, key) => (
    <TouchableOpacity onPress={()=>navigation.navigate('TripDetail',{orderid:item._id,navplace:'Trip'})}>
        <TripCard
                                        time={item.flight_time}
                                         price={item.total_amount+'$'}
                                         pickupLoc={item.pickup_location}
                                         dropoffLoc={item.dropoff_location}
                                         onpress={()=>navigation.navigate('TripDetail',{navplace:'Trip'})}
                                     />
                                   </TouchableOpacity>
))
}
</ScrollView>
</SafeAreaView>
    )
};

export default TripList;