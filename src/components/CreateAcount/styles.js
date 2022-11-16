import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';
import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor:'white'
  },
  userimage:
  {
      borderColor:'#AAAAAA',
      borderWidth:1,
      width:wp(30),
      height:hp(14),
borderRadius:wp(25),
backgroundColor:'white',
alignItems:'center',
justifyContent:'center',
alignSelf:'center',
marginBottom:hp(0),
marginTop:hp(2)
},
image: {
    height:wp(30),
    width:wp(30),
borderRadius:80,
  },
  docimageview:
{
  alignItems:'center',
  justifyContent:'center',
  margin:hp(1)
},
  docimage: {
    height:wp(50),
    width:wp(85),
borderRadius:wp(5),
  },
  docimagechangeview:
  {
    width:wp(22),
    height:hp(4.5),
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:hp(2),
    right:wp(8),
    backgroundColor:Colors.Appthemecolor,
  borderRadius:wp(10)
},
docimagechangetext:
{
color:"white",
fontSize:hp(1.7),
fontFamily:fontFamily.Poppins_Regular
}
});
export default styles;
