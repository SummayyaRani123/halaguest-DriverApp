import React,{useState} from 'react';
import {View,Text,TouchableOpacity,Modal,Image,TextInput,FlatList} from 'react-native';

/////////////////app components//////////////
import CustomModal from './CustomModal';

///////////////app styles////////////////////
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Multilineinputstyles from '../../styles/GlobalStyles/Multilineinputstyle';

////////////app colors////////////////////
import Colors from '../../utills/Colors';

/////////////////app images/////////////////////
import { appImages } from '../../constant/images';

//////////////////api///////////////////
import { BASE_URL } from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setTimeInterval } from '../../redux/actions';

//////////////////device token///////////
import { Guest_DeviceToken,Hotel_DeviceToken } from '../../utills/ApiRootUrl';

const TimeInterval = [
    {
      id: 1,
      title: '5 min',
    },
    {
      id: 2,
      title: '10 min',
    },
    {
      id: 3,
      title: '15 min',
    },
    {
        id: 4,
        title: '20 min',
      },
      {
        id: 5,
        title: '25 min',
      },
      {
        id: 6,
        title: '30 min',
      },
      {
        id: 7,
        title: '35 min',
      },
      {
        id: 8,
        title: '40 min',
      },
      {
        id: 9,
        title: '45 min',
      },
      {
          id: 10,
          title: '50 min',
        },
        {
          id: 11,
          title: '55 min',
        },
        {
          id: 12,
          title: '60 min',
        },
  ];
  

const TimeSelector = (props) => {

console.log('here props:',props)

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    /////////////redux states///////
    const {state_id} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    return(
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={props.CloseModal}
        >
                     <View style={styles.centeredView}>

            <View style={[styles.modalView,{height:hp(32)}]}>
            <Text style={styles.toptext}>
            Select Time to Reached Pickup</Text>
  
     <FlatList
  data={TimeInterval}
  renderItem={({ item, index, separators }) => (
    <TouchableOpacity
    onPress={() =>
      {
        dispatch(setTimeInterval(item.title)),
        props.CloseModal()
      }}
     >
    <View style={styles.card}>
        <Text style={styles.cardtext}>
          {item.title}
        </Text>
    </View>
    </TouchableOpacity>
  )}
  keyExtractor={item => item.id}
showsHorizontalScrollIndicator={false}
showsVerticalScrollIndicator={false}
/>
</View>
</View>
          {/* <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Reason Submitted'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false),props.CloseModal()}}
                />  */}
        </Modal>

    )
};

export default TimeSelector;