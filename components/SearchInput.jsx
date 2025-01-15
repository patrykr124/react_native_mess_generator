import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="w-full h-16 flex-row px-4 bg-black-100 border-2 border-black-200 rounded-xl focus:border-secondary items-center space-x-20">
      <TextInput
        style={{
          flex: 1,
          color: "white",
          fontSize: 12,
          fontFamily: "Poppins-Regular",
        }}
        value={query}
        placeholder={"Search video"}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query || query.trim() === "") {
            router.setParams({ query });
          } else if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
export default SearchInput;
