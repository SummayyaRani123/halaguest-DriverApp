import * as React from 'react';
import { View, Text, ActivityIndicator,Image,TouchableOpacity } from 'react-native';

////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';

    ////////////app icons////////////
    import Icon from 'react-native-vector-icons/Ionicons';

    //////////////app pakages/////////////
import {
    Avatar,
} from 'react-native-paper';
import DashedLine from 'react-native-dashed-line';

import { BASE_URL } from '../../utills/ApiRootUrl';

import { appImages } from '../../../constant/images';
const TripCard = (props) => {
    return (
        <View style={styles.card}>
            
            <View style={{flexDirection:"row",marginTop:hp(0),
        width:wp(75)}}>
        <Image
            source={appImages.NotiCheck}
            style={styles.logo}
            resizeMode='contain'
          />
            <View style={{marginLeft:wp(3),justifyContent:'center'}}>
            <Text style={styles.Triptext}>Customer Name</Text>

            </View>
          </View>
          <View style={styles.innercard}>
            {
            props.navplace === 'trip'? null :
                <View style={{
           
                    flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:hp(1.5)
                                }}>
                    <Text style={styles.Triptext}>
            {'Trip Time: '}  
                <Text style={styles.Timetext}> 
            {props.time}
                </Text>
                </Text>
      {          props.type === 'Schedule'?
                              <Text style={styles.Triptext}>
                              {'Trip Time: '}  
                                  <Text style={styles.Timetext}> 
                              {props.date}
                                  </Text>
                                  </Text>:
                                    <Text style={styles.pricetext}>{props.price}
                                    </Text>
                                    }
          
                                </View>
            }
   
                    <View style={{
                        justifyContent: "center", alignContent: 'center',
                        marginLeft:wp(0)
                    }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name={'location'} size={25} 
          color= {Colors.Appthemeorangecolor}
           onPress={props.iconPress} 
           />
                        <Text style={styles.itemmaintext}>{props.pickupLoc}
                        </Text>
                        </View>
            <DashedLine axis='vertical' dashLength={3} color={'#3590C4'} 
            style={{ paddingLeft:wp(2.5), height:hp(4) ,color:'#3590C4' }} />
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name={'location'} size={25} 
          color= {Colors.BottomTabcolor}
           onPress={props.iconPress} />
                        <Text style={styles.itemmaintext}>{props.dropoffLoc}
                        </Text>
                        </View>
                
                    <TouchableOpacity onPress={props.onpress}
                    style={{height:hp(5),width:wp(23),backgroundColor:Colors.Appthemecolor,
                    borderRadius:wp(2),alignItems:'center',justifyContent:'center'
                    }}
                    >
                    <Text style={styles.btntext}>ACCEPT
                        </Text>
                    </TouchableOpacity>
                    </View>
                        </View>
                 
      
            </View>
        </View>
       



    )
};

export default TripCard;