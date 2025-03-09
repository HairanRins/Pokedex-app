import { RootView } from "@/components/RootView";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams() as {id: string};
    const {data: pokemon} = useFetchQuery("/pokemon/[id]", {id: params.id})
    const mainType = pokemon?.types?.[0]?.type.name;
    const colorType = mainType ? Colors.light.type[mainType] : Colors.light.tint;
    console.log({mainType, colorType});
    
    return <RootView style={{backgroundColor: colorType}}>
        <View>
            <Image style={styles.pokeball} source={require("@/assets/images/pokeball-big.png")} width={208} height={208}  />
            <Row style={styles.header}>
                <Pressable onPress={router.back}>
                    <Row gap={8}>
                        <Image source={require("@/assets/images/back.png")} width={32} height={32}/>
                        <ThemedText color="white" variant="headline">
                            {pokemon?.name}
                        </ThemedText>
                    </Row>
                    <ThemedText color="white" variant="subtitle2">#{params.id.padStart(3, '0')}</ThemedText>
                </Pressable>
            </Row>
            <Text>Pokemon {params.id}</Text>
        </View>
        
    </RootView>
}

const styles = StyleSheet.create({
    header: {
        margin:20,
        justifyContent: 'space-between',

    },
    pokeball: {
        opacity: .1,
        position: 'absolute',
        right: 8,
        top: 8,
    }
})