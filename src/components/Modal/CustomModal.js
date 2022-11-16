import React from 'react';
import {View,Text,TouchableOpacity,Modal,Image} from 'react-native';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const CustomModal = (props) => {

    return(
        <View style={styles.centeredView}>
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

    <View  style={styles.ApprovedView}>
        <TouchableOpacity 
        onPress={props.onPress}>
        <Text style={styles.Pendingtext}>{props.buttontext}</Text>
        </TouchableOpacity>
    </View>

            </View>
          </View>
        </Modal>
        </View>
    )
};

export default CustomModal;