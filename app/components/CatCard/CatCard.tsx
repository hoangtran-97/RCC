import { Image, StyleSheet, View, ViewStyle, Button } from 'react-native';
import { Spacer } from '../Spacer/Spacer';

interface CardProps {
  imageUrl: string;
  containerStyle?: ViewStyle;
}

export const CatCard = ({ imageUrl, containerStyle }: CardProps) => {
  return (
    <View style={[containerStyle, styles.container]}>
      <Spacer height={64} />
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Spacer height={32} />
      <Button title={'Dislike'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: 10,
  },
});
