import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getLatestVideos, getVideos } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
const home = () => {
  const [refreshing, setrefreshing] = useState(false);
  const { data: videoData, refetch } = useAppwrite(getVideos);
  const { data: LatestData } = useAppwrite(getLatestVideos);
  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setrefreshing(true);
    await refetch();
    setrefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary  h-screen">
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 ">
            <View className="justify-between flex flex-row mb-6 items-center">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="font-semibold text-white text-2xl">
                  {user?.documents?.[0].username}
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
              <Text className="text-gray-300 font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={LatestData} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Try searching for something else"
          />
        )}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
export default home;
