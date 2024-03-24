import {
  Input,
  Layout,
  Text,
  Button,
  Spinner,
  Select,
  IndexPath,
  SelectItem,
} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {useMorse} from '../hooks/useMorse.ts';
import {MorseDot} from './MorseDot.tsx';
import Torch from 'react-native-torch';
import {MorseMessage} from './MorseMessage.tsx';
import {ImageProps, View} from 'react-native';

const LoadingIndicator = (props?: ImageProps): React.ReactElement => (
  <View
    style={[
      props?.style ?? {},
      {
        justifyContent: 'center',
        alignItems: 'center',
      },
    ]}>
    <Spinner size="small" />
  </View>
);
export const HomeScreen = () => {
  const cameraAllowed = React.useRef(false);

  const [value, setValue] = useState('');
  const [dotVisible, onDotVisibilityChange] = useState(false);

  const initCamera = useCallback(async () => {
    cameraAllowed.current = await Torch.requestCameraPermission(
      'Camera Permissions',
      'We require camera permissions to use the torch on the back of your phone.',
    );
  }, []);
  useEffect(() => {
    initCamera();
  }, [initCamera]);
  const onMorseVisibilityChange = useCallback(async (visible: boolean) => {
    onDotVisibilityChange(visible);

    if (cameraAllowed.current) {
      Torch.switchState(visible);
    }
  }, []);

  const {show, locked, setMorseValue, morse, letterIndex} = useMorse({
    onSetVisibility: onMorseVisibilityChange,
  });

  const onSubmit = useCallback(() => {
    show();
  }, [show]);
  const onChange = useCallback(
    (v: string) => {
      setValue(v);
      setMorseValue(v);
    },
    [setMorseValue],
  );
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(1));

  return (
    <Layout
      level="1"
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 42,
      }}>
      <Input
        label={evaProps => <Text {...evaProps}>Message</Text>}
        onChangeText={onChange}
      />
      <Select
        selectedIndex={selectedIndex}
        style={{marginVertical: 10}}
        label="Timeout"
        onSelect={index => setSelectedIndex(index)}>
        <SelectItem title="100" />
        <SelectItem title="200" />
        <SelectItem title="300" />
      </Select>
      <Button
        accessoryLeft={locked ? LoadingIndicator : undefined}
        disabled={locked}
        onPress={onSubmit}
        style={{marginVertical: 15}}>
        SUBMIT
      </Button>
      <MorseDot visible={dotVisible} />
      <MorseMessage value={value} morse={morse} activeIndex={letterIndex} />
    </Layout>
  );
};
