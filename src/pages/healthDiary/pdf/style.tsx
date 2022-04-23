import { StyleSheet } from '@react-pdf/renderer';
const fontFamily = 'Spoqa';

export const S = StyleSheet.create({
  outer: {
    backgroundColor: '#f8cbc9',
    width: '100%',
    // boxShadow: '0 25px 50px 0 rgb(62 62 62 / 15%)',
  },
  inner: {
    backgroundColor: 'white',
    // marginTop: 100,
    marginHorizontal: 40,
    marginBottom: 40,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontFamily: fontFamily,
  },
  header: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 40,
    // width: '100%',
  },
  headerTextLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#350d0b',
  },
  headerTextRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#350d0b',

    // width: '100%',
    fontFamily: fontFamily,
  },

  title: {
    width: '100%',
    fontSize: '20px',
    fontFamily: fontFamily,
  },
});
