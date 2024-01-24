import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {subCateType} from '../../../types/Category/CategoryModal';
import Styles, {width} from '../../../Constants/Styles';
import {useEffect, useState} from 'react';
import CategoryController from '../../../controllers/Category.controller';

const SubCatList = ({item}: {item: subCateType}) => {
  const [data, setdata] = useState(item?.Product || []);
  const [page, setPage] = useState(1);

  const getSubCatData = async () => {
    try {
      const res = await CategoryController.getProductListing({
        PageIndex: page,
        SubCategoryId: item.Id,
      });
      if (res.Result.length) {
        setdata([...data, ...res.Result]);
      }
    } catch (error) {
      console.log('🚀 ~ getSubCatData ~ error:', error);
    }
  };

  useEffect(() => {
    if (page > 1) getSubCatData();
  }, [page]);

  const onEndReached = () => {
    setPage(pre => pre + 1);
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      contentContainerStyle={{gap: 10}}
      horizontal
      {...{onEndReached}}
      renderItem={({item: {Id, Name, PriceCode, ImageName}}) => {
        return (
          <View
            style={{
              width: width * 0.29,
            }}
            key={Id}>
            <View>
              <Image
                source={{uri: ImageName}}
                resizeMode="cover"
                style={styles.cardImage}
              />
              <Text style={styles.floatingText}>{PriceCode}</Text>
            </View>
            <Text
              style={styles.nameText}
              numberOfLines={1}
              lineBreakMode="tail">
              {Name}
            </Text>
          </View>
        );
      }}
      // EMPTY LIST PLACEHOLDER
      ListEmptyComponent={() => {
        return (
          <View style={Styles.center}>
            <Text style={{fontSize: 20, fontWeight: '900', color: 'black'}}>
              No data found
            </Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '90%',
    borderRadius: 8,
    aspectRatio: 1,
    marginVertical: 10,
  },
  floatingText: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: '#308dea',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 11,
    color: 'white',
    fontWeight: '600',
  },
  nameText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'gray',
    width: '100%',
    textAlign: 'center',
  },
});

export default SubCatList;
