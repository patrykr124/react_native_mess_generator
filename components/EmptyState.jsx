import { Image, Text, View } from "react-native";
import { images } from "../constants";
import CustomButton  from "./CustomButton";
const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4 ">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-semibold text-white text-xl text-center mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <CustomButton title="Create video" handlePress={() => router.push("/create")} containerStyle="my-5 w-full" />
    </View>
  );
};
export default EmptyState;
