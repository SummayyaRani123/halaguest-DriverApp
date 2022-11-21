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

  const ScheduleOrders1 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd9556-145571e29d72',
        title: 'Third Item',
      },
  ];

const TripList = ({ navigation }) => {

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    ///////////////////redux states///////////////////////
    const {hoteltype, phone_no,top_tab_driver,top_tab_payment,top_tab_vehicle } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

      /////////////main menu status states/////////////
      const [Schedule, setSchedule] = useState(true)
      const [Complete, setComplete] = useState(false)


            /////////////main menu status states/////////////
    const [ScheduleOrders, setScheduleOrders] = useState('')
        const GetScheduleOrders = async () => {

            axios({
                method: 'GET',
                url: BASE_URL + 'api/Order/hotelOrdersScheduled/63636a39fdb2d73b27d198f8',
            })
                .then(async function (response) {
                    console.log("list data here ", response.data)
                    setScheduleOrders(response.data)
                })
                .catch(function (error) {
                    console.log("error", error)
                })
            }
  

    useEffect(() => {

      
    }, []);
    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
          headerlabel={'Notifications'}
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
ScheduleOrders1 === ''?null:
ScheduleOrders1.slice(0, 3).map((item, key) => (
    <TouchableOpacity onPress={()=>navigation.navigate('TripDetail',{orderid:item._id,navplace:'Trip'})}>
        <TripCard
                                      
                                      //   time={item.flight_time}
                                      //    price={item.total_amount+'$'}
                                      //    pickupLoc={item.pickup_location}
                                      //    dropoffLoc={item.dropoff_location}
                                         time={'00:00 pm'}
                                         price={'200'+'$'}
                                         pickupLoc={'Pickup location here'}
                                         dropoffLoc={'Drop off location here'}
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