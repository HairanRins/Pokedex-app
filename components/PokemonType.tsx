import { ThemedText } from "@/components/ThemedText"
import { Colors } from "@/constants/Colors"
import { View, ViewStyle } from "react-native"

type Props = {
    name: keyof (typeof Colors)["light"]["type"]
}
export function PokemonType({name}: Props) {
    return <View style={[rootStyle, {backgroundColor: Colors.light.type[name]}]}>
        <ThemedText color="white" variant="subtitle3" style={{textTransform: "capitalize"}}>{name}</ThemedText>
    </View>
}

const rootStyle = {
    flex: 0,
    height: 20,
    paddingHorizontal:8,
    borderRadius: 8,
} satisfies ViewStyle