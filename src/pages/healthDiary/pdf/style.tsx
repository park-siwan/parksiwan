import { StyleSheet } from '@react-pdf/renderer';
export const primary = {
  100: '#FAE5E6',
  500: '#E3ACAC',
  600: '#E7A9AA',
  700: '#9F5C5C',
};
export const gray = {
  100: '#E9E3E3', //border
  300: '#CBC5C5',
  500: '#A69E9E',
};
const fontFamily = 'Spoqa';
export const S = StyleSheet.create({
  //<Page> 에 S.font 로 전역적용한 폰트
  font: {
    fontFamily: fontFamily,
  },
  outer: {
    width: '100%',
    height: '100%',
    backgroundColor: primary[100],
  },
  inner: {
    // width: '90%',
    height: '90%',
    backgroundColor: 'white',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40,
  },
  header: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    paddingBottom: 10,
    paddingHorizontal: 40,
  },
  headerText: {
    // display: 'flex',
    fontSize: '14px',
    fontWeight: 400,
    color: primary[700],
  },
  foods: {
    // justifyContent: 'flex-start',
  },
  food: {
    width: 163,
    height: 143.5,
    borderRight: `1px solid ${gray[100]}`,
    borderBottom: `1px solid ${gray[100]}`,
    padding: 10,
  },
  rightBodies: {
    // display: 'flex',
    // justifyContent: 'flex-end',
    width: 360,
    height: 574,
    padding: 10,
  },
  bottomInfo: {
    fontSize: '12px',
    // justifyContent: 'center',
    borderTop: `1px solid ${gray[100]}`,

    // height: 40,
    width: '100%',
    // borderLeft: `1px solid ${gray[100]}`,
    // height: 574,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
