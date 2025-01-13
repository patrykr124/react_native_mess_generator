import { View, Text, TouchableOpacity,  } from 'react-native'
const CustomButton = ({title, handlePress, containerStyle, textStyles, isLoading}) => {
  return (
    <TouchableOpacity onPress={handlePress} disabled={isLoading} activeOpacity={0.7} className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle}  ${isLoading ? "opacity-50" : ""}`}>
      <Text className={`${textStyles} text-primary font-psemibold text-lg`}>{title}</Text>
    </TouchableOpacity>
  )
}
export default CustomButton