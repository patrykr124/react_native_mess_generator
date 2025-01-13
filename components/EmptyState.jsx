import { Image, Text, View } from "react-native";
import { images } from "../constants";
const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4 mb-20">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-semibold text-white text-xl text-center mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
    </View>
  );
};
export default EmptyState;
