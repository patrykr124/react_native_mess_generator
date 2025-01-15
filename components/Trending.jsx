import { ResizeMode, Video } from "expo-av";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.8,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.8,
  },
};

const TrandingItem = ({ item, activeItem }) => {
  const [play, setplay] = useState(false);
 
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setplay(false);
            }
          }}
          source={{ uri: item.video }}
          style={{
            width: 208, 
            height: 288, 
            borderRadius: 35,
            overflow: 'hidden',
            boxShadow: 'black',
            shadowOpacity: 0.4,
            marginVertical: 20,
          }}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          useNativeControls
        />
       
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setplay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg shadow-black/40 my-5 "
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending = ({ posts }) => {
  const [active, setActive] = useState(posts[0]);

  const viewAbleItemsChange = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].key);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrandingItem item={item} activeItem={active} />
      )}
      horizontal
      onViewableItemsChanged={viewAbleItemsChange}
      contentOffset={{ x: 50 }}
      viewabilityConfig={{ itemVisiblePercentThreshold: 85 }}
    ></FlatList>
  );
};
export default Trending;
