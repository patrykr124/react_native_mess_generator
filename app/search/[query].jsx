import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { getVideos, searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: videoData, refetch } = useAppwrite(() => searchPosts(query));
  const { data: videoAll } = useAppwrite(getVideos);
  const [currentVideo, setCurrentVideo] = useState([]);

  useEffect(() => {
    if(!query || query.trim() === ""){
      setCurrentVideo(videoAll);
    } else {
      setCurrentVideo(videoData);
      refetch();
    }
  }, [ query ]);
 

  return (
    <SafeAreaView className="bg-primary  h-full">
      <FlatList
        data={currentVideo}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">
              Search results
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
            <Text className="font-semibold text-white text-2xl">{query}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Try searching for something else"
          />
        )}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
export default Search;
