import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { pushData } from '../api/ProductApi';
import MyButton from '../Molecules/MyButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';

const ProductFrom = () => {
  const [data, setData] = useState({ name: "", price: 0, image: "" });

  const PrintValue = async () => {

    if (!data.name || !data.price || !data.image) {
      Alert.alert("Please fill all the inputs");
      return; // stop execution if fields are empty
    }

    try {
      const giveData = await pushData(data)
      console.log("Api response like this : ", giveData);
      setData({ name: "", price: 0, image: "" });
    }
    catch (error) {
      console.log("Error Shown", error);
      Alert.alert("Failed to add product!!");
    }



  }
  const back = () => {
    router.back();
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="black" onPress={back} />
        <Text style={styles.heading}>Add Product</Text>
        <View></View>
      </View>
      <View style={styles.formContainer}>
        <TextInput placeholder='Enter Product Name' value={data.name} onChangeText={(text) => setData((prev) => ({ ...prev, name: text }))} style={styles.inputStyle} />
        <TextInput placeholder='Enter Product Price' value={data.price.toString()} onChangeText={(text) => setData((prev) => ({ ...prev, price: Number(text) }))} style={styles.inputStyle} />
        <TextInput placeholder='Enter Product Image URL' value={data.image} onChangeText={(text) => setData((prev) => ({ ...prev, image: text }))} style={styles.inputStyle} />
        <MyButton btnText={"Add Product!"} btnWork={() => { PrintValue() }} />
      </View>
      <View></View>
    </View>
  )
}

// export default ProductFrom

export default ProductFrom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
     paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(50),
    gap: 40
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 12,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 12,
    alignSelf: "center"
  },

  inputStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,

  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  heading: {
    fontSize: moderateScale(25),
    fontWeight: "bold"
  },

});