import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

//////////////app images/////////
import { appImages } from '../../constant/images';

////////////////app redux///////////
import { useSelector } from 'react-redux';

const CustomHeader = ({ navigation, headerlabel,iconPress,icon,
  onpresseacrh,type,
  searchicon }) => {
    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

  return (
      <View style={[styles.headerView]} >
        <View style={styles.lefticonview}>
          <Icon name={icon} size={25} 
          color= {'white'}
           onPress={iconPress} />
        </View>
          <View style={[styles.labelView,{marginTop:type === 'crypto'?hp(2):hp(0)}]}>
          {type === 'crypto'?
          <Image
            source={appImages.logo}
            style={styles.logo}
            resizeMode='contain'
          />
             :
             null}
            <Text style={styles.label}>{headerlabel}</Text>

            </View>
    
          <View style={styles.righticonview}>
          <Icon name={searchicon} size={25} 
          color= {'white'}
          onPress={onpresseacrh} 
           />
   
        </View>

      </View>
  );

};


export default CustomHeader;