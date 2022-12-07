import React, {useState, useEffect, useRef} from 'react';
// Import required components
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

//////////////////app components////////////////
import CustomButtonhere from '../../../components/Button/CustomButton';

//////////////app pakages////////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

// Import Map and Marker
import Geocoder from 'react-native-geocoding';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {MapKeyApi} from '../../../utills/MapKey';

//////////////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

////////////////app redux///////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setLocationAddress,
  setLocationLat,
  setLocationLng,
} from '../../../redux/actions';

////////////////////app images/////////////////
import {appImages} from '../../../constant/images';

///////////////////////cureent location/////////////////
import {
  locationPermission,
  getCurrentLocation,
} from '../../../api/CurrentLocation';

const Location = ({navigation, route}) => {
  console.log('here from previous data:', route.params);

  ////////////////previous data//////////
  const [predata] = useState(route.params);

  ////////////////////redux/////////////////////
  const {pickup_location_lat} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  ////////////isfocused//////////
  const isfocussed = useIsFocused();

  /////////////map states////////////
  const [eror, setError] = useState();
  const [region, setRegion] = useState();
  const [marker, setMarker] = useState('');
  const [pinlat, setPinLat] = useState(0);
  const [pinlog, setPinLog] = useState(0);
  const [address, setAddress] = useState(0);

  const getLiveLocation = async () => {
    Geocoder.init(MapKeyApi);
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      // console.log("get live location after 4 second",latitude,longitude,heading)
      setPinLat(latitude);
      setPinLog(longitude);
      Geocoder.from(latitude, longitude).then(json => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      });
    }
  };
  useEffect(() => {
    if (isfocussed) {
      getLiveLocation();
    }
  }, [isfocussed]);

  return (
    <View style={[styles.container]}>
      {pinlat && pinlog > 0 ? (
        <MapView
          style={[styles.mapStyle]}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          initialRegion={{
            latitude: pinlat,
            longitude: pinlog,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {pinlat && pinlog > 0 ? (
            <Marker
              draggable={true}
              coordinate={{
                latitude: pinlat,
                longitude: pinlog,
              }}
            />
          ) : null}
        </MapView>
      ) : null}

      <View style={{marginLeft: wp(3), marginTop: hp(2), marginBottom: hp(1)}}>
        <Ionicons
          name={'chevron-back'}
          size={30}
          color={Colors.Appthemeorangecolor}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        {/* <OrdersCards
navplace={'trip'}
                                       pickupLoc={'pickup'}
                                       dropoffLoc={'dropoff'}
                                   /> */}
        <GooglePlacesAutocomplete
          //ref={ref}
          placeholder="Search"
          styles={{
            textInputContainer: styles.locationInput,
            textInput: styles.inputTextStyles,
            listView: styles.listView,
            description: styles.desc,
            predefinedPlacesDescription: {
              color: 'yellow',
            },
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            console.log(data, details.description);
            dispatch(setLocationAddress(details.description));
            Geocoder.init(MapKeyApi);
            Geocoder.from(details.description)
              .then(json => {
                var location = json.results[0].geometry.location;
                dispatch(setLocationLat(location.lat));
                dispatch(setLocationLng(location.lng));
                setPinLat(location.lat)
                setPinLog(location.lng)
                setRegion({
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.0462,
                  longitudeDelta: 0.0261,
                });
                setMarker({
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.0462,
                  longitudeDelta: 0.0261,
                });
              })
              .catch(error => console.warn(error));
          }}
          query={{
            key: MapKeyApi,
            language: 'en',
          }}
        />
      </View>
      <View style={styles.lastView}>
        <CustomButtonhere
          title={
            predata.navplace === 'DropoffLocation'
              ? 'DROPOFF LOCATION'
              : 'PICKUP LOCATION'
          }
          widthset={'78%'}
          topDistance={0}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default Location;
