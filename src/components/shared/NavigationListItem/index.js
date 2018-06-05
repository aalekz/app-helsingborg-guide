
// @flow
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LangService from "../../../services/langService";
import styles from "./styles";

type Props = {
  item: NavigationItem,
  onPressItem(item: NavigationItem): void
};

function getGuidesCount(guideGroup: ?GuideGroup): number {
  if (!guideGroup) return 0;
  if (!guideGroup.guidesCount) return 0;
  return guideGroup.guidesCount;
}

function getGuidesCountFromGuide(guide: ?Guide): number {
  if (!guide) return 0;
  return guide.contentObjects.length;
}

function renderGuideCount(item: NavigationItem) {
  const { type, guide, guideGroup } = item;


  let textString = null;
  if (type === "guidegroup") {
    const guidesCount = getGuidesCount(guideGroup);
    const plural = guidesCount > 1;
    const mediaGuideString: string = plural ? LangService.strings.MEDIAGUIDES : LangService.strings.MEDIAGUIDE;
    textString = `${guidesCount} ${mediaGuideString.toUpperCase()}`;
  } else if (type === "trail") {
    const guidesCount = getGuidesCountFromGuide(guide);
    const plural = guidesCount > 1;
    const locationString: string = plural ? LangService.strings.LOCATIONS : LangService.strings.LOCATION;
    textString = `${LangService.strings.TOUR} ${LangService.strings.WITH} ${guidesCount} ${locationString}`;
    textString = textString.toUpperCase();
  } else if (type === "guide") {
    const guidesCount = getGuidesCountFromGuide(guide);
    textString = `${LangService.strings.MEDIAGUIDE} ${LangService.strings.WITH} ${guidesCount} ${LangService.strings.OBJECT}`;
  }

  if (!textString) return null;

  return (<Text style={styles.listItemGuideCount}>{textString}</Text>);
}

function getNameAndImage(item: NavigationItem): { image: ?string, name: ?string } {
  const { guide, guideGroup } = item;
  if (guide) {
    const { name, images } = guide;
    const image = images.medium;
    return { image, name };
  }
  if (guideGroup) {
    const { name, images } = guideGroup;
    const image = images.medium;
    return { name, image };
  }
  return {
    image: null,
    name: null,
  };
}

const NavigationListItem = (props: Props) => {
  const { item } = props;
  const { image, name } = getNameAndImage(item);
  return (<TouchableOpacity
    onPress={() => props.onPressItem(item)}
    style={styles.listItemContainer}
  >
    <View style={styles.imageWrapper}>
      <Image
        style={styles.listItemImage}
        source={{ uri: image }}
      />
    </View>
    <View style={styles.listItemTextContainer}>
      <Text style={styles.listItemTitle}>{name}</Text>
      {renderGuideCount(item)}
    </View>
  </TouchableOpacity>
  );
};


export default NavigationListItem;
