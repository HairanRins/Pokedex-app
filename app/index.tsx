import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { ThemedText } from "@/components/ThemedText";
import { getPokemonId } from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const colors = useThemeColors();
  const {data} = useFetchQuery('/pokemon?limit=21');
  const pokemons = data?.results ?? []
  return (
    <>
      <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
        <View style={styles.header}>
          <Image source={require("@/assets/images/pokeball.png")}width={24} height={24} />  
          <ThemedText variant="headline" color="light">Pokédex</ThemedText>
        </View>
        <Card style={styles.body}>
          <FlatList 
            data={pokemons}
            numColumns={3}
            contentContainerStyle={[styles.gridGap, styles.list]}
            columnWrapperStyle={styles.gridGap}
            renderItem={({ item }) => ( 
                <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{ flex: 1/3}}/>
            )} 
            keyExtractor={(item) => item.url}
          />
        </Card>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create (
  {
    container : {
      flex: 1,
      padding:4,
      // justifyContent: "center",
      // alignItems: "center",
    },
    header: {
      flexDirection : 'row',
      alignItems: 'center',
      gap: 16,
      padding: 12,
    },
    body: {
      flex: 1,
    },
    gridGap: {
      gap:8,
    },
    list: {
      padding: 12,
    }
  }
)

// alternative
// const styles = {
  // container : {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#00ffae",
    // flex: 1
    // padding: 24,
  // }
// }
