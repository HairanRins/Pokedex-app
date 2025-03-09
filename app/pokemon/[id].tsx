import { RootView } from "@/components/RootView";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getPokemonArtwork } from "@/functions/pokemon";
import { Card } from "@/components/Card";
import { PokemonType } from "@/components/PokemonType";

export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams() as {id: string};
    const {data: pokemon} = useFetchQuery("/pokemon/[id]", {id: params.id})
    const mainType = pokemon?.types?.[0]?.type.name;
    const colorType = mainType ? Colors.light.type[mainType] : Colors.light.tint;
    const types = pokemon?.types ?? []
    
    return <RootView style={{backgroundColor: colorType}}>
        <View>
            <Image style={styles.pokeball} source={require("@/assets/images/pokeball-big.png")} width={208} height={208}  />
            <Row style={styles.header}>
                <Pressable onPress={router.back}>
                    <Row gap={8}>
                        <Image source={require("@/assets/images/back.png")} width={32} height={32}/>
                        <ThemedText color="white" variant="headline" style={{textTransform: "capitalize"}}>
                            {pokemon?.name}
                        </ThemedText>
                    </Row>
                    <View style={styles.body}>
                        <Image 
                            style={styles.artwork}
                            source={{uri: getPokemonArtwork(params.id)}}
                        />
                        <Card style={styles.card}>
                            <Row style={{justifyContent: 'center'}} gap={16}>
                                {types.map(type => <PokemonType name={type.type.name} key={type.type.name} />)}
                            </Row>
                        </Card>
                    </View>
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
    },
    artwork: {
        position: 'absolute',
        top: -140,
        alignSelf: "center",
        width: 200,
        height: 200,
        zIndex: 2,
    },
    body: {
        marginTop:144,
    },
    card: {
        paddingHorizontal: 20,
        paddingTop: 56,
    }
})