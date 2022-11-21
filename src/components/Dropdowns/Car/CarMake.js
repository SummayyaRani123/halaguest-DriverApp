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
import { setCarMake,setCarMakeId } from '../../../redux/actions';

  //////////////////////////app api/////////////////////////
  import axios from 'axios';

const CarMakeDropDown = (props) => {

    /////////////redux states///////
    const { condition} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

  //////////dropdownlink data/////////////
  const [dddata, setdddata] = useState()

  ///////////////CarCondition function///////////////
    const GetCarMake =async () => {
        axios({
          method: 'GET',
          url: 'http://teamsuit.co/carDb/api/make/getAll.php',
        })
          .then(function (response) {
            setdddata(response.data)
            console.log('flatlist data:', dddata)
          })
          .catch(function (error) {
            console.log("error", error)
          })
      }
      useEffect(() => {
        GetCarMake()
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
             height:hp(90),
             maxHeight:hp(90),
          }
        }}>
        <View style={{
          flexDirection: 'row', justifyContent: "space-between",
          marginHorizontal: 0
        }}>
          <Text style={styles.bottomsheettext}>Select Car Make</Text>
        </View>
        <FlatList
          data={dddata}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
            onPress={() =>
              {
                dispatch(setCarMake(item.name)),
                dispatch(setCarMakeId(item.id)),
                props.refRBSheet.current.close()
              }}
             >
            <View style={styles.card}>
                <Text style={styles.cardtext}>
                  {item.name}
                </Text>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        
        />

        </RBSheet>
    )
};

export default CarMakeDropDown;