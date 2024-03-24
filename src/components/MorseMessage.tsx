import {Text} from '@ui-kitten/components';
import {MorseLetter} from '../services/morse.ts';
import {LayoutAnimation, View} from 'react-native';
import React, {useEffect} from 'react';

export const MorseMessage: React.FC<{
  value: string;
  morse: ReadonlyArray<MorseLetter>;
  activeIndex: number;
}> = ({value, morse, activeIndex}) => {
  const activeLetter = value
    .split('')
    .find((_el, index) => index === activeIndex);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [activeIndex]);

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row'}}>
        {activeLetter ? (
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
              width: 50,
              textAlign: 'center',
            }}>
            {activeLetter.toUpperCase()}
          </Text>
        ) : (
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
              width: 50,
              textAlign: 'center',
            }}>
            {' '}
          </Text>
        )}
      </View>
      <View style={{flexDirection: 'row'}}>
        {morse[activeIndex] ? (
          <View
            style={{width: 50, flexDirection: 'row', justifyContent: 'center'}}>
            {morse[activeIndex].map((morseChar, mcIndex) => (
              <Text
                key={`${mcIndex}${activeIndex}`}
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {morseChar}
              </Text>
            ))}
          </View>
        ) : (
          <View style={{height: 20, width: 50}} />
        )}
      </View>
    </View>
  );
};
