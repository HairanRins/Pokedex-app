import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

export default function Index() {
  const colors = useThemeColors();
  return (
    <>
      <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
        <View style={styles.header}>
          <Image source={require("@/assets/images/pokeball.png")}width={24} height={24} />  
          <ThemedText variant="headline" color="light">Pokédex</ThemedText>
        </View>
        <Card style={styles.body}></Card>  
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
