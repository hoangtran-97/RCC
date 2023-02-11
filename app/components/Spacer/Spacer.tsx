import { ColorValue, View } from 'react-native';

interface SpacerProps {
  width?: number;
  height?: number;
  debug?: ColorValue;
}

export const Spacer = ({ height, width, debug }: SpacerProps) => (
  <View
    style={{
      ...{
        height,
        width,
      },
      ...(debug && { backgroundColor: debug }),
    }}
  />
);
