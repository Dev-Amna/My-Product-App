import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import { scale, verticalScale, moderateScale, s } from 'react-native-size-matters';



const MyButton = ({ btnText, btnWork, giveStyle }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={btnWork}
      style={[styles.button, giveStyle]}
    >
      <Text style={styles.buttonText}>
        {btnText}
      </Text>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
  button: {
    width: "100%",

    borderRadius: 12,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  buttonText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "white",
  }
})
