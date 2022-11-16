import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,Image,TouchableOpacity } from 'react-native';

/////////////app icons/////////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////app styles//////////////////
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Inputstyles from '../../styles/GlobalStyles/Inputstyles';

//////////////app images/////////
import { appImages } from '../../constant/images';

////////////////app redux///////////
import { useSelector } from 'react-redux';

const NotificationView = ({ navigation,notitext,notitime,labelPress,icon,notiicon}) => {
    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

  return (
<View >
<TouchableOpacity onPress={labelPress}
       style={styles.mainview}
       >
          <View style={{flexDirection:"row",marginTop:hp(0),
        width:wp(75)}}>
        <Image
            source={appImages.NotiCheck}
            style={styles.logo}
            resizeMode='contain'
          />
            <View style={{marginLeft:wp(3),justifyContent:'center'}}>
            <Text style={styles.notitext}>{notitext}</Text>
            <Text style={styles.notitimetext}>{notitime}</Text>
            </View>
          </View>

          </TouchableOpacity>
<View style={styles.lineview}></View>
</View>


  );
};

export default NotificationView;