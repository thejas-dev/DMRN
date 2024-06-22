import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Fontisto';
import { Overlay } from '@rneui/themed';
import { StyleSheet, Text, View, TouchableOpacity, 
	FlatList, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReorderOverlay({
	showReorder,
	setShowReorder,
	allData,
	setAllData
}) {
	const upOneLevel = async(j) => {
		if(j>0){
		  	let currData = allData[j];
		  	let upperData = allData[j-1];
		  	let currAllData = [...allData];
		  	currAllData.splice(j,1,upperData);
		  	currAllData.splice(j-1,1,currData);
		  	setAllData(currAllData);
			let newAllValues = JSON.stringify(currAllData);
			await AsyncStorage.setItem('QR-codes',newAllValues);
		}

	}

	const downOneLevel = async(j) => {
		if(j+1<allData.length){
		  	let currData = allData[j];
		  	let lowerData = allData[j+1];
		  	let currAllData = [...allData];
		  	currAllData.splice(j,1,lowerData);
		  	currAllData.splice(j+1,1,currData);
		  	setAllData(currAllData);
		  	let newAllValues = JSON.stringify(currAllData);
			await AsyncStorage.setItem('QR-codes',newAllValues);
		}

	};

	const renderItem = ({ item, index }) => {
		const j = index;
	  return (
	      <View
			className="flex items-center justify-between flex-row py-3 px-2"	        
	      >
	      	<View className="flex flex-row gap-1 w-[80%]" >
		        {
		        	item?.app === 'telegram' ?
		        	<Icon2 name={item?.app} size={28} color="black"/>
		        	:
		        	<Icon name={item?.app === 'other' ? 'link-variant' : item?.app} size={28} color="black"/>
		        }
		        <Text className="text-lg truncate text-black"  >{item?.inputData}</Text>
	      	</View>
	      	<View className="flex flex-row gap-1 w-[80%]" >
		        <TouchableOpacity onPress={()=>{
		        	upOneLevel(j)
		        }} >
		        	<Icon name="chevron-up" size={28} color="black"/>
		        </TouchableOpacity>
		        <TouchableOpacity onPress={()=>{
		        	downOneLevel(j)
		        }} >
		        	<Icon name="chevron-down" size={28} color="black"/>
		        </TouchableOpacity>
	      	</View>
	      	
	      </View>
	  );
	};

	return (
		<Overlay isVisible={showReorder}  onBackdropPress={()=>{
			setShowReorder(false)
		}} >
			<View style={{
				height:500
			}} >
			<ScrollView 
			showsVerticalScrollIndicator={false}
			style={{width:300}} >
  			<View style={{
  				padding:8
  			}} >
  				<View className="bg-blue-600 p-1" >
    				<Text style={{
    					color:"white",
    					fontSize:18,
    					textAlign:"center"
    				}} >
    					Change The Order
    				</Text>
  				</View>
  			</View>
				<FlatList
					scrollEnabled={false}
	        data={allData}
	        onDragEnd={({ data }) => {console.log(data);setAllData(data)}}
	        keyExtractor={(item) => item.key}
	        renderItem={renderItem}
		    />
			</ScrollView>
			</View>
		</Overlay>
	)
}