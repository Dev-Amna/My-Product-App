
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale } from 'react-native-size-matters';
import { DeleteData, getData, updateData } from '../api/ProductApi';
import MyButton from '../Molecules/MyButton';

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
  }, [data])

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
    fetchData();
    setIsVisible(false);
  }
  
  const Canal = () => {
    setIsVisible(false);
  }
  const renderItem = ({ item }: any) => {
    return (

      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.imageStyle} />

        <View style={styles.info}>
          <Text style={styles.nameProduct}>{item.name} </Text>
          <Text style={styles.price}>{item.price} $</Text>
      

        <View style={styles.buttonContainer}>
          <MyButton btnText={"Delete !!"} btnWork={() => handleDelete(item._id)} giveStyle={styles.btnStyle} />
          <MyButton btnText={"Update !!"} btnWork={() => handleUpdate(item)} giveStyle={styles.btnStyle2} />
        </View>
          </View>
      </View>

    )
  }
  return (
    <SafeAreaView style={styles.container}>
      

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


            <View style={styles.buttonContainer}>
              <MyButton btnText={"Canal"} btnWork={Canal} giveStyle={styles.btnStyle} />
              <MyButton btnText={"Save Update!"} btnWork={SaveUpdateData} giveStyle={styles.btnStyle2} />

            </View>
          </View>
        )}
      </Modal>

      <FlatList

        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>NO PRODUCT FOUND</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ProductCard

const styles = StyleSheet.create({
 info : {
   paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
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
    maxWidth: moderateScale(120),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  btnStyle2: {
    maxWidth: moderateScale(150),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  
  nameProduct: {
    fontSize: moderateScale(25),
    fontWeight: "bold",

  },
  price: {
    marginTop: 4,
    fontSize: moderateScale(14),
    color: "#666",

  }

  ,
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: moderateScale(12),
  },
  card: {
    marginBottom: moderateScale(20),
   
    width: moderateScale(300),
    backgroundColor: "white",
    gap: moderateScale(12),
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
    borderRadius: moderateScale(12),
    elevation: 5,
  },
  imageStyle: {
    width : "100%",
    height: moderateScale(200),
    borderRadius: moderateScale(12),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: scale(12),
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
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(50),
  },
  emptyText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#999",
  }

});
