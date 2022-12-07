import React,{useState} from 'react';
import {View,Text,TouchableOpacity,Modal,Image,TextInput} from 'react-native';

///////////////navigation////////////////
import { useNavigation } from '@react-navigation/native';

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

//////////////////device token///////////
import { Guest_DeviceToken,Hotel_DeviceToken } from '../../utills/ApiRootUrl';


const ReasonModal = (props) => {

  /////////////navigation state/////////////////
  const navigation = useNavigation();

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

/////////////////////Cancel Order Api function and state////////////////////
const [CancelReason, setCancelReason] = useState('');
           const CancelOrder = async () => {
            var user= await AsyncStorage.getItem('Userid')
            console.log('userid:',user);
            console.log('here ids',props.order_id)
                axios({
                  method: 'PUT',
                  url: BASE_URL + 'api/Order/updateOrder',
                  data: {
                    _id: props.order_id,
                    driver_id: user,
                    status: 'cancel',
                    canceled_by:'driver',
                    cancellation_reason:CancelReason
                  },
                })
                  .then(function (response) {
                    console.log(' Cancel response', JSON.stringify(response.data));
          GuestSendNotification()
                    
                  })
                  .catch(function (error) {
                    console.log('error', error);
                  });
              };

                       //////////////////////Notification/////////////////
           const HotelSendNotification = async () => {
            console.log('here:')
            var data = JSON.stringify({
              "registration_ids": [
                props.Hotel_Token
              ],
              "notification": {
                "title": "Halaguest",
                "body": "trip no: " +props.Order_No+" has been cancelled by driver "+ props.Driver_Name,
                "mutable_content": true,
                "sound": "Tri-tone",
                "color": "purple"
              }
            });
            
            var config = {
              method: 'post',
              url: 'https://fcm.googleapis.com/fcm/send',
              headers: { 
                'Content-Type': 'application/json', 
                'Authorization': Hotel_DeviceToken
              },
              data : data
            };
            
            axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              SendDBNotification()
       
             // props.CloseModal()
            
            })
            .catch(function (error) {
              console.log(error);
            });
              };
             //////////////////////Notification/////////////////
             const GuestSendNotification = async () => {
              console.log('here:')
              var data = JSON.stringify({
                "registration_ids": [
                  props.Guest_Token
                ],
                "notification": {
                  "title": "Halaguest",
                  "body": "trip no: " +props.Order_No+" has been cancelled by driver "+ props.Driver_Name,
                  "mutable_content": true,
                  "sound": "Tri-tone",
                  "color": "purple"
                }
              });
              
              var config = {
                method: 'post',
                url: 'https://fcm.googleapis.com/fcm/send',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': Guest_DeviceToken
                },
                data : data
              };
              
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                HotelSendNotification()
              })
              .catch(function (error) {
                console.log(error);
              });
                };
                  //////////////////////Send notification to DB/////////////////
  const SendDBNotification = async () => {
    var user = await AsyncStorage.getItem('Userid');
    var date = new Date();
    console.log('userid:', user, date);

    axios({
      method: 'POST',
      url: BASE_URL + 'api/notification/createNotificationId',
      data: {
        to: props.HotelId,
        from: user,
        detail: "trip no: " +props.Order_No+" is rejected",
        created_at: date,
        type:'cancel',
        readStatus: 'false',
        to_table: 'hotel',
        from_table: 'driver',
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        setModalVisible(true);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
    return(
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={props.CloseModal}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
            <Text style={styles.toptext}>
                            Add reason</Text>
  
              {/* <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),marginTop:hp(3),
              alignSelf:'center'}}>
                       <Text style={styles.modaltext}>
                            {props.text}</Text>
              </View> */}
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),
              alignSelf:'center'}}>
      <View style={[Multilineinputstyles.action, { height: wp('38%'), marginTop: wp('3%'),width:wp(75),backgroundColor:'white',
      borderColor:Colors.border,borderWidth:1
     }]}>
            <TextInput
              placeholder="Add Reason"
              onChangeText={setCancelReason}
              placeholderTextColor={Colors.inputtextcolor}
              multiline={true}

              style={Multilineinputstyles.input}
            />

          </View>
              </View>

    <View  style={styles.ApprovedView}>
        <TouchableOpacity 
        onPress={props.CloseModal}>
        <Text style={styles.leftbtntext}>{props.leftbuttontext}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>{
          CancelOrder()
          }}>
        <Text style={styles.rightbtntext}>{props.rightbuttontext}</Text>
        </TouchableOpacity>
    </View>

            </View>
          </View>
          <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Reason Submitted'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false),props.CloseModal(),navigation.navigate('Orders')}}
                /> 
        </Modal>

    )
};

export default ReasonModal;