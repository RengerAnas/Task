import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Loader from '../../components/Loader';

import {subCateType} from '../../types/Category/CategoryModal';
import CategoryController from '../../controllers/Category.controller';
import SubCatList from './components/SubCatList';
import Images from '../../Constants/Images';

const Category = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [selectedCatsData, setSelectedCatsData] = useState<subCateType[]>([]);
  const [selectedCate, setSelectedCate] = useState<number>();

  const getCategories = async () => {
    try {
      const res = await CategoryController.getDashboardData({
        CategoryId: 0,
        DeviceManufacturer: 'Google',
        DeviceModel: 'Android SDK built for x86',
        DeviceToken: ' ',
        PageIndex: 1,
      });
      if (res?.Result && res?.Result?.Category) {
        const data = res?.Result?.Category;
        setData(data);
        setSelectedCate(data?.at(0)?.Id);
      }
    } catch (error) {
      console.log('error in fetching initial data :>> ', error);
    }
  };

  const getSubCate = async (reset?: boolean) => {
    try {
      const data = {
        CategoryId: selectedCate,
        PageIndex: reset ? 1 : page,
      };
      const res = await CategoryController.getDashboardData(data);

      if (res?.Result && res?.Result?.Category) {
        const subCategories: any[] = [];
        const data = res.Result.Category;

        data?.map((item: any) => {
          if (item.SubCategories && item.SubCategories.length) {
            subCategories.push(...item.SubCategories);
          }
        });

        if (subCategories.length) {
          if (reset || data.PageIndex == 1) {
            setSelectedCatsData([...subCategories]);
          } else {
            setSelectedCatsData(prevData => [...prevData, ...subCategories]);
          }
        }
      }
    } catch (error) {
      console.log('🚀 ~ getSubCate ~ error:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCate) {
      getSubCate();
    }
  }, [page]);

  useEffect(() => {
    getSubCate(true);
  }, [selectedCate]);

  // HANDLERS
  const handleCatPress = (id: number) => {
    setSelectedCatsData([]);
    setSelectedCate(id);
    setPage(1);
  };

  const onEndReached = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, [page]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* HEADER */}
      <View
        style={{
          paddingTop: 30,
          backgroundColor: 'black',
        }}>
        <View style={styles.buttonContainer}>
          <PressableIcons source={Images.filter} />
          <PressableIcons source={Images.search} />
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={styles.headerContainer}>
            {data?.map(item => {
              const isSelected = item.Id == selectedCate;
              return (
                <TouchableOpacity
                  key={item.Id}
                  onPress={() => handleCatPress(item.Id)}>
                  <Text
                    style={{
                      color: isSelected ? 'white' : 'gray',
                      fontWeight: '500',
                      fontSize: isSelected ? 22 : 16,
                    }}>
                    {item?.Name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {!selectedCatsData.length ? (
        <Loader />
      ) : (
        <FlatList
          data={selectedCatsData}
          contentContainerStyle={{
            padding: 15,
          }}
          showsVerticalScrollIndicator={false}
          {...{onEndReached}}
          renderItem={({item}) => {
            return (
              <View key={item.Id} style={{paddingVertical: 15}}>
                <Text style={styles.subCategoryText}>{item?.Name}</Text>
                <SubCatList {...{item}} />
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconStyle: {
    height: 25,
    width: 25,
    tintColor: 'white',
  },
  headerContainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 25,
    paddingLeft: 10,
  },
  subCategoryText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Category;

const PressableIcons = ({onPress, source}: any) => {
  return (
    <TouchableOpacity {...{onPress}}>
      <Image {...{source}} style={styles.iconStyle} resizeMode="contain" />
    </TouchableOpacity>
  );
};
