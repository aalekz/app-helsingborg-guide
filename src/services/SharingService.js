import {
  Share,
  Image,
} from "react-native";
import ImageMarker from "react-native-image-marker";

const base64Icon = "data:image/png;base64,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";
const fontSize = 80;
const lineDistance = 10;
const margin = 80;
const fadeUrl = "";
const iconUrl = "";

export default {


  shareImage(title, message, url, width, height, subject) {
    // Examples: https://github.com/JimmyDaddy/react-native-image-marker/blob/master/example/example/app.js
    Image.getSize(fadeUrl, (fadeWidth, fadeHeight) => {
      Image.getSize(iconUrl, (iconWidth, iconHeight) => {
        ImageMarker.markWithImage(url, fadeUrl, 0, parseInt(height) - fadeHeight, 1).then((resultA) => {
          ImageMarker.addText(resultA, title, margin, (parseInt(height) * 2) - (fontSize * 2) - margin - lineDistance, "#FFFFFF", "Roboto-bold", fontSize).then((resultB) => {
            ImageMarker.addText(resultB, "Guide Helsingborg app", margin, (parseInt(height) * 2) - fontSize - margin, "#FFFFFF", "Roboto", fontSize).then((resultC) => {
              ImageMarker.markWithImage(resultC, iconUrl, (parseInt(width) * 2) - iconWidth - margin, (parseInt(height) * 2) - iconHeight - margin, 1).then((resultD) => {
                Share.share({
                  title,
                  message,
                  url: `file://${resultD}`,
                  subject,
                });
              });
            });
          });
        });
      });
    });
  },

  shareLink(title, message, url, subject) {
    Share.share({
      title,
      message,
      url,
      subject,
    });
  },
};
