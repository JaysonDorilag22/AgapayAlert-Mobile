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

  return (
    <View style={tw`bg-gray-100 flex-1`}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal>
          <View>
            {/* Header */}
            <View style={tw`flex-row border-b-2 border-black pb-2 bg-gray-200 justify-center items-center`}>
              <Text style={tw`font-bold text-center p-2 w-24`}>Image</Text>
              <Text style={tw`font-bold text-center p-2 w-24`}>First Name</Text>
              <Text style={tw`font-bold text-center p-2 w-24`}>Last Name</Text>
              <Text style={tw`font-bold text-center p-2 w-24`}>Category</Text>
              <Text style={tw`font-bold text-center p-2 w-24`}>Status</Text>
              <Text style={tw`font-bold text-center p-2 w-32`}>Actions</Text>
            </View>
            {/* Table Rows */}
            <FlatList
              data={reports}
              renderItem={({ item }) => (
                <View style={tw`flex-row border-b-2 border-gray-300 bg-white justify-center items-center`}>
                  {/* Image */}
                  {item.missingPerson.images && item.missingPerson.images.length > 0 ? (
                    <Image
                      source={{ uri: item.missingPerson.images[0].url }}
                      style={tw`w-12 h-12 rounded-full p-10 m-5`}
                    />
                  ) : (
                    <Text style={tw`text-center p-2 w-24`}>No Image</Text>
                  )}
                  {/* First Name */}
                  <Text style={tw`text-center p-2 w-24`}>{truncateText(item.missingPerson.firstname, 7)}</Text>
                  {/* Last Name */}
                  <Text style={tw`text-center p-2 w-25`}>{truncateText(item.missingPerson.lastname, 7)}</Text>
                  {/* Category */}
                  <Text style={tw`text-center p-2 w-24`}>{item.category}</Text>
                  {/* Status */}
                  <Text style={tw`text-center p-2 w-24`}>{item.status}</Text>
                  {/* Actions */}
                  <View style={tw`flex-row justify-center items-center w-32`}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedReport(item);
                        setModalVisible(true);
                      }}
                      disabled={processing}
                    >
                      <Icon name="eye" size={20} color="blue" style={tw`mx-2`} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item._id)} disabled={processing}>
                      <Icon name="trash" size={20} color="red" style={tw`mx-2`} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePostToFacebook(item._id)} disabled={processing}>
                      <Icon name="facebook" size={20} color="blue" style={tw`mx-2`} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
          processing={processing}
        />
      )}
      {/* Toast Notification */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}
