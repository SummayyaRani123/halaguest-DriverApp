import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  ScrollView,
} from 'react-native';

///////////////////react native navigation///////////////
import {useIsFocused} from '@react-navigation/native';

///////////////dashline/////////////
import DashedLine from 'react-native-dashed-line';

//////////////////app components///////////
import CustomHeader from '../../../../components/Header/CustomHeader';
import CustomButtonhere from '../../../../components/Button/CustomButton';
import ReasonModal from '../../../../components/Modal/ReasonModal';
import RejectedModal from '../../../../components/Modal/RejectedModal';
import Loader from '../../../../components/Loader/Loader';

//////////////map////////////////
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

///////////////////app icons////////////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

////////////////////app styles///////////////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../../../utills/ApiRootUrl';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app images////////////////
import {appImages} from '../../../../constant/images';

////////////////////Device Token/////////////
import {
  Guest_DeviceToken,
  Hotel_DeviceToken,
} from '../../../../utills/ApiRootUrl';

/////////////////////location functions///////////
import {
  locationPermission,
  getLiveLocation,
} from '../../../../api/CurrentLocation';

const TripDetail = ({navigation, route, userid}) => {
  ////////////isfocused//////////
  const isfocussed = useIsFocused();

  ////////////////loading/////////////
  const [loading, setloading] = useState(true);

  // rbsheets states
  const refRBSheet = useRef();

  //Modal States
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  //order detail data states and apin function
  const [GuestToken, setGuestToken] = useState('');
  const [HotelToken, setHotelToken] = useState('');
  const [HotelId, setHotelId] = useState('');
  const [HotelName, setHotelName] = useState('');
  const [HotelPic, setHotelPic] = useState();
  const [GuestPic, setGuestPic] = useState();
  const [GuestName, setGuestName] = useState('');
  const [OrderNo, setOrderNo] = useState('');
  const [FlightDate, setFlightDate] = useState('');
  const [FlightTime, setFlightTime] = useState('');
  const [EstimatedAmount, setEstimatedAmount] = useState('');
  const [Comision, setComision] = useState('');
  const [CarPrice, setCarPrice] = useState('');
  const [TotalAmount, setTotalAmount] = useState('');
  const [DriverNotes, setDriverNotes] = useState('');
  const [PickupLocation, setPickupLocation] = useState('');
  const [DropoffLocation, setDropoffLocation] = useState('');
  const [PickupLat, setPickupLat] = useState();
  const [PickupLng, setPickupLng] = useState();
  const [DropoffLat, setDropoffLat] = useState();
  const [DropoffLng, setDropoffLng] = useState();

  const GetOrderDetail = async () => {
    console.log('order request function');
    await axios({
      method: 'GET',
      url: BASE_URL + 'api/Order/specificOrder/' + route.params.orderid,
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        /////////////guest/////////////////
        setGuestPic(response.data[0].guest_id.img);
        setGuestName(response.data[0].guest_id.name);
        setGuestToken(response.data[0].guest_id.device_token);
        ///////////driver///////////
        //setDrivertName(response.data[0].driver_id.name)
        //////////////order////////////////
        setFlightDate(response.data[0].flight_date);
        setFlightTime(response.data[0].flight_time);
        setEstimatedAmount(response.data[0].estimated_amount);
        setCarPrice(response.data[0].car_type_id.price);
        setTotalAmount(response.data[0].total_amount);
        setDriverNotes(response.data[0].driver_notes);
        setPickupLocation(response.data[0].pickup_location);
        setDropoffLocation(response.data[0].dropoff_location);
        setOrderNo(response.data[0].orderNo);
        setPickupLat(response.data[0].pickup_lat);
        setPickupLng(response.data[0].pickup_log);
        setDropoffLat(response.data[0].dropoff_lat);
        setDropoffLng(response.data[0].dropoff_log);
        /////////////////hotel////////////////
        setHotelId(response.data[0].guest_id.hotel_id[0]._id)
        setHotelName(response.data[0].guest_id.hotel_id[0].hotel_name);
        setHotelPic(response.data[0].guest_id.hotel_id[0].img);
        setHotelToken(response.data[0].guest_id.hotel_id[0].device_token);
        setloading(false);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (isfocussed) {
      GetOrderDetail();
      GetAcountDetail()
    }
  }, [isfocussed]);
  ///////////////data states////////////////////
const [DriverName, setDriverName] = React.useState();
  const GetAcountDetail=async() => {
    var user= await AsyncStorage.getItem('Userid')
    await axios({
      method: 'GET',
      url: BASE_URL+'api/driver/specificDriver/'+user,
    })
    .then(function (response) {
     // console.log("response", JSON.stringify(response.data))
      setDriverName(response.data[0].name)

    })
    .catch(function (error) {
      console.log("error", error)
    })
    }
    useEffect(() => {
      GetAcountDetail()
    }, []);
  //////////////////////Notification/////////////////
  const HotelSendNotification = async props => {
    var data = JSON.stringify({
      registration_ids: [HotelToken],
      data:
      {type:"TripRoute"},
      notification: {
        title: DriverName + 'has scheduled' + 'trip no:' + OrderNo,
        body: 'HalaGuest',
        mutable_content: true,
        sound: 'Tri-tone',
        color: 'purple',
      },
    });

    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Hotel_DeviceToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        SendDBNotification()
        OrderAcceptNotification()
        navigation.navigate('Orders');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //////////////////////Notification/////////////////
  const GuestSendNotification = async props => {
    var data = JSON.stringify({
      registration_ids: [GuestToken],
      data:
      {type:"TripRoute"},
      notification: {
        title: HotelName + 'has booked a trip for you, ' + 'trip no:' + OrderNo,
        body: 'HalaGuest',
        mutable_content: true,
        sound: 'Tri-tone',
        color: 'purple',
      },
    });

    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Guest_DeviceToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        HotelSendNotification();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //////////////////////Api Calling/////////////////
  const AcceptOrder = async props => {
    var user = await AsyncStorage.getItem('Userid');
    axios({
      method: 'PUT',
      url: BASE_URL + 'api/Order/AcceptOrder',
      data: {
        _id: route.params.orderid,
        driver_id: user,
        status: 'schedule',
      },
    })
      .then(function (response) {
        //console.log('response', JSON.stringify(response.data));
        GuestSendNotification();
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
    //////////////////////Send notification to DB/////////////////
    const SendDBNotification = async () => {
      var user = await AsyncStorage.getItem('Userid');
      var date=new Date()
      axios({
        method: 'POST',
        url: BASE_URL + 'api/notification/createNotificationId',
        data: {
          to:HotelId,
          from: user,
          detail: DriverName + ' Accepts your Trip ' + OrderNo,
          created_at: date,
          type:'accept',
          readStatus: 'false',
          to_table: 'hotel',
          from_table: 'driver' 
        },
      })
        .then(function (response) {
          //console.log('response', JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log('error', error);
        });
    };
        //////////////////////Send notification to DB/////////////////
        const OrderAcceptNotification = async () => {
          var user = await AsyncStorage.getItem('Userid');
          var date=new Date()
          axios({
            method: 'POST',
            url: BASE_URL + 'api/notification/createNotificationId',
            data: {
              to:HotelId,
              from: user,
              detail: DriverName + ' Schedule your Trip ' + OrderNo,
              created_at: date,
              type:'schedule',
              readStatus: 'false',
              to_table: 'hotel',
              from_table: 'driver' 
            },
          })
            .then(function (response) {
              //console.log('response', JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log('error', error);
            });
        };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <CustomHeader
          headerlabel={'Order Details'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
        />
        <View style={styles.ordertopview}>
          <Text style={styles.ordertoptext}>Order # {OrderNo}</Text>
        </View>
        <View style={{marginHorizontal: wp(5)}}>
          <View style={styles.userdetail}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Image
                //source={require('../../../../assets/dataimages/user.png')}
                source={{uri: BASE_URL + GuestPic}}
                style={{
                  height: 50,
                  width: 50,
                  borderColor: Colors.activeinputs,
                  borderWidth: 2,
                  borderRadius: 40,
                }}
              />

              <Text style={styles.usernametext}>{HotelName}</Text>
            </View>
          </View>
          <View style={styles.userdetail}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Image
                //source={require('../../../../assets/dataimages/user.png')}
                source={{uri: BASE_URL + HotelPic}}
                style={{
                  height: 50,
                  width: 50,
                  borderColor: Colors.activeinputs,
                  borderWidth: 2,
                  borderRadius: 40,
                }}
              />

              <Text style={styles.usernametext}>{GuestName}</Text>
            </View>
          </View>
          <View style={styles.detailview}>
            <Text style={styles.detailtextleft}>Flight Date</Text>
            <Text style={styles.detailtextright}>{FlightDate}</Text>
          </View>
          <View style={styles.detailview}>
            <Text style={styles.detailtextleft}>Flight Time</Text>
            <Text style={styles.detailtextright}>{FlightTime}</Text>
          </View>
          <View style={styles.lineview}></View>
          {/* <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Estimate Amount</Text>
    <Text style={styles.detailtextright}>
    {EstimatedAmount}</Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Comission</Text>
    <Text style={styles.detailtextright}>
    </Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Car Price</Text>
    <Text style={styles.detailtextright}>
    {CarPrice}</Text>
   </View> */}
          <View style={styles.detailview}>
            <Text style={styles.detailtextleft}>Total Amount</Text>
            <Text style={styles.detailtextright}>{TotalAmount}</Text>
          </View>
          <View style={styles.lineview}></View>
          <View style={{marginTop: hp(3)}}>
            <Text style={styles.detailtextleft}>Driver Notes</Text>
            <View style={{marginBottom: '2%'}}>
              <Text style={styles.notestext}>{DriverNotes}</Text>
            </View>
          </View>
          <Text style={styles.detailtextleft}>Locations</Text>
          {/* <Text style={styles.locationtext}>Pickup to Dropoff Location</Text> */}

          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginBottom: 5,
                alignItems: 'center',
                //backgroundColor:'yellow'
              }}>
              <Ionicons
                name="location"
                color={Colors.Appthemeorangecolor}
                size={25}></Ionicons>
              <Text style={styles.subtext}>{PickupLocation}</Text>
            </View>
            {/* <View style={{height:hp(15)}}>

{PickupLat && PickupLng > 0 ? (
        <MapView
          style={[styles.mapStyle]}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          initialRegion={{
            latitude: PickupLat,
            longitude: PickupLng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {PickupLat && PickupLng > 0 ? (
            <Marker
              coordinate={{
                latitude: PickupLat,
                longitude: PickupLng,
              }}
            />
          ) : null}
        </MapView>
      ) : null} 
</View> */}

            <DashedLine
              axis="vertical"
              dashLength={5}
              color={'red'}
              style={{paddingLeft: wp(6), height: hp(5)}}
            />

            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                marginTop: hp(1),
                marginBottom: hp(3),
                alignItems: 'center',
                //backgroundColor:'yellow'
              }}>
              <Ionicons
                name="location"
                color={Colors.BottomTabcolor}
                size={25}></Ionicons>
              <Text style={styles.subtext}>{DropoffLocation}</Text>
            </View>
            <View style={{height: hp(25), width: wp(90), alignItems: 'center'}}>
              {DropoffLat && DropoffLng > 0 ? (
                <MapView
                  style={[styles.mapStyle]}
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  initialRegion={{
                    latitude: DropoffLat,
                    longitude: DropoffLng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  {PickupLat && PickupLng > 0 ? (
                    <Marker
                      coordinate={{
                        latitude: PickupLat,
                        longitude: PickupLng,
                      }}
                      //icon={<Ionicons name='location' color={Colors.BottomTabcolor}  size={25}></Ionicons>}
                      image={appImages.orangeloc}
                    />
                  ) : null}
                  {DropoffLat && DropoffLng > 0 ? (
                    <Marker
                      coordinate={{
                        latitude: DropoffLat,
                        longitude: DropoffLng,
                      }}
                      image={appImages.blueloc}
                    />
                  ) : null}
                </MapView>
              ) : null}
            </View>
          </View>
        </View>

        <View style={{height: hp(20)}}>
          <CustomButtonhere
            title={'ACCEPT TRIP'}
            widthset={78}
            topDistance={10}
            onPress={() => {
              //dispatch(setPhoneNumber(number)),
              //navigation.navigate('Verification',{Phonenumber:number})}
              AcceptOrder();
            }}
          />
        </View>

        <ReasonModal
          modalVisible={modalVisible1}
          CloseModal={() => setModalVisible1(false)}
          Icon={appImages.ExclaimCircle}
          text={'You can only cancel trip within 60 minutes'}
          leftbuttontext={'CANCLE'}
          rightbuttontext={'SUBMIT'}
          onPress={() => {
            setModalVisible1(false);
          }}
        />
        <RejectedModal
          modalVisible={modalVisible2}
          CloseModal={() => setModalVisible2(false)}
          Icon={appImages.ExclaimCircle}
          text={'You can only cancel trip within 60 minutes'}
          leftbuttontext={'CANCLE'}
          rightbuttontext={'SUBMIT'}
          onPress={() => {
            setModalVisible2(false);
          }}
        />
      </ScrollView>
      {/* <Loader
    isLoading={loading}
    /> */}
    </SafeAreaView>
  );
};

export default TripDetail;
