import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button,
	Linking, TouchableOpacity, Alert, Animated,
	Dimensions, StatusBar  } from "react-native";
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  RNCamera
} from 'react-native-camera';
const { height } = Dimensions.get('window');

export default function ScanScreen() {
  const [hasPermission,setHasPermission] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState('back');
  const topValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(topValue, {
          toValue: 238, // Move to bottom
          duration: 1700, // 3.5 seconds
          useNativeDriver: false,
        }),
        Animated.timing(topValue, {
          toValue: 0, // Move back to top
          duration: 1700, // No duration to reset position instantly
          useNativeDriver: false,
        }),
      ])
    );

    moveAnimation.start();
  }, [topValue]);


  const handleBarCodeScanned = async(type, data) => {
    setScanned(true);
    console.log(await Linking.canOpenURL(data))
    if(data){
    	// const supported = await Linking.canOpenURL(data);

	    try {
	      await Linking.openURL(data);
	    } catch(e) {
	      Alert.alert(`Don't know how to open this URL: ${data}`);
	    }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }


  return (
    <View style={styles.container}>
    	<StatusBar style="transparent" backgroundColor="transparent"/>
	      <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={StyleSheet.absoluteFillObject}
          type={facing}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            if(!scanned && barcodes[0]) handleBarCodeScanned(barcodes?.[0]?.format,barcodes?.[0]?.url)
          }}
          
	      >
	      	<View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Icon3 name="camera-flip-outline" size={40} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center'}} 
          >
            <View className={`h-[240px] w-[240px] border-solid border-[1px] border-gray-300 
            rounded-lg ${scanned ? 'hidden' : 'relative'} `}  >
              <View className="h-[30px] w-[30px] border-t-[6px] border-l-[6px] border-solid 
              absolute top-[-1%] left-[-1%] border-blue-500 z-20" />
              <View className="h-[30px] w-[30px] border-t-[6px] border-r-[6px] border-solid 
              absolute top-[-1%] right-[-1%] border-blue-500 z-20" />
              <View className="h-[30px] w-[30px] border-b-[6px] border-l-[6px] border-solid 
              absolute bottom-[-1%] left-[-1%] border-blue-500 z-20" />
              <View className="h-[30px] w-[30px] border-b-[6px] border-r-[6px] border-solid 
              absolute bottom-[-1%] right-[-1%] border-blue-500 z-20" />
         
              <Animated.View 
              className={`absolute bg-red-500 h-[2px] 
               z-0 w-full`}
               style={[{ top: topValue }]}
              />

            </View>
          </View>

	      </RNCamera>
      {scanned && (
      <>
      	<TouchableOpacity className="bg-[#2196f3] w-[250px] py-3 rounded-lg
      	mx-auto mt-5 mb-12"
      	onPress={() => setScanned(false)}
      	>
		    <Text className="text-center uppercase text-md font-semibold text-white" >Tap to Scan Again</Text>
		</TouchableOpacity>
    	</>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
   buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 30,
    marginTop:30
  },
  button: {
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

});