import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    width: '100%',
    marginTop: 50,
  },
  titleText: {
    color: 'rgb(35, 66, 54)',
    fontFamily: 'Ageo-Bold',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 40,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 21,
    marginTop: 21,
  },
  h1Text: {
    color: 'rgb(35, 66, 54)',
    fontFamily: 'Ageo-Bold',
    fontSize: 18,
    lineHeight: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    marginLeft: 21,
    paddingRight: 42,

  },
  h3Text: {
    color: '#234236',
    fontFamily: 'Ageo',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    width: '100%',
    alignSelf: 'stretch',
    marginLeft: 21,
    paddingRight: 42,
  },
  subTitleText: {
    color: '#90A39A',
    fontFamily: 'Ageo',
    fontSize: 14,
    lineHeight: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 21,
    paddingRight: 42,
    flexWrap: 'wrap',
    flexShrink: 1
  },
  textInputView: {
    marginBottom: 26,
    marginHorizontal: 26,
    justifyContent: 'space-between',
    // flexDirection: 'row',
  },
  textInput: {
    color: '#234236',
    fontFamily: 'Ageo',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    width: '100%',
    height: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EEEE',
    paddingBottom: 2,
    marginBottom: 2,
  },
  textInputFocused: {
    borderBottomColor: '#068466',
  },
  textInputInvalid: {
    borderBottomColor: 'red',
  },
  invalidText: {
    color: 'red',
    fontFamily: 'Ageo-Bold',
    height: 14,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    width: '100%',
    opacity: 0.5,
  },
  buttonView: {
    width: '100%',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'stretch',
    height: 42,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
  },
  backButtonText: {
    color: '#398E71',
    fontFamily: 'Ageo-Bold',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontFamily: 'Ageo-Bold',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
  },
  continueButtonImage: {
    resizeMode: 'contain',
    marginRight: 10,
  },
  continueButton: {
    backgroundColor: 'rgb(57, 142, 113)',
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'stretch',
    height: 42,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(57, 142, 113, 0.4)',
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'stretch',
    height: 42,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
  },
});

export const COLORS = {
  primary: '#1E8566',
  primaryOrange: '#FF6C44', //orange
  transparentPrimary: 'rgba(0, 0, 0, 0.4)',
  transparentOrange: 'rgba(227, 120, 75, 0.4)',
  orange: '#FFA133',
  lightOrange: '#FFA133',
  lightOrange2: '#FDDED4',
  lightOrange3: '#FFD9AD',
  green: '#1E8566',
  red: '#FF1717',
  blue: '#0064C0',
  darkBlue: '#111A2C',
  darkGray: '#525C67',
  darkGray2: '#757D85',
  gray: '#898B9A',
  gray2: '#BBBDC1',
  gray3: '#CFD0D7',
  lightGray1: '#DDDDDD',
  lightGray2: '#F5F5F8',
  white2: '#FBFBFB',
  white: '#FFFFFF',
  black: '#000000',

  transparent: 'transparent',
  transparentBlack1: 'rgba(100, 100, 100, 0.2)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: { fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle },
  h1: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5, lineHeight: 22 },
  body1: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
