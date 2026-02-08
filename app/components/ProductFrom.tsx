import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { pushData } from '../api/ProductApi';
import MyButton from '../Molecules/MyButton';

const ProductFrom = () => {
  const [data, setData] = useState({ name: "", price: 0, image: "" });

  const PrintValue = async () => {
    const giveData = await pushData(data)
    console.log("Api respon like this : ", giveData);
  }

  return (
    <View style={styles.formContainer}>
      <TextInput placeholder='Enter Product Name' value={data.name} onChangeText={(text) => setData((prev) => ({ ...prev, name: text }))} style={styles.inputStyle} />
      <TextInput placeholder='Enter Product Price' value={data.price.toString()} onChangeText={(text) => setData((prev) => ({ ...prev, price: Number(text) }))} style={styles.inputStyle} />
      <TextInput placeholder='Enter Product Image URL' value={data.image} onChangeText={(text) => setData((prev) => ({ ...prev, image: text }))} style={styles.inputStyle} />
      <MyButton btnText={"Add Product!"} btnWork={() => { PrintValue() }} />
    </View>
  )
}

// export default ProductFrom

export default ProductFrom;

const styles = StyleSheet.create({
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
    
  }
});