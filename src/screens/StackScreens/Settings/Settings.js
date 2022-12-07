import React, { useEffect, useState,useRef } from 'react';
import {
  SafeAreaView,ScrollView,Image,
 View, Text, TouchableOpacity,
} from 'react-native';

/////////////////////app pakages///////////////
import { Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import SettingsMenu from '../../../components/SettingsView/SettingsMenu';
import CustomButtonhere from '../../../components/Button/CustomButton';

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'

/////////////////////app images/////////////////////
import { appImages } from '../../../constant/images';

const Settings = ({ navigation }) => {


  return (

    <SafeAreaView style={styles.container}>
               <CustomHeader
          headerlabel={'Settings'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
        />

<View style={{marginTop:hp(6)}}></View>
{/* <SettingsMenu
       label={'Update Profile'}
       labelPress={()=>navigation.navigate('UpdateProfile')}
       /> */}
       <SettingsMenu
       label={'Privacy Policy'}
       labelPress={()=>navigation.navigate('PrivacyTerms',{navplace:'Privacy'})}
       />
       <SettingsMenu
       label={'Terms & Condition'}
       labelPress={()=>navigation.navigate('PrivacyTerms',{navplace:'Terms'})}
       />
       {/* <SettingsMenu
       label={'Contact Us'}
       labelPress={()=>navigation.navigate('Contact Us')}
       /> */}
       <SettingsMenu
       label={'How to Use'}
       //labelPress={()=>navigation.navigate('How to Use')}
       />
<CustomButtonhere
            title={'LOGOUT'}
            widthset={78}
            topDistance={40}
            icon={'power'}
            onPress={() => 
             {
              navigation.navigate('BottomTab')}
            }
          />

    </SafeAreaView>
  )
};

export default Settings;