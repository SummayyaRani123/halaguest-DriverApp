import React, { useEffect, useState,useRef } from 'react';
import {
  SafeAreaView,ImageBackground,Dimensions,Linking,
   View, Text, TouchableOpacity,Image, TouchableHighlightComponent
} from 'react-native';

///////////////////app components//////////
import CustomModal from '../../../../components/Modal/CustomModal';

///////////////timer/////////////////////
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import CountDown from 'react-native-countdown-component';

//////app icons////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

///////////////////app components////////////
import OrdersCards from '../../../../components/CustomCards/OrderCards/Orders';

////////app styles///////////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

///////////////////map states//////////////////
import MapView, { PROVIDER_GOOGLE,Polyline,Marker,AnimatedRegion  } 
from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { MapKeyApi } from '../../../../utills/MapKey';

////////////location function////////////////
import { locationPermission,getCurrentLocation } from '../../../../api/CurrentLocation';

///////////////////app images//////////////
import { appImages } from '../../../../constant/images';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////////tOKEN IDS/////////////
import { Guest_DeviceToken } from '../../../../utills/ApiRootUrl';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.08;
const LONGITUDE_DELTA =LATITUDE_DELTA * ASPECT_RATIO;

const TripCompleted = ({ navigation,route }) => {

  //previous data
  const[previousdata]=useState(route.params)
  console.log('orderid:',route.params)

  /////////////timer state///////////////
  const [disabletimer, setdisableTimer] = useState(false);

         ///////////////Modal States///////////////
         const [modalVisible, setModalVisible] = useState(false);
  
  //////////time function//////////
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
  
    return `${minutes}:${seconds}`
  }

  ///////////////////map/////////////////////
  const mapRef = useRef()
  const markerRef = useRef()
  const ref = useRef();
    const [state, setState] = useState({
        curLoc: {
          latitude:    previousdata.pickupLat,
          longitude:  previousdata.pickupLng,
        },
        destinationCords: {
          latitude:    previousdata.dropoffLat,
          longitude:  previousdata.dropoffLng,
        },
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 0,
        distance: 0,
        heading: 0

    })

    const { curLoc, time, distance, destinationCords, isLoading, coordinate,heading } = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const animate = (latitude, longitude) => {
      const newCoordinate = { latitude, longitude };
      if (Platform.OS == 'android') {
          if (markerRef.current) {
              markerRef.current.animateMarkerToCoordinate(newCoordinate, 1000);
          }
      } else {
          coordinate.timing(newCoordinate).start();
      }
  }

const getLiveLocation = async () => {
  const locPermissionDenied = await locationPermission()
  if (locPermissionDenied) {
      const { latitude, longitude, heading } = await getCurrentLocation()
      console.log("get live location after 4 second",heading)
      animate(latitude, longitude);
      updateState({
          heading: heading,
          curLoc: { latitude, longitude },
          coordinate: new AnimatedRegion({
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
          })
      })
  }
}

const  handlePin = () =>
{
    return (
        <View>
            <ImageBackground source={appImages.Camera} 
            style={{height: 30, width:30 }}>
                <Text style={{paddingBottom:25}}>Hello</Text>
            </ImageBackground>
        </View>
        )
}
const fetchTime = (d, t) => {
  updateState({
      distance: d,
      time: t
  })
}

/////////////////////Update Order Api function and state////////////////////

const CompleteOrder = async () => {
  var user= await AsyncStorage.getItem('Userid')
  console.log('userid:',user,"orderid",orderid);
      axios({
        method: 'PUT',
        url: BASE_URL + 'api/Order/updateOrder',
        data: {
          _id: orderid,
          driver_id: user,
          status: 'completed',
        },
      })
        .then(function (response) {
         // console.log(' Cancel response', JSON.stringify(response.data));
GuestSendNotification()
          
        })
        .catch(function (error) {
          console.log('error', error);
        });
    };

////////////////////Notificatioon statechanges//////////////
const[arrived,setArrived]=useState(false)
        //////////////////////Notification/////////////////
        const GuestSendNotification = async (props) => {
          console.log('here:')
          var data = JSON.stringify({
            "registration_ids": [
              GuestToken
            ],
            "notification": {
              "title": GuestName+" give rating to driver ",
              "body": "HalaGuest",
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
            console.log(JSON.stringify(response.data));
navigation.navigate('Rattings',{orderid:orderid,
  navplace:'completedtrip'})
          })
          .catch(function (error) {
            console.log(error);
          });
            };
  useEffect(() => {
    GetOrderDetail()
    ref.current?.setAddressText('Rawalpindi');
  const interval = setInterval(() => {
   // getLiveLocation()
   // GetOrderDetail()
}, 1000);
return () => clearInterval(interval)

  }, []);
  //order detail data states and apin function
const [GuestToken,setGuestToken]=useState('')
const [HotelToken,setHotelToken]=useState('')
const [GuestId,setGuestId]=useState('')
const [GuestName,setGuestName]=useState('')
const [GuestPic,setGuestPic]=useState('')
const [GuestNo,setGuestNo]=useState('')
const [Driverpic, setDriverPic] = useState('');
const [DriverName, setDriverName] = useState('');
const [DriverCar, setDriverCar] = useState('');
const [OrderNo, setOrderNo] = useState('');
const [orderid, setOrderId] = useState('');
const [PickupLocation, setPickupLocation] = useState('');
const [DropoffLocation, setDropoffLocation] = useState('');
const [PickupLat, setPickupLat] = useState('');
const [PickupLng, setPickupLng] = useState('');
const [DropoffLat, setDropoffLat] = useState('');
const [DropoffLng, setDropoffLng] = useState('');
const [OrderStatus, setOrderStatus] = useState('');

const GetOrderDetail = async () => {
  console.log('order request function');
  await axios({
    method: 'GET',
    url: BASE_URL + 'api/Order/specificOrder/' + route.params.orderid,
  })
    .then(function (response) {
      console.log('response', JSON.stringify(response.data));
      setGuestId(response.data[0].guest_id._id)
      setGuestName(response.data[0].guest_id.name)
      setGuestPic(response.data[0].guest_id.img)
      setGuestNo(response.data[0].guest_id.phoneno)
      setDriverPic(response.data[0].driver_id.img)
      setDriverName(response.data[0].driver_id.name);
      setDriverCar(response.data[0].driver_id.vehicle_detail_id[0].make);
      setPickupLocation(response.data[0].pickup_location);
      setDropoffLocation(response.data[0].dropoff_location);
      setPickupLat(response.data[0].pickup_lat);
      setPickupLng(response.data[0].pickup_log);
      setDropoffLat(response.data[0].dropoff_lat);
      setDropoffLng(response.data[0].dropoff_log);
      setOrderStatus(response.data[0].status);
      setOrderNo(response.data[0].orderNo);
      setOrderId(response.data[0]._id);
      setHotelToken(response.data[0].guest_id.hotel_id[0].device_token)
      setGuestToken(response.data[0].guest_id.device_token)
    })
    .catch(function (error) {
      console.log('error', error);
    });
};





const Timer=()=>{
  return(
  //   <CountDown
  //   until={60 * 10 + 30}
  //   size={20}
  //   onFinish={() => alert('Finished')}
  //   digitStyle={{backgroundColor: '#FFF'}}
  //   digitTxtStyle={{color: '#1CC625'}}
  //   timeToShow={['M', 'S']}
  //   timeLabels={{m: 'MM', s: 'SS'}}
  // />
    <CountdownCircleTimer
    size={50}
    strokeWidth={0}
    children ={children}
        isPlaying
        duration={7}
        initialRemainingTime={10}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => {
          setdisableTimer(false)
          setModalVisible(true)
          // do your stuff here
          //return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
        }}
      >
    
        {({ remainingTime }) =>
        
        <Text style={{color:'black',fontSize:hp(2)}}>{remainingTime}(s)</Text>}
      </CountdownCircleTimer>
  )
}
  return (

<View style={[styles.container]}>
{previousdata.pickupLat && previousdata.pickupLng > 0 ? 
 <MapView
     ref={mapRef}
  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
  style={styles.map}
  initialRegion={{
    ...curLoc,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}}
  // region={{
  //   // latitude:  previousdata.pickupLocation.coordinates.latitude,
  //   // longitude:  previousdata.pickupLocation.coordinates.longitude,
  //   // latitudeDelta: 0.015,
  //   // longitudeDelta: 0.0121,
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 0.015,
  //   longitudeDelta: 0.0121,
  // }}
  >

<Marker.Animated
                        ref={markerRef}
                        coordinate={
                          curLoc
                        }
                    >
                        <Image
                            source={appImages.blueloc}
                            style={{
                                width: 40,
                                height: 40,
                                //transform: [{rotate: `${heading}deg`}]
                            }}
                            resizeMode="contain"
                        />
                    </Marker.Animated>
                    {Object.keys(destinationCords).length > 0 && (<Marker
                        coordinate={destinationCords}
                        image={appImages.orangeloc}
                    />)}

{Object.keys(destinationCords).length > 0 && (<MapViewDirections
                        origin={curLoc}
                        destination={destinationCords}
                        apikey={MapKeyApi}
                        strokeWidth={3}
                        strokeColor="black"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" 
                            and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            fetchTime(result.distance, result.duration),
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        // right: 30,
                                        // bottom: 300,
                                        // left: 30,
                                        // top: 100,
                                    },
                                });
                        }}
                        onError={(errorMessage) => {
                            // console.log('GOT AN ERROR');
                        }}
                    />)}

</MapView>
:null}
        <View style={{marginLeft:wp(3),marginTop:hp(2),marginBottom:hp(1)}}>
        <Ionicons name={'chevron-back'} size={30} 
          color= {Colors.Appthemeorangecolor}
          onPress={() => refRBSheet.current.open()}/>

        </View>
        <View style={{alignItems:'center'}}>
<OrdersCards
navplace={'trip'}
                                       pickupLoc={PickupLocation}
                                       dropoffLoc={DropoffLocation}
                                   />
    
    </View>
      <View
style={styles.lastView}
      > 
      <View style={{backgroundColor:'white',
      height:hp(25),paddingTop:hp(2),
    width:wp(100)}}>

      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:hp(2),
      marginHorizontal:wp(5)}}>
      <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:wp(1)}}>
          <Image
                    //source={appImages.ProfileUser}
                    source={{uri:BASE_URL+Driverpic}}
                    style={styles.image}
                    resizeMode='contain'
                  />
                  <View style={{marginLeft:wp(3)}}>
                  <Text 
              style={styles.drivertext}
                >{DriverName}</Text>
                          <Text 
              style={styles.vehicletext}
                >{DriverCar}</Text>
                  </View>
                  
          </View>

      
          </View>
          <View style={{borderBottomColor:'#DCDCDC',borderBottomWidth:1,width:wp(85),alignSelf:'center',marginBottom:hp(4),marginTop:(3)}}></View>
      <TouchableOpacity onPress={()=>CompleteOrder()}
       style={[styles.tripbtn,{backgroundColor:Colors.Appthemecolor,width:wp(70),alignSelf:'center'}]}>
                      <Text 
              style={styles.triptext}
                >Mark As Reached</Text>
      </TouchableOpacity>
      </View>
      </View>
      <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.ExclaimCircle}
                text={'Account Verified Successfully'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'Wait More'}
 onPress={()=> {setModalVisible(false),Timer()}}
                /> 
</View>


  )
};

export default TripCompleted;