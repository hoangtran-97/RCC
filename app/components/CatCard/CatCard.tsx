import {
  Image,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  Text,
} from 'react-native';
import { colors } from '../../Constants/Colors';
import { Spacer } from '../Spacer/Spacer';

interface CardProps {
  imageUrl: string;
  containerStyle?: ViewStyle;
  onPress: () => void;
}

export const CatCard = ({ imageUrl, containerStyle, onPress }: CardProps) => {
  return (
    <View style={[containerStyle, styles.container]}>
      <Spacer height={64} />
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Spacer height={16} />
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.button}>
        <Text style={styles.buttonText}>Dislike</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: 10,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.keppelGreen,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: colors.keppelGreen,
  },
});
