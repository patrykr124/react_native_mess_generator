import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  
}) => {

  return (
    <View className="w-full h-16 flex-row px-4 bg-black-100 border-2 border-black-200 rounded-xl focus:border-secondary items-center space-x-20">
      <TextInput
        style={{
          flex: 1,
          color: "white",
          fontSize: 12,
          fontFamily: "Poppins-Regular",
        }}
        value={value}
        placeholder={"Search video"}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
        <TouchableOpacity>
          <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
    </View>
  );
};
export default SearchInput;
