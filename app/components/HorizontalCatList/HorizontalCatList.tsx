import { FlatList, ListRenderItem, Dimensions } from 'react-native';
import { FakeCat } from '../../Utils/CatGenerator/CatGenerator';
import { CatCard } from '../CatCard/CatCard';

const deviceWidth = Dimensions.get('window').width;
const cardMargin = 12;
const cardInset = 12;
const cardWidth = deviceWidth - cardMargin * 2 - cardInset * 4;

interface HorizontalCatListProps {
  data: FakeCat[];
  onCardPress: (id: string) => void;
}

export const HorizontalCatList = ({
  data,
  onCardPress,
}: HorizontalCatListProps) => {
  const renderItem: ListRenderItem<FakeCat> = ({ item }) => {
    return (
      <CatCard
        onPress={() => onCardPress(item.id)}
        key={item.id}
        imageUrl={item.imageUrl}
        containerStyle={{
          width: cardWidth,
          marginHorizontal: cardMargin,
        }}
      />
    );
  };

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      scrollEventThrottle={200}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      pagingEnabled={true}
      snapToInterval={cardWidth + cardMargin * 2}
      fadingEdgeLength={1}
      snapToAlignment={'center'}
      contentInset={{
        // iOS only
        top: 0,
        left: cardInset, // Left spacing for the very first card
        bottom: 0,
        right: cardInset, // Right spacing for the very last card
      }}
      contentOffset={{ x: -cardInset, y: 0 }}
    />
  );
};
