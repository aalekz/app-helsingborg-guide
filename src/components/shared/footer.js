/**
 * Created by msaeed on 2017-02-04.
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default class Footer extends Component {
  render() {
    return <View style={[styles.footer, this.props.style]}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  footer: {
    minHeight: 60,
    width: Dimensions.get("window").width,
    alignItems: "stretch",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 0,
    zIndex: 20000,
  },
});
