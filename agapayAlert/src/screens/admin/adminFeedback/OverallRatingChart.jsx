import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import tw from 'twrnc';
import { getOverallRatings } from '@redux/actions/feedbackActions';
import StarRating from 'react-native-star-rating-widget';

const OverallRatingChart = () => {
  const dispatch = useDispatch();
  const { overallRatings, loading, error } = useSelector((state) => state.feedback);
  console.log(overallRatings);

  useEffect(() => {
    dispatch(getOverallRatings());
  }, [dispatch]);

  return (
    <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
      <Text style={tw`text-lg font-bold mb-4`}>Overall Ratings</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={tw`text-red-500`}>{error}</Text>
      ) : overallRatings ? (
        <View>
          <View style={tw`bg-gray-100 p-4 mb-4 rounded-lg`}>
            <Text style={tw`text-base font-bold`}>Total Ratings:</Text>
            <StarRating
              rating={overallRatings.totalRatings}
              starSize={20}
              color="gold"
              disabled={true}
            />
          </View>
          <View style={tw`bg-gray-100 p-4 mb-4 rounded-lg`}>
            <Text style={tw`text-base font-bold`}>Ratings Per Year:</Text>
            {Object.entries(overallRatings.ratingsPerYear).map(([year, rating]) => (
              <View key={year} style={tw`flex-row items-center`}>
                <Text style={tw`text-base`}>{year}: </Text>
                <StarRating
                  rating={rating}
                  starSize={20}
                  color="gold"
                  disabled={true}
                />
              </View>
            ))}
          </View>
          <View style={tw`bg-gray-100 p-4 mb-4 rounded-lg`}>
            <Text style={tw`text-base font-bold`}>Ratings Per Month:</Text>
            {Object.entries(overallRatings.ratingsPerMonth).map(([month, rating]) => (
              <View key={month} style={tw`flex-row items-center`}>
                <Text style={tw`text-base`}>{month}: </Text>
                <StarRating
                  rating={rating}
                  starSize={20}
                  color="gold"
                  disabled={true}
                />
              </View>
            ))}
          </View>
          <View style={tw`bg-gray-100 p-4 mb-4 rounded-lg`}>
            <Text style={tw`text-base font-bold`}>Ratings Per Day:</Text>
            {Object.entries(overallRatings.ratingsPerDay).map(([day, rating]) => (
              <View key={day} style={tw`flex-row items-center`}>
                <Text style={tw`text-base`}>{day}: </Text>
                <StarRating
                  rating={rating}
                  starSize={20}
                  color="gold"
                  disabled={true}
                />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export default OverallRatingChart;