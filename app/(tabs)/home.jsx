import { StatusBar } from "expo-status-bar";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import { images } from "../../constants";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
const home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 ">
            <View className="justify-between flex flex-row mb-6 items-center">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="font-semibold text-white text-2xl">
                  John Doe
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-300 font-pregular mb-3">Latest Videos</Text>
              <Trending posts={[{ id: 1 },{ id: 1 },{ id: 1 },{ id: 1 }] ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subtitle="Try searching for something else"/>
        )}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
export default home;
