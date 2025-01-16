import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
const VideoCard = ({
  video: {
    title,
    thumbnail,
    creator,
    video,
  },
}) => {
  const [play, setPlay] = useState(false);
  const { username = "Unknown", avatar = icons.defaultAvatar } = creator || {};

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg bg-black-200 p-0.5 justify-center items-center">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-1">
            <Text
              className="text-white font-semibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
                {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            setPlay(false);
          }
        }}
        source={{ uri:video }}
        style={{
          width: '100%', 
          height: 200, 
          borderRadius: 20,
          marginVertical: 20,
        }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        useNativeControls
      />
      ) : (
        <TouchableOpacity activeOpacity={0.6} onPress={() => setPlay(true)} className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full mt-3 rounded-xl"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="cover" />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default VideoCard;
