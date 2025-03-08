import { RootView } from "@/components/RootView";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { basePokemonStats, formatWeight, getPokemonArtwork } from "@/functions/pokemon";
import { Card } from "@/components/Card";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";

export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams() as {id: string};
    const {data: pokemon} = useFetchQuery("/pokemon/[id]", {id: params.id})
    const {data: species} = useFetchQuery("/pokemon-species/[id]", {id: params.id})
    const mainType = pokemon?.types?.[0]?.type.name;
    const colorType = mainType ? Colors.light.type[mainType] : Colors.light.tint;
    const types = pokemon?.types ?? [];
    const bio = species?.flavor_text_entries
        ?.find(({language}) => language.name == 'en')
        ?.flavor_text.replaceAll("\n", ". ")
    
    const stats = pokemon?.stats ?? basePokemonStats;

    return <RootView backgroundColor={colorType}>
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
                            <Row gap={16} style={{height: 20}}>
                                {types.map(type => <PokemonType name={type.type.name} key={type.type.name} />)}
                            </Row>

                            {/* About */}
                            <ThemedText variant="subtitle1" style={{color: colorType}}>About</ThemedText>
                            <Row>
                                <PokemonSpec style={{borderStyle: 'solid', borderRightWidth: 1, borderColor:colors.gray.light}} title={formatWeight(pokemon?.weight)} description="Weight" image={require('@/assets/images/weight.png')} />
                                <PokemonSpec style={{borderStyle: 'solid', borderRightWidth: 1, borderColor:colors.gray.light}} title={formatWeight(pokemon?.height)} description="Height" image={require('@/assets/images/rule.png')} />
                                <PokemonSpec title={pokemon?.moves.slice(0, 2).map(m => m.move.name).join('\n')} description="Moves" />
                            </Row>

                            {/* Stats */}
                            <ThemedText>{bio}</ThemedText>
                            <ThemedText variant="subtitle1" style={{color: colorType}}>Base stats</ThemedText>
                            <View style={{alignSelf: 'stretch'}}>
                                {stats.map(stat => <PokemonStat key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={colorType} />)}     
                            </View>
                        </Card>
                    </View>
                    <ThemedText color="white" variant="subtitle2">#{params.id.padStart(3, '0')}</ThemedText>
                </Pressable>
            </Row>
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
        paddingBottom: 20,
        gap: 16,
        alignItems: 'center',
    }
})