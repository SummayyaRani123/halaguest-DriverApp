import React, { useEffect, useState,useRef } from 'react';
import {View,Text,TouchableOpacity} from 'react-native';

////////////app pakages////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import RBSheet from "react-native-raw-bottom-sheet";

///////////////app styles//////////////////
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import {setCNICBack,setCNICFront,setLicenseBack,setLicenseFront,setUserImage,setOwnership } from '../../redux/actions';

  //////////////////////////app api/////////////////////////
  import axios from 'axios';
import { BASE_URL } from '../../utills/ApiRootUrl';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import RNFetchBlob from 'rn-fetch-blob';

  //////////////app pakages//////////////////
import ImagePicker from 'react-native-image-crop-picker';


const CamerBottomSheet = (props) => {

      /////////////redux states///////
      const { nav_place} = useSelector(state => state.userReducer);
      const dispatch = useDispatch();

  ///////////picker state/////////
  const [image, setImage] = useState('');

  //////////////////////cameraimage//////////////////
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      props.refRBSheet.current.close();
      console.log(image);
      setImage(image.path);
      let newfile = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      };
      Uploadpic(newfile);
    });
  };
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      props.refRBSheet.current.close();
      console.log(image);
      setImage(image.path);
      let newfile = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      };
 
      Uploadpic(newfile);
    });
  };
  const [selectedimage, setselectedimage] = useState(false);
  /////////////////image api calling///////////////
  const Uploadpic = props => {
    console.log('here url', BASE_URL + 'upload-image');
    RNFetchBlob.fetch(
      'POST',
      BASE_URL + 'upload-image',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        // part file from storage
        {
          name: 'image',
          filename: 'avatar-foo.jpg',
          type: 'image/png',
          data: RNFetchBlob.wrap(props.uri),
        },
      ],
    )
      .then(resp => {
        console.log('here Profile image:', resp.data);
        if(nav_place === 'Account_Detail')
        {
          dispatch(setUserImage(JSON.parse(resp.data)))
        }
        else if(nav_place === 'License_Front')
        {
          dispatch(setLicenseFront(JSON.parse(resp.data)))
        }
        else if(nav_place === 'License_Back')
        {
          dispatch(setLicenseBack(JSON.parse(resp.data)))
        }
        else if(nav_place === 'CNIC_Front')
        {
          dispatch(setCNICFront(JSON.parse(resp.data)))
        }
        else if(nav_place === 'CNIC_Back')
        {
          dispatch(setCNICBack(JSON.parse(resp.data)))
        }
        else if(nav_place === 'Vehicle_owernship')
        {
          dispatch(setOwnership(JSON.parse(resp.data)))
        }
        else{}
      })
      .catch(err => {
        console.log('here error:', err);
      });
  };
    return(
      <RBSheet
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      animationType="fade"
      minClosingHeight={0}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        },
        draggableIcon: {
          backgroundColor: "white"
        },
        container: {
      borderTopLeftRadius:wp(10),
      borderTopRightRadius:wp(10),
      height:hp(28)
      }
      }}
    >
   <View style={{flexDirection:'row', justifyContent:"space-between",
  marginHorizontal:wp(8),alignItems:"center"
  }}>
   <Text style={styles.maintext}>Upload Image</Text>
   <TouchableOpacity    onPress={() =>  props.refRBSheet.current.close()}>
   <Ionicons name="close" size={25} color={"#303030"}  
     onPress={() =>  props.refRBSheet.current.close()}/>
   {/* <Image
               source={appImages.Closeicon}
                  style={styles.icons}
                  resizeMode='contain'
              /> */}
   </TouchableOpacity>


   </View>   

        <View style={{justifyContent:'center',marginTop:hp(3)}}>
          <TouchableOpacity onPress={takePhotoFromCamera}
          style={styles.modaltextview}
          >
        <Ionicons name="camera" size={30} color={"#707070"} />
        {/* <Image
                 source={require('../../assets/imagepicker/camera.png')}
                 style={styles.uploadicon}
                  resizeMode='contain'
              /> */}
    <Text style={styles.optiontext}>Upload from Camera</Text>
    </TouchableOpacity>
<View style={{borderBottomColor:'#DCDCDC',borderBottomWidth:1,width:wp(85),alignSelf:'center',marginBottom:hp(2),marginTop:hp(2)}}></View>
    <TouchableOpacity  onPress={choosePhotoFromLibrary}
    style={styles.modaltextview}
    >
        <Ionicons name="image" size={30} color={"#707070"} />
        {/* <Image
                 source={require('../../assets/imagepicker/gallery.png')}
                 style={styles.uploadicon}
                  resizeMode='contain'
              /> */}
    <Text style={styles.optiontext}>Upload from Gallery</Text>

    </TouchableOpacity>
        </View>
    </RBSheet>
    )
};

export default CamerBottomSheet;