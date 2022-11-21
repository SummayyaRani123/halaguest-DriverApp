import React from 'react';
import {View,Text,TouchableOpacity,Modal,Image} from 'react-native';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';
const LogoutModal = (props) => {

    return(
        // <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={props.CloseModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
      
{props.Icon}
  
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(3),
              alignSelf:'center'}}>
                       <Text style={styles.modaltext}>
                            {props.text}</Text>
              </View>
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(5),
              alignSelf:'center'}}>
                       <Text style={styles.modalsubtext}>
                            {props.subtext}</Text>
              </View>

    <View  style={styles.logoutbtnView}>
    <TouchableOpacity 
        onPress={props.onPress}
        style={styles.cancelbtn}
        >
        <Text style={[styles.Pendingtext,{color:Colors.Appthemecolor}]}>{props.buttontext1}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={props.onPress1}
        style={styles.donebtn}
        >
        <Text style={styles.Pendingtext}>{props.buttontext}</Text>
        </TouchableOpacity>
    </View>

            </View>
          </View>
        </Modal>
        // </View>
    )
};

export default LogoutModal;