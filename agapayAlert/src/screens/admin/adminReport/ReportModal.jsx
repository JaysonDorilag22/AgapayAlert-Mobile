import React from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import Video from 'react-native-video';
import tw from "twrnc";

const ReportModal = ({
  visible,
  report,
  onClose,
  onDelete,
  onPostToFacebook,
  processing,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
        <View style={tw`bg-white p-5 rounded-lg w-full m-40`}>
          <TouchableOpacity
            onPress={onClose}
            disabled={processing}
            style={tw`absolute top-4 right-4`}
          >
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold mb-4 text-center`}>
            Report Details
          </Text>
          <ScrollView style={tw`mb-4`}>
            {report.missingPerson.images &&
              report.missingPerson.images.length > 0 && (
                <View style={tw`mb-4 items-center`}>
                  <Image
                    source={{ uri: report.missingPerson.images[0].url }}
                    style={tw`w-40 h-40 rounded-full`}
                  />
                </View>
              )}
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Name:</Text>
              <Text>
                {report.missingPerson.firstname} {report.missingPerson.lastname}
              </Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Alias:</Text>
              <Text>{report.missingPerson.alias}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Date of Birth:</Text>
              <Text>
                {new Date(
                  report.missingPerson.dateOfBirth
                ).toLocaleDateString()}
              </Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Age:</Text>
              <Text>{report.missingPerson.age}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Assigned Sex at Birth:</Text>
              <Text>{report.missingPerson.assignedSexAtBirth}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Gender Identity:</Text>
              <Text>{report.missingPerson.genderIdentity}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Height:</Text>
              <Text>{report.missingPerson.height}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Weight:</Text>
              <Text>{report.missingPerson.weight}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Race or Nationality:</Text>
              <Text>{report.missingPerson.raceOrNationality}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Eye Color:</Text>
              <Text>{report.missingPerson.eyeColor}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Current Hair Color:</Text>
              <Text>{report.missingPerson.currentHairColor}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Dyed Hair Color:</Text>
              <Text>{report.missingPerson.dyedHairColor ? "Yes" : "No"}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Wears Contact Lenses:</Text>
              <Text>
                {report.missingPerson.wearsContactLenses ? "Yes" : "No"}
              </Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Blood Type:</Text>
              <Text>{report.missingPerson.bloodType}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Scars or Marks:</Text>
              <Text>{report.missingPerson.scarsOrMarks}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Prosthetics or Implants:</Text>
              <Text>{report.missingPerson.prostheticsOrImplants}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Last Known Clothing:</Text>
              <Text>{report.missingPerson.lastKnownClothing}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Last Known Location:</Text>
              <Text>{report.missingPerson.lastKnownLocation}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Last Seen:</Text>
              <Text>
                {new Date(report.missingPerson.lastSeen).toLocaleDateString()}
              </Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Cause of Disappearance:</Text>
              <Text>{report.missingPerson.causeOfDisappearance}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Medication:</Text>
              <Text>{report.missingPerson.medication}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Birth Defects:</Text>
              <Text>{report.missingPerson.birthDefects}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Contact Number:</Text>
              <Text>{report.missingPerson.contactNumber}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Social Media Account:</Text>
              <Text>{report.missingPerson.socialMediaAccount}</Text>
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold`}>Reward:</Text>
              <Text>{report.missingPerson.reward}</Text>
            </View>
            {/* {report.missingPerson.video && report.missingPerson.video.url && (
              <View style={tw`mb-4`}>
                <Text style={tw`font-bold`}>Video:</Text>
                <Video
                  source={{ uri: report.missingPerson.video.url }}
                  style={tw`w-full h-40`}
                  controls
                  onError={(e) => console.log('Video Error:', e)}
                />
              </View>
            )} */}
          </ScrollView>
          <View style={tw`flex-col justify-around mt-4`}>
            <TouchableOpacity
              onPress={() => onPostToFacebook(report._id)}
              disabled={processing}
              style={tw`flex-row items-center bg-blue-500 p-2 rounded mb-2`}
            >
              <Icon name="facebook" size={20} color="white" />
              <Text style={tw`flex-1 text-center text-white`}>
                Post to Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Push Notification")}
              disabled={processing}
              style={tw`flex-row items-center bg-green-500 p-2 rounded mb-2`}
            >
              <Icon name="bell" size={20} color="white" />
              <Text style={tw`flex-1 text-center text-white`}>
                Push Notification
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Send SMS")}
              disabled={processing}
              style={tw`flex-row items-center bg-yellow-500 p-2 rounded mb-2`}
            >
              <Icon name="envelope" size={20} color="white" />
              <Text style={tw`flex-1 text-center text-white`}>Send SMS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(report._id)}
              disabled={processing}
              style={tw`flex-row items-center mb-2 border border-red-500 p-2 rounded`}
            >
              <Icon name="trash" size={20} color="red" />
              <Text style={tw`flex-1 text-center text-red-500`}>Delete</Text>
            </TouchableOpacity>
          </View>
          {processing && (
            <ActivityIndicator size="large" color="#0000ff" style={tw`mt-4`} />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;
