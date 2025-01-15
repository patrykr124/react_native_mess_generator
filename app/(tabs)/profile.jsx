import { StatusBar } from "expo-status-bar";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import VideoCard from "../../components/VideoCard";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserVideo } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const profile = () => {
  const { user, setuser, isLoading, setIsLoading } = useGlobalContext();

  const { data: userData } = useAppwrite(() =>
    getUserVideo(user.documents[0].$id)
  );

  function logOut() {
    setuser({});
  }

  return (
    <SafeAreaView className="bg-primary  h-full">
      <FlatList
        data={userData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20",
              marginTop: "20",
              paddingHorizontal: "10",
            }}
          >
            <TouchableOpacity
              onPress={logOut}
              style={{
                width: "100%",
                alignItems: "flex-end",
                display: "flex",
                marginBottom: "20",
              }}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6 "
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{
                width: "64",
                height: "64",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: user?.documents[0].avatar }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containStyle="mt-5"
              titleStyle="text-lg"
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={user?.username}
                containStyle="mt-5"
                titleStyle="text-lg"
              />
               <InfoBox
                title={user?.username}
                containStyle="mt-5"
                titleStyle="text-lg"
              />
            </View>
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
export default profile;
