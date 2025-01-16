import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import { router } from "expo-router";
import {createPost, createVideo} from "../../lib/appwrite";
const create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: "",
    thumbnail: "",
    prompt: "",
  });

  async function videoPicker() {
    const result = await DocumentPicker.getDocumentAsync({
      type: "video/*",
    });
    if (!result.canceled) {
      setForm({ ...form, video: result.assets[0] });
    }
  }

  async function imagePicker() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access your camera roll"
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setForm({ ...form, thumbnail: pickerResult.assets[0] });
    }
  }

  async function submite() {
    if(!form.title || !form.video || !form.thumbnail){
      Alert.alert("Please fill in all fields");
    }
    setUploading(true);
    try{
      Alert.alert("Video uploaded successfully");
      router.replace("/home");
      const data = await createVideo(form.title,form.prompt,form.video.uri,form.thumbnail.uri);
      console.log(data);
      return data
    } catch(err){
      console.log(err);
      Alert.alert(err.message);
    } finally{
      setForm({title: "", video: "", thumbnail: "", prompt: ""});
      setUploading(false);
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-bold font-psemibold">
          Upload video
        </Text>
        <FormField
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
          title="Title"
          placeholder="Enter title"
          otherStyles="mt-6"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity onPress={videoPicker}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{ width: "100%", height: 200 }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary rounded-full flex-row justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail image
          </Text>
          <TouchableOpacity onPress={imagePicker}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-24 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-dashed border-secondary">
                <Image
                  source={icons.upload}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          value={form.prompt}
          onChangeText={(text) => setForm({ ...form, prompt: text })}
          title="Ai prompt"
          placeholder="The prompts for the video"
          otherStyles="mt-7"
        />
        <CustomButton
          loading={uploading}
          title="Submit & publish"
          containerStyle="mt-7"
          handlePress={submite}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default create;
