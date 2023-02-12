import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import { v4 as uuidv4 } from 'uuid';
import { HorizontalCatList } from '../../components/HorizontalCatList/HorizontalCatList';
import { colors } from '../../Constants/Colors';
import {
  FakeCat,
  generateFakeCatArray,
} from '../../Utils/CatGenerator/CatGenerator';

export const HomeView = () => {
  const [catData, setCatData] = useState<FakeCat[]>([]);
  const [localCatList, setLocalCatList] = useState<FakeCat[]>([]);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
    }).then(image => {
      setLocalCatList([
        ...localCatList,
        { id: uuidv4(), imageUrl: image.path },
      ]);
    });
  };

  useEffect(() => {
    getCatData();
  }, [localCatList]);

  useEffect(() => {
    getCatData();
  }, []);
  const getCatData = async () => {
    const fakeCatList = generateFakeCatArray();
    const catList = [...fakeCatList, ...localCatList];
    const catBlackList = await getBlackListCatData();
    const filteredList = catList.filter(cat => !catBlackList.includes(cat.id));
    setCatData(filteredList);
  };

  const getBlackListCatData = async () => {
    try {
      const storageData = await AsyncStorage.getItem('catBlackList');
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
      const currentBlackListJSON = await AsyncStorage.getItem('catBlackList');
      if (currentBlackListJSON != null) {
        const currentBlackList = JSON.parse(currentBlackListJSON);
        const newBlackList = currentBlackList.filter((item: string) => {
          return item !== catId;
        });
        const newBlackListSet = [...new Set(newBlackList)];
        await AsyncStorage.setItem(
          'catBlackList',
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
      const currentBlackListJSON = await AsyncStorage.getItem('catBlackList');
      if (currentBlackListJSON != null) {
        const currentBlackList = JSON.parse(currentBlackListJSON);
        const newBlackList = [...currentBlackList];
        newBlackList.push(catId);
        const newBlackListSet = [...new Set(newBlackList)];

        await AsyncStorage.setItem(
          'catBlackList',
          JSON.stringify(newBlackListSet),
        );
      } else {
        await AsyncStorage.setItem('catBlackList', JSON.stringify([catId]));
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
    await AsyncStorage.clear();
    getCatData();
  };

  const onCardPress = (id: string) => {
    blackListCat(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rescue Cat Club</Text>
      <HorizontalCatList data={catData} onCardPress={onCardPress} />
      <TouchableOpacity
        onPress={clearAsyncStorage}
        activeOpacity={0.8}
        style={styles.button}>
        <Text style={styles.buttonText}>Clear dislike data</Text>
      </TouchableOpacity>
      <Button title={'select image'} onPress={openImagePicker} />
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
});
