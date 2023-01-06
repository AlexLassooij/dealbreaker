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
    lightText: "#3293fe",
    darkText: "yellow"
  },
  screenDimensions: {
    width: width,
    height: height
  },
  fontSize: {
    h1: 25,
    h2: 20,
    h3: 15,
    h4: 12
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
    backgroundColor: "#fff"
  },
  semiLightBackground: {
    backgroundColor: "rgba(58, 177, 232, 0.2)"
  },
  lightFontColor: {
    color: "black"
  },
  lightTOButton: {
    borderColor: 'blue',
    backgroundColor: "grey"
  },
  lightBorderColor: {
    borderColor: "rgba(210, 259, 259, 0.8)",
  },
  darkBackground: {
    backgroundColor: "#212634"
  },
  semiDarkBackground: {
    backgroundColor: "#444659"
  },
  darkFontColor: {
    color: "white"
  },
  darkTOButton: {
    borderColor: '#ffff',
    backgroundColor:'#d4b948',
  },
  darkBorderColor: {
    borderColor: '#d4b948',
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
  BasicContentContainer: {
    width: "80%",
    // minHeight: "45%",
    maxHeight: "100%",
    marginTop: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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
  centerPaddedText: {
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
},
  TOButton: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10,
    borderWidth: 1,
  },
  textInputBox: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },

};