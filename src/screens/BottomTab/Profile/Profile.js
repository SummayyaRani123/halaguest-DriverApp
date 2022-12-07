import React, {useState,useEffect} from 'react';
import { 
    View,  Text,  TouchableOpacity,   StatusBar,  ScrollView,
} from 'react-native';

///////////////////react native navigation///////////////
import { useIsFocused } from '@react-navigation/native';

////////////////app components//////////////
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';
import CustomHeader from '../../../components/Header/CustomHeader';
import ProfileCard from '../../../components/CustomCards/ProfileCard/Profile';
import SettingsMenu from '../../../components/SettingsView/SettingsMenu';
////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

///////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';

//////////////////app images///////////
import { appImages } from '../../../constant/images';


const Profile = ({navigation}) => {

    ////////////isfocused//////////
    const isfocussed = useIsFocused()
  
    ///////////////data states////////////////////
const [username, setUserName] = React.useState();
const [userimage, setUserImage] = React.useState();
const [useremail, setUseremail] = React.useState();
const [usercity, setUsercity] = React.useState();
const GetAcountDetail=async() => {
var user= await AsyncStorage.getItem('Userid')
await axios({
method: 'GET',
url: BASE_URL+'api/driver/specificDriver/'+user,
})
.then(function (response) {
//console.log("response get here driver", JSON.stringify(response.data))
setUserImage(response.data[0].img)
setUserName(response.data[0].name)
setUsercity(response.data[0].city)
setUseremail(response.data[0].email)
})
.catch(function (error) {
console.log("error", error)
})
}
useEffect(() => {
if (isfocussed) {
GetAcountDetail()
}
}, [isfocussed]);
    return (
      <View style={styles.container}>
         
          <StatusBar backgroundColor='white' barStyle="dark-content"/>

        <View style={styles.header}>
        <CustomHeader
          headerlabel={'Profile'}
        //   iconPress={() => { navigation.goBack() }}
        //   icon={'chevron-back'}
          onpresseacrh={() => navigation.navigate('Settings')}
          searchicon={'settings'}
        />
        </View>
        <View 
            style={[styles.footer]}
        >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
                    <View style={{marginTop:hp(20),
                    marginBottom:hp(2)}}>
               {/* <SettingsMenu
       label={'Payment Details'}
       labelPress={()=>navigation.navigate('ViewPaymentDetail')}
       /> */}
                          <SettingsMenu
       label={'UpdateProfile'}
       labelPress={()=>navigation.navigate('UpdateProfile')}
       />
                  <SettingsMenu
       label={'Vehicle Details'}
       labelPress={()=>navigation.navigate('ViewVehicleDetail')}
       />
                  <SettingsMenu
       label={'Document Details'}
       labelPress={()=>navigation.navigate('UpdateDocumentsDetail')}
       />
     
                  <SettingsMenu
       label={'Contact Us'}
      // labelPress={()=>navigation.navigate('UpdateDocumentsDetail')}
       />

                    </View>
                  </ScrollView>
        </View>
        <View style={{position:'absolute',top:hp(10),alignItems:'center',alignSelf:'center'}}>
            <ProfileCard
                             userlogo={{uri:BASE_URL+userimage}}
                             username={username}
                             usercity={usercity}
                             useremail={useremail}
            />
          </View>
      </View>
    );
};

export default Profile;
