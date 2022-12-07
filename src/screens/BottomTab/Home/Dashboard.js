import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

// Import Map and Marker
import Geocoder from 'react-native-geocoding';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from 'react-native-maps';
import {MapKeyApi} from '../../../utills/MapKey';

//////////////////app icons////////////////
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

//////////////////////app components///////////////
import DashboardHeader from '../../../components/Header/DashboardHeade';
import ViewAll from '../../../components/ViewAll/ViewAll';
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';
import Loader from '../../../components/Loader/Loader';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';

/////////////////app images///////////
import {appImages} from '../../../constant/images';

//////////////////current location function/////////////
import {
  locationPermission,
  getCurrentLocation,
} from '../../../api/CurrentLocation';


const Home = ({navigation}) => {
  ////////////////redux/////////////////
  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

////////////////loading/////////////
const [loading, setloading] = useState(true);

  /////////////main menu status states/////////////
  const [Orders, setOrders] = useState('');
  const GetOrders = async () => {
    var user= await AsyncStorage.getItem('Userid')
    axios({
      method: 'GET',
      url: BASE_URL + 'api/driver/searchOrder/'+user,
    })
      .then(async function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  //////////////////////Api Calling/////////////////
  const UdpdateDriverLocation = async () => {
    var user= await AsyncStorage.getItem('Userid')
    axios({
      method: 'PUT',
      url: BASE_URL + 'api/driver/updateDriver',
      data: {
        _id:user,
        driver_lat: driver_lat,
        driver_log: driver_log, 
      },
    })
      .then(function (response) {
        //console.log('response', JSON.stringify(response.data))

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
Geocoder.init(MapKeyApi); 
const locPermissionDenied = await locationPermission()
if (locPermissionDenied) {
    const { latitude, longitude, heading } = await getCurrentLocation()
    // console.log("get live location after 4 second",latitude,longitude,heading)
    setDriver_lat(latitude)
    setDriver_log(longitude)
    Geocoder.from(latitude,
      longitude)
       .then(json => {
var addressComponent = json.results[0].formatted_address;
setDriver_location(addressComponent)
       })
}
}

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
      UdpdateDriverLocation()
      GetOrders()
      setloading(false)
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
    <Loader
    isLoading={loading}
    />
    <ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}>
    <StatusBar backgroundColor={'black'} barStyle="light-content" />
    <DashboardHeader
      headerlabel={'Username'}
      userimage={appImages.ProfileUser}
      iconPress={() => {
        navigation.toggleDrawer();
      }}
      icon={'menu'}
      onpressicon={() => navigation.navigate('Notification')}
    />

    <View style={{height: hp(30)}}>
      {driver_lat && driver_log > 0 ? (
        <MapView
          style={[styles.mapStyle]}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          initialRegion={{
            latitude: driver_lat,
            longitude: driver_log,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {driver_lat && driver_log > 0  ? (
            <Marker
              draggable={true}
              coordinate={{
                latitude: driver_lat,
                longitude: driver_log,
              }}
            />
          ) : null}
        </MapView>
      ) : null}
    </View>

    <View style={styles.locview}>
      <Icon
        name={'location'}
        size={25}
        color={Colors.Appthemeorangecolor}
        //onPress={props.iconPress}
      />
      <Text style={styles.loctext}>{driver_location}</Text>
    </View>
    <ViewAll
      headerlabel={'Upcoming Trips'}
      onpress={() => navigation.navigate('TripList')}
    />
    {Orders === ''
      ? null
      : Orders.slice(0, 3).map((item, key) => (
        <TouchableOpacity onPress={()=>navigation.navigate('TripDetail',{orderid:item._id,navplace:'Trip'})}
        activeOpacity={true}
        >
          <OrdersCards
              time={item.flight_time}
               price={item.total_amount+'$'}
               pickupLoc={item.pickup_location}
               dropoffLoc={item.dropoff_location}
          />
          </TouchableOpacity>
        ))}
  </ScrollView>


    </SafeAreaView>
  );
};

export default Home;
