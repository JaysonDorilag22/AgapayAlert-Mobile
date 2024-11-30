import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReports, deleteReport, postToFacebook } from 'src/redux/actions/reportActions';
import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';
import ReportModal from './ReportModal';

export default function AdminReportTable() {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.report);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  const handleDelete = async (reportId) => {
    setProcessing(true);
    try {
      await dispatch(deleteReport(reportId));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Report deleted successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete report',
      });
    } finally {
      setProcessing(false);
      setModalVisible(false);
    }
  };

  const handlePostToFacebook = async (reportId) => {
    setProcessing(true);
    try {
      await dispatch(postToFacebook(reportId));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Report posted to Facebook successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to post report to Facebook',
      });
    } finally {
      setProcessing(false);
      setModalVisible(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const renderItem = ({ item }) => (
    <View style={tw`flex-row border-b border-gray-300 py-2 bg-white justify-center items-center`}>
      {item.missingPerson.images && item.missingPerson.images.length > 0 ? (
        <Image source={{ uri: item.missingPerson.images[0].url }} style={tw`w-12 h-12 rounded-full self-center`} />
      ) : (
        <Text style={tw`flex-1 text-center p-2 min-w-25`}>No Image</Text>
      )}
      <Text style={tw`flex-1 text-center p-2 min-w-25`}>{truncateText(item.missingPerson.firstname, 7)}</Text>
      <Text style={tw`flex-1 text-center p-2 min-w-25`}>{truncateText(item.missingPerson.lastname, 7)}</Text>
      <Text style={tw`flex-1 text-center p-2 min-w-25`}>{item.category}</Text>
      <Text style={tw`flex-1 text-center p-2 min-w-25`}>{item.status}</Text>
      <TouchableOpacity onPress={() => { setSelectedReport(item); setModalVisible(true); }} disabled={processing}>
        <Icon name="eye" size={20} color="blue" style={tw`mx-2`} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`bg-gray-100`}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal>
          <View>
            <View style={tw`flex-row border-b-2 border-black pb-2 bg-gray-200`}>
              <Text style={tw`flex-1 font-bold text-center p-2 min-w-25`}>Image</Text>
              <Text style={tw`flex-1 font-bold text-center p-2 min-w-25`}>First Name</Text>
              <Text style={tw`flex-1 font-bold text-center p-2 min-w-25`}>Last Name</Text>
              <Text style={tw`flex-1 font-bold text-center p-2 min-w-25`}>Category</Text>
              <Text style={tw`flex-1 font-bold text-center p-2 min-w-25`}>Status</Text>
              <Text style={tw`flex-1 font-bold text-center p-2 min-w-25`}>Actions</Text>
            </View>
            <FlatList
              data={reports}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </View>
        </ScrollView>
      )}

      {selectedReport && (
        <ReportModal
          visible={modalVisible}
          report={selectedReport}
          onClose={() => setModalVisible(false)}
          onDelete={handleDelete}
          onPostToFacebook={handlePostToFacebook}
          processing={processing}
        />
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}