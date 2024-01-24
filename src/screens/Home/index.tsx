import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  NavigationProps,
  RootStackParamsList,
} from '../../types/Navigation/NavigationModels';

const Home = ({navigation}: NavigationProps<'Home'>) => {
  const navigationHandler = (name: keyof RootStackParamsList) => {
    navigation.navigate(name);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[{backgroundColor: '#FEC932'}, styles.button]}
        onPress={() => navigationHandler('Category')}>
        <Text style={styles.text}>Go To Category's</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[{backgroundColor: '#56327F'}, styles.button]}
        onPress={() => navigationHandler('ColorStrip')}>
        <Text style={[styles.text, {color: 'white'}]}>Go To Color Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});
