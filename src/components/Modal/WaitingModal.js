import React from 'react';
import {View,Text,TouchableOpacity,Modal,Image} from 'react-native';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Logostyles from '../../styles/GlobalStyles/Logostyles';

/////////////////app images/////////////////////
import { appImages } from '../../constant/images';

const WaitingModal = (props) => {

    return(
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={props.CloseModal}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView,{alignItems:'center'}]}>
            <Image
                  source={props.Icon}
                  style={styles.iconstyle}
                  resizeMode='contain'
                />
  
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),marginTop:hp(3),
              alignSelf:'center'}}>
                       <Text style={styles.modaltext}>
                            {props.text}</Text>
              </View>
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),
              alignSelf:'center'}}>
                       <Text style={styles.modalsubtext}>
                            {props.subtext}</Text>
              </View>


        <TouchableOpacity 
        style={styles.leftview}
        onPress={props.CloseModal}>
        <Text style={styles.waitleftbtntext}>{props.leftbuttontext}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.rightview}
        onPress={props.onPress}>
        <Text style={styles.waitrightbtntext}>{props.rightbuttontext}</Text>
        </TouchableOpacity>


            </View>
          </View>
        </Modal>

    )
};

export default WaitingModal;