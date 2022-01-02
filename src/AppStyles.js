import { StyleSheet, Dimensions } from "react-native";
import { Configuration } from "./Configuration";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const numColumns = 2;

export const AppStyles = {
  color: {
    main: "#5ea23a",
    text: "#696969",
    title: "#464646",
    subtitle: "#545454",
    categoryTitle: "#161616",
    tint: "#ff5a66",
    description: "#bbbbbb",
    filterTitle: "#8a8a8a",
    starRating: "#2bdf85",
    location: "#a9a9a9",
    white: "white",
    facebook: "#4267b2",
    grey: "grey",
    greenBlue: "#00aea8",
    placeholder: "#a0a0a0",
    background: "#f2f2f2",
    blue: "#3293fe"
  },
  fontSize: {
    title: 30,
    content: 20,
    normal: 16
  },
  buttonWidth: {
    main: "70%"
  },
  textInputWidth: {
    main: "80%"
  },
  borderRadius: {
    main: 25,
    small: 5
  },
  lightBackground: {
    backgroundColor: "#fffdd0"
  },
  lightFontColor: {
    color: "black"
  },
  darkBackground: {
    backgroundColor: "grey"
  },
  darkFontColor: {
    color: "white"
  },
  verticalContainerFS: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      height: height,
      width: width,
  },
  verticalContainerFC: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width,
},
  pageHeader: {
      fontSize: 30
  },
  centreOfScreen: {
      color: "black",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};