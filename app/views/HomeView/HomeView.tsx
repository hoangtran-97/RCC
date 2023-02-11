import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { HorizontalCatList } from '../../components/HorizontalCatList/HorizontalCatList';

export const HomeView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Please Rescue the cats!</Text>
      <HorizontalCatList />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
});
