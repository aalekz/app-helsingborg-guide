// @flow
import { StyleSheet } from "react-native";
import { Colors } from "../../../../styles";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.transparent,
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  label: {
    color: Colors.white,
    fontFamily: "Arial",
    fontSize: 20,
    position: "absolute",
  },
  marker: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
