// @flow

import React from "react";
import { View, Text, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import Swiper from "react-native-swiper";
import ImageView from "../ImageView";
import styles from "./style";
import SharingService from "../../../services/SharingService";

const MAX_IMAGE_HEIGHT = Dimensions.get("window").height * 0.32;

type Props = {
  contentObject: ContentObject,
  imageIndex: number,
  guideType: GuideType,
  navigation: any,
  onSwiperIndexChanged: (newIndex: number) => (void)
}

function goToImageView(image, /* guideID, */ navigation: any) {
  const { navigate } = navigation;
  navigate("ImageScreen", { image/* , guideID */ }); // TODO: Redesign ImageScreen.
}

function displayImagesSlider(images: Images[], navigation: any, onSwiperIndexChanged: (newIndex: number) => (void)) {
  const slides = images.map((image, index) => (
    <View key={image.thumbnail || index}>
      <TouchableWithoutFeedback onPress={() => goToImageView(image/* , this.state.guideID offline stuff */, navigation)}>
        <View>
          <ImageView source={{ uri: image.large }} style={styles.image} resizeMode="cover" />
          {/* guideID={this.state.guideID} */}
        </View>
      </TouchableWithoutFeedback>
    </View>
  ));

  return (
    <Swiper
      style={styles.imagesSlider}
      height={MAX_IMAGE_HEIGHT}
      dotColor="white"
      activeDotColor="#D35098"
      showsButtons={false}
      loop={false}
      onIndexChanged={onSwiperIndexChanged}
    >
      {slides}
    </Swiper>
  );
}

function displayID(searchableID: string) {
  const idText = (
    <View style={styles.idContainer}>
      <Text style={styles.idText}>
        {`ID #${searchableID}`}
      </Text>
    </View>
  );
  return idText;
}

function displayTitle(title: string, searchableID: string, guideType: GuideType) {
  return (
    <View>
      <View style={styles.titleContainer} >
        <Text style={styles.title}>{title}</Text>
      </View >
      {guideType === "guide" ? displayID(searchableID) : null}
    </View >
  );
}

function displayText(description?: string) {
  return (
    <View style={styles.articleContainer}>
      <Text style={styles.article}>{description}</Text>
    </View>
  );
}

const ObjectView = (props: Props) => (
  <View style={styles.viewContainer}>
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        {displayImagesSlider(props.contentObject.images, props.navigation, props.onSwiperIndexChanged)}
        <View style={styles.shareBtn}>
          {SharingService.showShareButton(props.contentObject.title, props.imageIndex, this)}
        </View>
      </View>
      <View style={styles.bodyContainer}>
        {displayTitle(props.contentObject.title, props.contentObject.searchableId, props.guideType)}
        {/* this.displayButtonsBar() */}
        {props.contentObject.description ? displayText(props.contentObject.description) : null}
        {/* <View style={styles.articleContainer}>{this.displayLinks()}</View> */}
      </View>
    </ScrollView>
  </View>

);

ObjectView.defaultProps = {
};

export default ObjectView;
