import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {data} from './data';

const ColorStrip = () => {
  const defaultColors = data.map(item => item.colors[0].color);
  const [stripeColors, setStripeColors] = useState(defaultColors);

  const handleInputCahnge = (index: number, value: string) => {
    const updatedStripeColors = [...stripeColors];
    const colorData = data[index]?.colors.find(
      item => item.colorCode === value,
    );
    if (colorData) {
      updatedStripeColors[index] = colorData.color;
      setStripeColors(updatedStripeColors);
    }
  };

  const handleColorPress = (index: number, color: string) => {
    setStripeColors(pre => {
      let temp = [...pre];
      temp[index] = color;
      return temp;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Test Strip</Text>

      {/* LEFT-SIDE CONTAINER */}
      <View style={{flexDirection: 'row', gap: 10}}>
        <View style={styles.stripContainer}>
          <FlatList
            data={stripeColors}
            contentContainerStyle={styles.stripeFlatlist}
            renderItem={({item}) => {
              return <View style={{backgroundColor: item, height: 20}} />;
            }}
          />
        </View>

        {/* RIGTH-SIDE CONTAINER */}
        <View style={{flex: 10}}>
          <FlatList
            data={data}
            contentContainerStyle={{
              padding: 15,
            }}
            renderItem={({item, index}) => {
              return (
                <View style={{paddingBottom: 20}}>
                  <View style={styles.leftUpperContainer}>
                    <Text style={styles.titleText}>
                      {item.title}{' '}
                      <Text style={{fontWeight: '700', fontSize: 15}}>
                        (ppm)
                      </Text>
                    </Text>
                    <TextInput
                      maxLength={3}
                      keyboardType="number-pad"
                      style={styles.inputStyle}
                      placeholder="0"
                      onChangeText={value => handleInputCahnge(index, value)}
                    />
                  </View>
                  <View style={{flexDirection: 'row', flex: 1, gap: 5}}>
                    {item.colors.map(item => {
                      return (
                        <View style={{flex: 1}}>
                          <TouchableOpacity
                            style={{
                              ...styles.colorBox,
                              backgroundColor: item.color,
                            }}
                            onPress={() => handleColorPress(index, item.color)}
                          />
                          <Text style={styles.codeText}>{item.colorCode}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ColorStrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    color: '#0000a4',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  stripContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#a7a7a7',
    borderRadius: 5,
  },
  stripeFlatlist: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 75,
  },
  // left-side styling
  leftUpperContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
    color: '#8c8c8c',
  },
  inputStyle: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 0,
    textAlign: 'center',
  },
  colorBox: {
    height: 20,
    borderRadius: 4,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6b6b6b',
    textAlign: 'center',
  },
});
