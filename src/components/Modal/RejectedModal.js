import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,Modal,Image,TextInput,FlatList} from 'react-native';

///////////////navigation////////////////
import { useNavigation } from '@react-navigation/native';

////////////////custom components/////////////
import TimeSelector from './TimeSelector';

///////////////app styeles///////////////
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

////////////////app components///////////
import SettingsMenu from '../SettingsView/SettingsMenu';

import Colors from '../../utills/Colors';

/////////////////app images/////////////////////
import { appImages } from '../../constant/images';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setTimeInterval } from '../../redux/actions';

//////////////////api///////////////////
import { BASE_URL } from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

///////////////device token/////////////
import { Hotel_DeviceToken,Guest_DeviceToken } from '../../utills/ApiRootUrl';

//////////////////location function//////////////////
import { locationPermission,getCurrentLocation} from '../../api/CurrentLocation';
import { MapKeyApi } from '../../utills/MapKey';

const TimeInterval = [
  {
    id: 1,
    title: '5 min',
  },
  {
    id: 2,
    title: '10 min',
  },
  {
    id: 3,
    title: '15 min',
  },
  {
      id: 4,
      title: '20 min',
    },
    {
      id: 5,
      title: '25 min',
    },
    {
      id: 6,
      title: '30 min',
    },
    {
      id: 7,
      title: '35 min',
    },
    {
      id: 8,
      title: '40 min',
    },
    {
      id: 9,
      title: '45 min',
    },
    {
        id: 10,
        title: '50 min',
      },
      {
        id: 11,
        title: '55 min',
      },
      {
        id: 12,
        title: '60 min',
      },
];

const RejectedModal = (props) => {

    /////////////navigation state/////////////////
    const navigation = useNavigation();

    /////////////redux states///////
    const {time_interval} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

/////////////////////Update Order Api function and state////////////////////

           const StartOrder = async () => {
            var user= await AsyncStorage.getItem('Userid')
            console.log('here ids',props.order_id,"user",user,"driver loc:",driver_lat,driver_log)
                axios({
                  method: 'POST',
                  url: BASE_URL + 'api/Order/updateOrderStatusOngoing',
                  data: {
                    _id: props.order_id,
                    //driver_id: user,
                    status: 'ongoing',
                    driver_lat: driver_lat,
                    driver_log: driver_log
                  },
                })
                  .then(function (response) {
                  console.log(' Cancel response', JSON.stringify(response.data));
                  GuestSendNotification()
                    
                  })
                  .catch(function (error) {
                    console.log('error', error);
                  });
              };

                       //////////////////////Notification/////////////////
           const HotelSendNotification = async () => {
            console.log('here:')
            var data = JSON.stringify({
              "registration_ids": [
                props.Hotel_Token
              ],
              "notification": {
                "title": "Halaguest",
                "body": "BODY FROM POSTMAN",
                "mutable_content": true,
                "sound": "Tri-tone",
                "color": "purple"
              }
            });
            
            var config = {
              method: 'post',
              url: 'https://fcm.googleapis.com/fcm/send',
              headers: { 
                'Content-Type': 'application/json', 
                'Authorization': Hotel_DeviceToken
              },
              data : data
            };
            
            axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              //setModalVisible(true)
             // props.CloseModal()
            
            })
            .catch(function (error) {
              console.log(error);
            });
              };
             //////////////////////Notification/////////////////
             const GuestSendNotification = async () => {
              var data = JSON.stringify({
                "registration_ids": [
                  props.Guest_Token
                ],
                data:
                {type:"Orders"},
                "notification": {
                  "title":  "Halaguest",
                  "body":  props.Driver_Name+ " is arriving in " +time_interval+" to pick you, get ready for trip " + "trip no: "+ props.Order_No,
                  "mutable_content": true,
                  "sound": "Tri-tone",
                  "color": "purple"
                }
              });
              
              var config = {
                method: 'post',
                url: 'https://fcm.googleapis.com/fcm/send',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': Guest_DeviceToken
                },
                data : data
              };
              
              axios(config)
              .then(function (response) {
                SendDBNotification()
                //console.log(JSON.stringify(response.data));
         
              })
              .catch(function (error) {
                console.log(error);
              });
                };
                  //////////////////////Send notification to DB/////////////////
  const SendDBNotification = async () => {
    var user = await AsyncStorage.getItem('Userid');
    var date = new Date();
    axios({
      method: 'POST',
      url: BASE_URL + 'api/notification/createNotificationId',
      data: {
        to: props.HotelId,
        from: user,
        detail: props.Order_No + ' is schedule ',
        created_at: date,
        type:'ongoing',
        readStatus: 'false',
        to_table: 'hotel',
        from_table: 'driver',
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        props.CloseModal()
        navigation.navigate('Orders')
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

                ///////////////////map states//////////
const [driver_lat, setDriver_lat] = useState();
const [driver_log, setDriver_log] = useState();
const [driver_location, setDriver_location] = useState();

const getLiveLocation = async () => {
//Geocoder.init(MapKeyApi); 
const locPermissionDenied = await locationPermission()
if (locPermissionDenied) {
    const { latitude, longitude, heading } = await getCurrentLocation()
    // console.log("get live location after 4 second",latitude,longitude,heading)
    setDriver_lat(latitude)
    setDriver_log(longitude)
//     Geocoder.from(latitude,
//       longitude)
//        .then(json => {
// var addressComponent = json.results[0].formatted_address;
// setDriver_location(addressComponent)
//        })
}
}

  useEffect(() => {
      getLiveLocation();
  }, []);
    return(
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={props.CloseModal}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
            <Text style={styles.toptext}>
            Select Time to Reached Pickup</Text>
            <View style={{alignItems:'center',height:hp(20),marginTop:hp(5)}}>
            <FlatList
  data={TimeInterval}
  renderItem={({ item, index, separators }) => (
    <TouchableOpacity
    onPress={() =>
      {
        dispatch(setTimeInterval(item.title))
      }}
     >
    <View style={[styles.card]}>
        <Text style={styles.cardtext}>
          {item.title}
        </Text>
    </View>
    </TouchableOpacity>
  )}
  keyExtractor={item => item.id}
showsHorizontalScrollIndicator={false}
showsVerticalScrollIndicator={false}
/>
            </View>
 
              {/* <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),marginTop:hp(3),
              alignSelf:'center'}}>
                       <Text style={styles.modaltext}>
                            {props.text}</Text>
              </View> */}
              {/* <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),marginTop:hp(5),
              alignSelf:'center'}}>
                  <TouchableOpacity onPress={()=>setModalVisible()}
       style={styles.mainview}
       >
          <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:hp(0),
        width:wp(60)}}>
          <Text style={styles.labeltext}>{time_interval===''?'Select':time_interval}</Text>
        <Ionicons
          name='chevron-down'
          color={'#303030'}
          size={22}
          onPress={()=>setModalVisible()}

        />
          </View>
          </TouchableOpacity>

              </View> */}

    {/* <View  style={styles.ApprovedView}> */}
        {/* <TouchableOpacity 
        style={{alignItems:'center'}}
        onPress={props.CloseModal}>
        <Text style={styles.leftbtntext}>{props.leftbuttontext}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity 
        style={{alignItems:'center',marginBottom:hp(3),marginTop:hp(3)}}
        onPress={()=>StartOrder()}>
        <Text style={styles.rightbtntext}>{props.rightbuttontext}</Text>
        </TouchableOpacity>
    {/* </View> */}

            </View>
          </View>
          <TimeSelector
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Reason Submitted'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false),props.CloseModal()}}
                /> 
        </Modal>

    )
};

export default RejectedModal;