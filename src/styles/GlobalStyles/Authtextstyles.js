import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';

////////////////app colors////////////////
import Colors from '../../utills/Colors';

///////////app height width///////////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  //////////////////app fonts////////////
  import { fontFamily } from '../../constant/fonts';

const Authtextstyles = StyleSheet.create({
 
    textview:
    {
     marginHorizontal:25,
     marginTop:hp(0),
  marginBottom:hp(2),
     },
    images:
    {
  height:wp(22),
  width:wp(22)
    },
    toptext:
    {
      color: Colors.Appthemecolor,
      fontFamily:fontFamily.Poppins_SemiBold,
      //fontWeight: 'bold',
      fontSize: hp(3),
     
    },
    subtextview:
    {
      marginTop:wp(4),
      marginBottom:wp('0%'),
      justifyContent: 'center',
  
    },
    subtext:
    {
      color: '#707070',
      fontSize: hp(2),
      width: wp(80),
      marginTop:wp(2),
      marginBottom:wp(2),
      fontFamily:fontFamily.Poppins_Regular,
    },
 
});
export default Authtextstyles;
