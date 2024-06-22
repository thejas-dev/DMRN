import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {View,TouchableOpacity,Text} from 'react-native';

export default function Navbar({
	navigation
}) {
	


	return (
		<View style={{
			position:"absolute",
			bottom:0
		}} className="fixed flex flex-row justify-around bottom-0 left-0 flex w-[100%] 
		bg-white p-4 rounded-t-[60px] border-black/20 z-50 border-[1px]" >
			
			<TouchableOpacity onPress={()=>{
				navigation.navigate('Add New')
			}} className="flex flex-row items-center gap-2" >
				<Icon3 name="add-circle-outline" size={30} color="black"/>
				<Text className="text-2xl font-semibold text-black" >Add New</Text>

			</TouchableOpacity>
		


		</View>	

	)
}