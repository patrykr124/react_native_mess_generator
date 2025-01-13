import { View, Text, FlatList } from 'react-native'
const Trending = ({posts}) => {
  return (
    <FlatList data={posts} keyExtractor={(item) => item.$id} renderItem={({item}) => <Text className="text-white text-3xl">{item.id}</Text>} horizontal>

    </FlatList>
  )
}
export default Trending