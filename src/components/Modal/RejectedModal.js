import React from 'react';
import {View,Text,TouchableOpacity,Modal,Image,TextInput} from 'react-native';

/////////////app icons/////////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Logostyles from '../../styles/GlobalStyles/Logostyles';
import Multilineinputstyles from '../../styles/GlobalStyles/Multilineinputstyle';

////////////////app components///////////
import SettingsMenu from '../SettingsView/SettingsMenu';

import Colors from '../../utills/Colors';

/////////////////app images/////////////////////
import { appImages } from '../../constant/images';

const RejectedModal = (props) => {

    return(
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={props.CloseModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.toptext}>
            Send Message</Text>
  
              {/* <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),marginTop:hp(3),
              alignSelf:'center'}}>
                       <Text style={styles.modaltext}>
                            {props.text}</Text>
              </View> */}
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),marginTop:hp(5),
              alignSelf:'center'}}>
                  <TouchableOpacity onPress={props.labelPress}
       style={styles.mainview}
       >
          <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:hp(0),
        width:wp(60)}}>
          <Text style={styles.labeltext}>Select</Text>
        <Ionicons
          name='chevron-down'
          color={'#303030'}
          size={22}
          onPress={props.labelPress}

        />
          </View>
          </TouchableOpacity>

              </View>

    {/* <View  style={styles.ApprovedView}> */}
        {/* <TouchableOpacity 
        style={{alignItems:'center'}}
        onPress={props.CloseModal}>
        <Text style={styles.leftbtntext}>{props.leftbuttontext}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity 
        style={{alignItems:'center',marginBottom:hp(3),marginTop:hp(5)}}
        onPress={props.onPress}>
        <Text style={styles.rightbtntext}>{props.rightbuttontext}</Text>
        </TouchableOpacity>
    {/* </View> */}

            </View>
          </View>
        </Modal>

    )
};

export default RejectedModal;