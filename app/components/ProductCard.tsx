import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { DeleteData, getData, updateData } from '../api/ProductApi';
import MyButton from '../Molecules/MyButton';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

const ProductCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchData = async () => {
    const res = await getData();
    setData(res.data || []);
  }

  // Use Effect
  useEffect(() => {
    fetchData();
  }, [])

  const handleDelete = async (id: any) => {
    await DeleteData(id);
    setData(prev => prev.filter(item => item._id !== id));

  }
  const handleUpdate = async (item: any) => {
    setEditItem(item);
    setIsVisible(true);
  }

  const SaveUpdateData = async () => {
    await updateData(editItem);
    setEditItem(null);
    fetchData()
    setIsVisible(false);
  }
  const back = () => {
    router.back()
  }
  const renderItem = ({ item }: any) => {
    return (

      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.imageStyle} />
        <Text>{item.name}</Text>
        <Text>{item.price}</Text>

        <View style={styles.buttonContainer}>
          <MyButton btnText={"Delete !!"} btnWork={() => handleDelete(item._id)} giveStyle={styles.btnStyle} />
          <MyButton btnText={"Update !!"} btnWork={() => handleUpdate(item)} giveStyle={styles.btnStyle2} />
        </View>
      </View>

    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="black" onPress={back} />
        <Text style={styles.heading}>My Products</Text>
        <View></View>
      </View>

      <Modal isVisible={isVisible}>
        {editItem && (
          <View style={styles.inputContainer}>
            <TextInput
              value={editItem.name}
              onChangeText={(text) =>
                setEditItem(prev => ({ ...prev, name: text }))
              }
              style={styles.inputStyle}
            />

            <TextInput
              value={String(editItem.price)}
              onChangeText={(text) =>
                setEditItem(prev => ({ ...prev, price: Number(text) }))
              }
              style={styles.inputStyle}
            />

            <TextInput
              value={editItem.image}
              onChangeText={(text) =>
                setEditItem(prev => ({ ...prev, image: text }))
              }
              style={styles.inputStyle}
            />


            <MyButton btnText={"Save Update!"} btnWork={SaveUpdateData} />
          </View>
        )}
      </Modal>

      <FlatList

        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ProductCard

const styles = StyleSheet.create({
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
  inputContainer: {
    gap: moderateScale(12),
    backgroundColor: "white",
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(12),
  },
  btnStyle: {
    backgroundColor: "red",
    maxWidth: moderateScale(100),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  btnStyle2: {
    maxWidth: moderateScale(100),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: moderateScale(12),
  },
  card: {
    marginBottom: moderateScale(20),
    alignItems: "center",
    width: moderateScale(300),
    backgroundColor: "white",
    gap: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    borderRadius: moderateScale(12),
    elevation: 5,
  },
  imageStyle: {
    width: moderateScale(200),
    height: moderateScale(100),
    borderRadius: moderateScale(12),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: moderateScale(10),
  },
  inputStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(14),
  },
});
