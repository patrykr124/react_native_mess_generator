import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className={`${otherStyles} space-y-4 `}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 flex-row px-4 bg-black-100 border-2 border-black-200 rounded-xl focus:border-secondary items-center">
        <TextInput
        style={{flex: 1, color: "white", fontSize: 16, fontFamily: "Poppins-Regular"}}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default FormField;
