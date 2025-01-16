import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import VideoCard from "../../components/VideoCard";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserVideo, logOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const profile = () => {
  const { user, setuser, isLoading, setisLoading, setIsLoggedIn } =
    useGlobalContext();

  const { data: userData } = useAppwrite(() =>
    getUserVideo(user?.documents?.[0].$id || user.$id)
  );



  async function handleLogOut() {
    try {
      await logOut();
      setuser(null);
      setIsLoggedIn(false);
      router.replace("/sign-in");
      console.log("logOut");
    } catch (error) {
      console.log("logOut", error);
    }
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
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255, 255, 255, 0.1)",
              paddingBottom: "20",
            }}
          >
            <TouchableOpacity
              onPress={handleLogOut}
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
              containStyle=""
              titleStyle="text-lg"
            />
            <View
              style={{
                marginTop: "5",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "40",
              }}
            >
              <InfoBox
                title={userData.length || 0}
                subtitle="Posts"
                containStyle="mr-20"
                titleStyle="text-xl"
              />
              <InfoBox title="1.2k" subtitle="Followers" titleStyle="text-xl" />
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
