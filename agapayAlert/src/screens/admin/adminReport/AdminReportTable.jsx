import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReports, deleteReport, postToFacebook } from 'src/redux/actions/reportActions';
import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Image, Alert, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';
import ReportModal from './ReportModal';
import { sendEmailNotification, sendPushNotification } from '@redux/actions/notificationAction';

export default function AdminReportTable() {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.report);

  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [processingReportId, setProcessingReportId] = useState(null);
  const [notificationType, setNotificationType] = useState('');
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    tier: 'low'
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await dispatch(getReports());
        console.log('Fetched Data:', response);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [dispatch]);

  const handleDelete = async (reportId) => {
    setProcessingReportId(reportId);
    Alert.alert('Processing', 'Deleting report...', [{ text: 'OK' }]);
    try {
      await dispatch(deleteReport(reportId));
      Toast.show({ type: 'success', text1: 'Report deleted successfully' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message || 'Failed to delete report' });
    }
    setProcessingReportId(null);
    setModalVisible(false);
  };

  const handlePostToFacebook = async (reportId) => {
    setProcessingReportId(reportId);
    Alert.alert('Processing', 'Posting report to Facebook...', [{ text: 'OK' }]);
    try {
      await dispatch(postToFacebook(reportId));
      Toast.show({ type: 'success', text1: 'Report posted to Facebook successfully' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message || 'Failed to post report to Facebook' });
    }
    setProcessingReportId(null);
    setModalVisible(false);
  };

  const handleSendEmailNotification = async () => {
    setProcessingReportId(selectedReport._id);
    Alert.alert('Processing', 'Sending email notification...', [{ text: 'OK' }]);
    try {
      const emailData = {
        title: notificationData.title,
        message: notificationData.message,
        reportId: selectedReport._id
      };
      await dispatch(sendEmailNotification(emailData));
      Toast.show({ type: 'success', text1: 'Email notification sent successfully' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message || 'Failed to send email notification' });
    }
    setProcessingReportId(null);
    setNotificationModalVisible(false);
  };

  const handleSendPushNotification = async () => {
    setProcessingReportId(selectedReport._id);
    Alert.alert('Processing', 'Sending push notification...', [{ text: 'OK' }]);
    try {
      const pushData = {
        title: notificationData.title,
        message: notificationData.message,
        confirmation: "verified",
        tier: notificationData.tier,
        reportId: selectedReport._id
      };
      await dispatch(sendPushNotification(pushData));
      Toast.show({ type: 'success', text1: 'Push notification sent successfully' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message || 'Failed to send push notification' });
    }
    setProcessingReportId(null);
    setNotificationModalVisible(false);
  };

  const openNotificationModal = (report, type) => {
    setSelectedReport(report);
    setNotificationType(type);
    setNotificationModalVisible(true);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <View style={tw`bg-gray-100 flex-1`}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal>
          <View>
            {/* Header */}
            <View style={tw`flex-row border-b-2 border-black pb-2 bg-gray-200 justify-center items-center`}>
              <Text style={tw`font-bold text-center p-2 w-20`}>Image</Text>
              <Text style={tw`font-bold text-center p-2 w-20`}>First Name</Text>
              <Text style={tw`font-bold text-center p-2 w-20`}>Last Name</Text>
              <Text style={tw`font-bold text-center p-2 w-20`}>Category</Text>
              <Text style={tw`font-bold text-center p-2 w-20`}>Status</Text>
              <Text style={tw`font-bold text-center p-2 w-32`}>Actions</Text>
            </View>
            {/* Table Rows */}
            <FlatList
              data={reports}
              renderItem={({ item }) => {
                console.log('Rendering item:', item); 
                return (
                  <View style={tw`flex-row border-b-2 border-gray-300 bg-white justify-center items-center`}>
                    {item.images && item.images.length > 0 ? (
                      <Image
                        source={{ uri: item.images[0].url }}
                        style={tw`w-10 h-10 rounded-full p-10 m-2`}
                      />
                    ) : (
                      <Text style={tw`text-center p-2 w-20`}>No Image</Text>
                    )}
                    <Text style={tw`text-center p-2 w-20`}>{truncateText(item.missingPerson.firstname, 7)}</Text>
                    <Text style={tw`text-center p-2 w-20`}>{truncateText(item.missingPerson.lastname, 7)}</Text>
                    <Text style={tw`text-center p-2 w-20`}>{item.category}</Text>
                    <Text style={tw`text-center p-2 w-20`}>{item.status}</Text>
                    <View style={tw`flex-row justify-center items-center w-32`}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedReport(item);
                          setModalVisible(true);
                        }}
                        disabled={processingReportId === item._id}
                      >
                        <Icon name="eye" size={20} color="blue" style={tw`mx-1`} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(item._id)} disabled={processingReportId === item._id}>
                        {processingReportId === item._id ? (
                          <ActivityIndicator size="small" color="red" style={tw`mx-1`} />
                        ) : (
                          <Icon name="trash" size={20} color="red" style={tw`mx-1`} />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handlePostToFacebook(item._id)} disabled={processingReportId === item._id}>
                        {processingReportId === item._id ? (
                          <ActivityIndicator size="small" color="blue" style={tw`mx-1`} />
                        ) : (
                          <Icon name="facebook" size={20} color="blue" style={tw`mx-1`} />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => openNotificationModal(item, 'email')} disabled={item.status !== 'Confirmed' || processingReportId === item._id}>
                        {processingReportId === item._id ? (
                          <ActivityIndicator size="small" color="green" style={tw`mx-1`} />
                        ) : (
                          <Icon name="envelope" size={20} color={item.status === 'Confirmed' ? 'green' : 'gray'} style={tw`mx-1`} />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => openNotificationModal(item, 'push')} disabled={item.status !== 'Confirmed' || processingReportId === item._id}>
                        {processingReportId === item._id ? (
                          <ActivityIndicator size="small" color="green" style={tw`mx-1`} />
                        ) : (
                          <Icon name="bell" size={20} color={item.status === 'Confirmed' ? 'green' : 'gray'} style={tw`mx-1`} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item) => item._id}
            />
          </View>
        </ScrollView>
      )}
      {/* Modal */}
      {selectedReport && (
        <ReportModal
          visible={modalVisible}
          report={selectedReport}
          onClose={() => setModalVisible(false)}
          onDelete={handleDelete}
          onPostToFacebook={handlePostToFacebook}
          processing={processingReportId === selectedReport._id}
        />
      )}
      {/* Notification Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notificationModalVisible}
        onRequestClose={() => setNotificationModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
          <View style={tw`bg-white p-5 rounded-lg w-80`}>
            <Text style={tw`text-xl font-bold mb-4 text-center`}>Send Notification</Text>
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Title"
              value={notificationData.title}
              onChangeText={(text) => setNotificationData({ ...notificationData, title: text })}
            />
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Message"
              value={notificationData.message}
              onChangeText={(text) => setNotificationData({ ...notificationData, message: text })}
            />
            <Picker
              selectedValue={notificationData.tier}
              style={tw`border p-2 mb-4`}
              onValueChange={(itemValue) => setNotificationData({ ...notificationData, tier: itemValue })}
            >
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>
            <View style={tw`flex-row justify-around`}>
              <TouchableOpacity
                onPress={notificationType === 'email' ? handleSendEmailNotification : handleSendPushNotification}
                style={tw`bg-blue-500 p-2 rounded`}
              >
                <Text style={tw`text-white`}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNotificationModalVisible(false)}
                style={tw`bg-gray-500 p-2 rounded`}
              >
                <Text style={tw`text-white`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Toast Notification */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}