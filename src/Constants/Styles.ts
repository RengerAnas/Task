import {Dimensions, StyleSheet} from 'react-native';

export const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
