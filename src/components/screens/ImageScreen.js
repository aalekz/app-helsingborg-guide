import React, { Component } from "react";
import { StyleSheet, Dimensions, Platform, Image } from "react-native";
import PhotoView from "react-native-photo-view";
import PropTypes from "prop-types";
import ViewContainer from "../shared/view_container";
import fetchService from "../../services/FetchService";

const MAX_SCALE = 2.5;
const MIN_SCALE = 0.95;
const FULL_WIDTH = Dimensions.get("window").width;

const noFeaturedImage = require("../../images/no-image-featured-image.png");

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "black",
  },
});

export default class ImageScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    headerRight: null,
    headerStyle: styles.mainContainer,
  }

  constructor(props) {
    super(props);
    this.state = {
      source: null,
    };
  }

  componentDidMount() {
    this.setSource();
  }

  setSource() {
    const { image, guideID } = this.props.navigation.state.params;
    Image.getSize(image.large, (width, height) => { this.setState({ width, height }); });
    const uri = image.large;
    if (typeof uri === "string") {
      fetchService.isExist(uri, guideID).then((exist) => {
        const fullPath = fetchService.getFullPath(uri, guideID);
        if (exist) {
          this.setState({ source: { uri: `file://${fullPath}` } });
        } else {
          this.setState({ source: { uri } });
        }
      });
    } else {
      this.setState({ source: noFeaturedImage });
    }
  }

  loadFile(fullPath) {
    if (Platform.OS === "ios") {
      fetchService.readFile(fullPath).then((data) => {
        this.setState({ source: { uri: `data:image/png;base64,${data}` } });
      });
    } else if (Platform.OS === "android") {
      this.setState({ source: { uri: `file://${fullPath}` } });
    }
  }

  render() {
    const scale = this.state.width / FULL_WIDTH;

    return (
      <ViewContainer style={styles.mainContainer}>
        {
          <PhotoView
            source={this.state.source}
            minimumZoomScale={MIN_SCALE}
            maximumZoomScale={MAX_SCALE}
            androidScaleType="centerInside"
            style={{ flex: 1, width: this.state.width / scale, height: this.state.height / scale }}
          />
        }
      </ViewContainer>
    );
  }
}
