import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';

import { v4 as uuidv4 } from 'uuid';
import { HorizontalCatList } from '../../components/HorizontalCatList/HorizontalCatList';
import { Spacer } from '../../components/Spacer/Spacer';
import { colors } from '../../Constants/Colors';
import {
  FakeCat,
  generateFakeCatArray,
} from '../../Utils/CatGenerator/CatGenerator';

const ASYNC_STORAGE_CAT_BLACK_LIST = 'catBlackList';
const ASYNC_STORAGE_LOCAL_CAT_LIST = 'localCatList';

export const HomeView = () => {
  const [catData, setCatData] = useState<FakeCat[]>([]);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
    }).then(image => {
      setLocalCatListData({ id: uuidv4(), imageUrl: image.path });
    });
  };

  useEffect(() => {
    getCatData();
  }, []);
  const getCatData = async () => {
    const fakeCatList = generateFakeCatArray();
    const localCatList = await getLocalCatListData();
    const catList = [...fakeCatList, ...localCatList];
    const catBlackList = await getBlackListCatData();
    const filteredList = catList.filter(cat => !catBlackList.includes(cat.id));
    setCatData(filteredList);
  };

  const getLocalCatListData = async () => {
    try {
      const storageData = await AsyncStorage.getItem(
        ASYNC_STORAGE_LOCAL_CAT_LIST,
      );
      if (storageData != null) {
        return JSON.parse(storageData);
      }
      return [];
    } catch (error) {
      //silent catch
    }
  };

  const setLocalCatListData = async (cat: FakeCat) => {
    try {
      const currentListJSON = await AsyncStorage.getItem(
        ASYNC_STORAGE_LOCAL_CAT_LIST,
      );
      if (currentListJSON != null) {
        const currentList = JSON.parse(currentListJSON);
        const newList = [...currentList];
        newList.push(cat);
        const newListSet = [...new Set(newList)];

        await AsyncStorage.setItem(
          ASYNC_STORAGE_LOCAL_CAT_LIST,
          JSON.stringify(newListSet),
        );
      } else {
        await AsyncStorage.setItem(
          ASYNC_STORAGE_LOCAL_CAT_LIST,
          JSON.stringify([cat]),
        );
      }
      getCatData();
    } catch (e) {
      // saving error
    }
  };

  const getBlackListCatData = async () => {
    try {
      const storageData = await AsyncStorage.getItem(
        ASYNC_STORAGE_CAT_BLACK_LIST,
      );
      if (storageData != null) {
        return JSON.parse(storageData);
      }
      return [];
    } catch (error) {
      //silent catch
    }
  };
  const removeCatFromBlackList = async (catId: string) => {
    Toast.hide();
    try {
      const currentBlackListJSON = await AsyncStorage.getItem(
        ASYNC_STORAGE_CAT_BLACK_LIST,
      );
      if (currentBlackListJSON != null) {
        const currentBlackList = JSON.parse(currentBlackListJSON);
        const newBlackList = currentBlackList.filter((item: string) => {
          return item !== catId;
        });
        const newBlackListSet = [...new Set(newBlackList)];
        await AsyncStorage.setItem(
          ASYNC_STORAGE_CAT_BLACK_LIST,
          JSON.stringify(newBlackListSet),
        );
      }
      getCatData();
    } catch (e) {
      // saving error
    }
  };
  const blackListCat = async (catId: string) => {
    try {
      const currentBlackListJSON = await AsyncStorage.getItem(
        ASYNC_STORAGE_CAT_BLACK_LIST,
      );
      if (currentBlackListJSON != null) {
        const currentBlackList = JSON.parse(currentBlackListJSON);
        const newBlackList = [...currentBlackList];
        newBlackList.push(catId);
        const newBlackListSet = [...new Set(newBlackList)];

        await AsyncStorage.setItem(
          ASYNC_STORAGE_CAT_BLACK_LIST,
          JSON.stringify(newBlackListSet),
        );
      } else {
        await AsyncStorage.setItem(
          ASYNC_STORAGE_CAT_BLACK_LIST,
          JSON.stringify([catId]),
        );
      }
      getCatData();
    } catch (e) {
      // saving error
    }
    Toast.show({
      type: 'info',
      text1: 'Are you sure you want to dislike this kitty?',
      text2: 'Press here to undo',
      position: 'bottom',
      visibilityTime: 5000,
      onPress: () => removeCatFromBlackList(catId),
    });
  };
  const clearAsyncStorage = async () => {
    await AsyncStorage.removeItem(ASYNC_STORAGE_CAT_BLACK_LIST);
    getCatData();
  };

  const onCardPress = (id: string) => {
    blackListCat(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rescue Cat Club</Text>
      <HorizontalCatList data={catData} onCardPress={onCardPress} />
      <View style={styles.bottomRow}>
        <TouchableOpacity
          onPress={openImagePicker}
          activeOpacity={0.8}
          style={styles.button}>
          <Icon name={'plus-circle'} size={32} color={colors.keppelGreen} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={clearAsyncStorage}
          activeOpacity={0.8}
          style={styles.clearButton}>
          <Icon
            name={'refresh-cw'}
            size={32}
            color={colors.engineeringOrange}
          />
          <Spacer width={8} />
          <Text style={styles.buttonText}>Clear dislike data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.keppelGreen,
  },
  button: {
    padding: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: colors.engineeringOrange,
  },
  clearButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
