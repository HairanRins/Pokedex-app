import { Image ,ViewStyle } from "react-native"
import { Card } from "@/components/Card";
import { ThemedText } from "../ThemedText";

type Props = {
    style?: ViewStyle,
    id: number,
    name: string
}

export function PokemonCard({style,id,name}: Props) {
    return <Card style={style}>
        <ThemedText variant="caption" color="medium">#{id.toString().padStart(3, '0')}</ThemedText>
        <Image 
            source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}}
            style={{ width: 72, height: 72 }}
        />
        <ThemedText>{name}</ThemedText>
    </Card>
}