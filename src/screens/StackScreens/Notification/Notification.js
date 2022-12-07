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
import CustomHeader from '../../../components/Header/CustomHeader';
import NotificationView from '../../../components/NotificationView/NotificationView';
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';
import CustomCards from '../../../components/CustomCards/CustomCards';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace,setTopTabDriver,setTopTabPayment,setTopTabVehicle } from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import TopTabstyles from '../../../styles/GlobalStyles/TopTabstyles';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';

/////////////////app images///////////
import { appImages } from '../../../constant/images';

const Notification = ({ navigation }) => {

    ///////////////////redux states///////////////////////
    const {hoteltype, phone_no,top_tab_driver,top_tab_payment,top_tab_vehicle } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

    /////////////Get Notification/////////////
    const [Notifications, setNotifications] = useState('');

    const GetNotifications = async () => {
      var user = await AsyncStorage.getItem('Userid');
      console.log('order request function', user);
      axios({
        method: 'GET',
        url: BASE_URL + 'api/notification/getToNotifications/' + user,
      })
        .then(async function (response) {
          console.log('list data here ', response.data);
          setNotifications(response.data);
        })
        .catch(function (error) {
          console.log('error', error);
        });
    };
      useEffect(() => {
        GetNotifications()
        
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
{
Notifications === ''?null:

Notifications.slice(0, 3).map((item, key) => (
//    <TouchableOpacity onPress={()=>navigation.navigate('OrderDetail',{orderid:item._id,navplace:'Schedule'})}>
//   </TouchableOpacity>
        <NotificationView
        notitext={item.detail}
        notitime={item.created_at}
        notiicon={item.detail === 'Order 123 is completed sucessfully' ?appImages.NotiCheck:
        item.detail === 'Order 123 is cancel' ?appImages.NotiCancel:null
       }
                                   />
                          
))
        
}

</ScrollView>
</SafeAreaView>

    )
};

export default Notification;