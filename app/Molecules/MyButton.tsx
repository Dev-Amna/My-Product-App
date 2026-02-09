import React from 'react'
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const MyButton = ({
  btnText,
  btnWork,
  giveStyle,
  variant = "primary",
  loading = false,
  full = false
}: any) => {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={btnWork}
      disabled={loading}
      style={[
        styles.button,
        styles[variant],
        full && { width: "100%" },
        giveStyle
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{btnText}</Text>
      )}
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
  button: {
    minWidth: scale(110),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(18),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  buttonText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#fff",
  },

  primary: {
    backgroundColor: "#2563eb",
  },

  danger: {
    backgroundColor: "#dc2626",
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2563eb",
  },
})
