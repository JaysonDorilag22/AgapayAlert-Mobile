import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReports, deleteReport, postToFacebook } from 'src/redux/actions/reportActions';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

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
    await dispatch(deleteReport(reportId));
    setProcessing(false);
    setModalVisible(false);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Report deleted successfully',
    });
  };

  const handlePostToFacebook = async (reportId) => {
    setProcessing(true);
    await dispatch(postToFacebook(reportId));
    setProcessing(false);
    setModalVisible(false);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Report posted to Facebook successfully',
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.missingPerson.firstname}</Text>
      <Text style={styles.cell}>{item.missingPerson.lastname}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.status}</Text>
      <TouchableOpacity onPress={() => { setSelectedReport(item); setModalVisible(true); }} disabled={processing}>
        <Icon name="eye" size={20} color="blue" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Report Table</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerCell}>First Name</Text>
              <Text style={styles.headerCell}>Last Name</Text>
              <Text style={styles.headerCell}>Category</Text>
              <Text style={styles.headerCell}>Status</Text>
              <Text style={styles.headerCell}>Actions</Text>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Report Details</Text>
              <Text><Text style={styles.bold}>Name:</Text> {selectedReport.missingPerson.firstname} {selectedReport.missingPerson.lastname}</Text>
              <Text><Text style={styles.bold}>Category:</Text> {selectedReport.category}</Text>
              <Text><Text style={styles.bold}>Status:</Text> {selectedReport.status}</Text>
              <Text><Text style={styles.bold}>Reporter:</Text> {selectedReport.reporter}</Text>
              <Text><Text style={styles.bold}>Last Known Location:</Text> {selectedReport.missingPerson.lastKnownLocation}</Text>
              <Text><Text style={styles.bold}>Last Seen:</Text> {selectedReport.missingPerson.lastSeen}</Text>
              {selectedReport.missingPerson.images && selectedReport.missingPerson.images.length > 0 && (
                <ScrollView horizontal>
                  {selectedReport.missingPerson.images.map((image, index) => (
                    <Image key={index} source={{ uri: image.url }} style={styles.image} />
                  ))}
                </ScrollView>
              )}
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => handlePostToFacebook(selectedReport._id)} disabled={processing}>
                  <Icon name="facebook" size={20} color="blue" style={styles.icon} />
                  <Text style={styles.actionText}>Post to Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(selectedReport._id)} disabled={processing}>
                  <Icon name="trash" size={20} color="red" style={styles.icon} />
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} disabled={processing}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
              {processing && <ActivityIndicator size="large" color="#0000ff" />}
            </View>
          </View>
        </Modal>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 8,
    backgroundColor: '#e9ecef',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    minWidth: 100, // Ensure cells are wide enough
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    minWidth: 100, // Ensure cells are wide enough
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionText: {
    textAlign: 'center',
    marginTop: 5,
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});