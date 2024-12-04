import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import StarRating from 'react-native-star-rating-widget';
import tw from 'twrnc';
import { createFeedback, getUserFeedback } from '@redux/actions/feedbackActions';
import { Formik } from 'formik';
import * as Yup from 'yup';

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
    ratings: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').required('Rating is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (!userId) {
      Alert.alert('Error', 'You must be logged in to submit feedback.');
      return;
    }

    setLoading(true);
    const feedbackData = {
      userId,
      comment: values.comment,
      ratings: values.ratings,
    };
    console.log('Submitting feedback:', feedbackData); // Log the feedback data
    dispatch(createFeedback(feedbackData))
      .then(() => {
        Alert.alert('Success', 'Your feedback has been submitted successfully.');
        resetForm();
        dispatch(getUserFeedback(userId)); // Refresh the feedback list
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error); // Log the error
        Alert.alert('Error', 'There was an error submitting your feedback. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}
    >
      <ScrollView contentContainerStyle={tw`flex-grow justify-center p-4`}>
        <View style={tw`bg-white rounded-lg shadow-md p-4`}>
          <Text style={tw`text-lg font-bold mb-4`}>Submit Feedback</Text>
          <Formik
            initialValues={{ comment: '', ratings: 0 }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
              <>
                <TextInput
                  style={tw`border p-2 mb-4 rounded-lg`}
                  placeholder="Enter your comment"
                  value={values.comment}
                  onChangeText={handleChange('comment')}
                  onBlur={handleBlur('comment')}
                  multiline
                />
                {touched.comment && errors.comment && (
                  <Text style={tw`text-red-500 mb-2`}>{errors.comment}</Text>
                )}
                <Text style={tw`text-lg mb-2`}>Rate Us:</Text>
                <StarRating
                  rating={values.ratings}
                  onChange={(rating) => setFieldValue('ratings', rating)}
                  starSize={30}
                  color="gold"
                />
                {touched.ratings && errors.ratings && (
                  <Text style={tw`text-red-500 mb-2`}>{errors.ratings}</Text>
                )}
                <TouchableOpacity
                  style={[tw`p-4 mt-4 rounded-lg`, { backgroundColor: '#123f7b' }]}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={tw`text-white text-center`}>Submit</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FeedbackForm;