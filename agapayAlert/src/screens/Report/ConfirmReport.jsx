import React, {useState} from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";

export default function ConfirmReport() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const handleReportPress = () => {
        setModalVisible(true);
    };

    const handleConfirm = () => {
        setModalVisible(false);
        navigation.navigate("ReportAP");
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <View style={tw`flex-row justify-around pt-4`}>
            <TouchableOpacity style={[tw` p-6 px-25 rounded-full shadow-lg`, { backgroundColor: '#b91c1c' }]} onPress={handleReportPress}>
                <Text style={tw`text-white text-center`}>Report</Text>
            </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={tw`flex-1 justify-center items-center bg-gray-900 bg-opacity-50`}>
                    <View style={tw`bg-white p-4 rounded-md`}>
                        <View style={tw`items-center mb-4`}>
                            <FontAwesome name="exclamation-triangle" size={40} color="#fbbf24" />
                        </View>
                        <View style={tw`items-center`}>
                            <Text style={tw`text-center text-lg font-bold`}>ARE YOU SURE?</Text>
                            <Text style={tw`text-center text-sm mt-2`}>
                                If you continue, you allow to give sensitive details that are required.
                            </Text>
                        </View>
                        <View style={tw`flex-row justify-around mt-4`}>
                            <TouchableOpacity style={tw`bg-red-700 p-2 px-6 rounded-md`} onPress={handleCancel}>
                                <Text style={tw`text-white`}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`bg-sky-600 p-2 px-6 rounded-md`} onPress={handleConfirm}>
                                <Text style={tw`text-white`}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}