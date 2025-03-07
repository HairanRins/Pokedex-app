import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
export default function Pokemon() {
    const params = useLocalSearchParams()
    return <view>
        <Text>Pokemon {params.id}</Text>
    </view>
}

