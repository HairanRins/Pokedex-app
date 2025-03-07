import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link href="/about">A propos</Link>
        <Link href={{pathname: '/pokemon/[id]', params : {id:3}}}>Pokemon 3</Link>
      </SafeAreaView>
    </>
  );
}

const styles = {
  container : {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#00ffae",
    // flex: 1
    // padding: 24,
  }
}

// alternative 
// const styles = StyleSheet.create (
//   {
//     container : {
//       // flex: 1,
//       // justifyContent: "center",
//       // alignItems: "center",
//       backgroundColor: "#00ffae",
//       padding: 24,
//     }
//   }
// )
