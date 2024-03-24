import React from 'react';
import {View} from 'react-native';

type MorseDotProps = {
  visible: boolean;
};

export const MorseDot: React.FC<MorseDotProps> = ({visible}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: visible ? 'black' : 'white',
          height: 50,
          width: 50,
        }}
      />
    </View>
  );
};
