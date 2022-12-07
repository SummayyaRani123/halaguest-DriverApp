import React, { useEffect, useState,useRef } from 'react';
import {View,Text,TouchableOpacity,Image,FlatList} from 'react-native';

///////////////////app pakages///////////////
import RBSheet from "react-native-raw-bottom-sheet";

////////////app styles//////////////
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setCarCondition,setCarConditionId } from '../../redux/actions';

  //////////////////////////app api/////////////////////////
  import axios from 'axios';
import { BASE_URL } from '../../utills/ApiRootUrl';
  import AsyncStorage from '@react-native-async-storage/async-storage';

const CarCondition = (props) => {

    /////////////redux states///////
    const { condition} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

  //////////dropdownlink data/////////////
  const [dddata, setdddata] = useState()
  const [ddpickvalue, setddpickvalue] = useState()

  ///////////////CarCondition function///////////////
    const GetCarCondition =async () => {
        console.log('here:')
        axios({
          method: 'GET',
          url: BASE_URL+'api/condition/allConditions',
        })
          .then(function (response) {
            // console.log("response", JSON.stringify(response.data))
            setdddata(response.data)
          })
          .catch(function (error) {
            console.log("error", error)
          })
      }
      useEffect(() => {
        GetCarCondition()
          }, []);
    return(
        <RBSheet
        //sstyle={{flex:1}}
        ref={props.refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        openDuration={50}
        closeDuration={50}
        animationType="fade"
        
        //height={500}
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
             // height:hp(95)
             maxHeight:hp(90),
          }
        }}
        
        >
        
        <View style={{
          flexDirection: 'row', justifyContent: "space-between",
          marginHorizontal: 0
        }}>
        
          <Text style={styles.bottomsheettext}>Select Car Condition</Text>
        
        </View>
        <FlatList
          data={dddata}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
            onPress={() =>
              {setddpickvalue(item.icon),
                dispatch(setCarCondition(item.name)),
                dispatch(setCarConditionId(item._id)),
                props.refRBSheet.current.close()
              }}
             >
            <View style={styles.card}>
            {/* <Image
                 source={{uri:BASE_URL+item.icon}}
                    style={Inputstyles.inputicons}
                    resizeMode='contain'
                /> */}
                <Text style={styles.cardtext}>
                  {item.name}
                </Text>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        
        />

        </RBSheet>
    )
};

export default CarCondition;