import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFeedback, updateFeedback, deleteFeedback } from '@redux/actions/feedbackActions';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import NavbarWithSubmenu from '@components/NavigationBar';
import StarRating from 'react-native-star-rating-widget';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedbackForm from '@components/FeedbackForm';

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);
  const { userFeedback, loading, error } = useSelector((state) => state.feedback);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    dispatch(getUserFeedback(userId));
  }, [dispatch, userId]);

  const handleEdit = (feedback) => {
    setCurrentFeedback(feedback);
    setComment(feedback.comment);
    setRatings(feedback.ratings);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    const updatedFeedback = {
      ...currentFeedback,
      comment,
      ratings,
    };
    dispatch(updateFeedback(currentFeedback._id, updatedFeedback)).then(() => {
      setModalVisible(false);
      dispatch(getUserFeedback(userId));
    });
  };

  const handleDelete = (feedbackId) => {
    dispatch(deleteFeedback(feedbackId)).then(() => {
      dispatch(getUserFeedback(userId));
    });
  };

  return (
    <View style={tw`flex-1`}>
      <NavbarWithSubmenu navigation={navigation} />
      <ScrollView contentContainerStyle={tw`p-4`}>
        <FeedbackForm />
        <Text style={tw`text-lg font-bold mb-4 mt-8`}>Your Feedback</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#123f7b" />
        ) : error ? (
          <Text style={tw`text-red-500`}>{error}</Text>
        ) : userFeedback.length > 0 ? (
          userFeedback
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((feedback, index) => (
              <View
                key={feedback._id || `feedback-${index}`}
                style={tw`bg-gray-100 p-4 mb-4 rounded-lg`}
              >
                {feedback.comment && (
                  <>
                    <Text style={tw`text-base font-bold`}>Comment:</Text>
                    <Text style={tw`text-base mb-2`}>{feedback.comment}</Text>
                  </>
                )}
                {feedback.ratings && (
                  <>
                    <Text style={tw`text-base font-bold`}>Ratings:</Text>
                    <Text style={tw`text-base`}>{feedback.ratings}</Text>
                  </>
                )}
                <View style={tw`flex-row justify-end mt-2`}>
                  <TouchableOpacity onPress={() => handleEdit(feedback)} style={tw`mr-4`}>
                    <Icon name="edit" size={20} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(feedback._id)}>
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
        ) : (
          <Text style={tw`text-base text-center`}>No feedback available</Text>
        )}
      </ScrollView>

      {currentFeedback && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-6 rounded-lg w-11/12`}>
              <Text style={tw`text-lg font-bold mb-4`}>Edit Feedback</Text>
              <TextInput
                style={tw`border p-2 mb-4 rounded-lg`}
                placeholder="Enter your comment"
                value={comment}
                onChangeText={setComment}
                multiline
              />
              <Text style={tw`text-lg mb-2`}>Rate Us:</Text>
              <StarRating
                rating={ratings}
                onChange={setRatings}
                starSize={30}
                color="gold"
              />
              <View style={tw`flex-row justify-end mt-4`}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`mr-4`}>
                  <Icon name="times" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUpdate}>
                  <Icon name="check" size={20} color="green" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
