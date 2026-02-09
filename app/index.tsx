
import { StyleSheet, Text, } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import MyButton from "./Molecules/MyButton";
import { moderateScale } from "react-native-size-matters";
import ProductCard from "./components/ProductCard";

export default function Index() {
  const next = () => {
    router.push("/components/ProductFrom");
  }
  return (
    <SafeAreaView style={stlyes.container}>
      <Text style={stlyes.heading} >My Product App</Text>
      <ProductCard />
      <MyButton btnText={"Add Product!"} btnWork={() => next()} />
    </SafeAreaView>
  );
}

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 23,
    gap: 40
  },
  heading: {
    fontSize: moderateScale(25),
    fontWeight: "bold"
  },
})