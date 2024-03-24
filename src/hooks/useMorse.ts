import {useCallback, useRef, useState} from 'react';
import {MorseAlphabet, MorseChar, MorseLetter} from '../services/morse.ts';

const MorseTimeout = {
  [MorseChar.SHORT]: 1,
  [MorseChar.LONG]: 3,
  [MorseChar.WORD]: 7,
};

export const useMorse = ({
  onSetVisibility,
  timeout = (60 / 50) * 300,
}: {
  onSetVisibility: (visible: boolean) => Promise<void>;
  timeout?: number;
}) => {
  const [letterIndex, setLetterIndex] = useState<number>(-1);
  const [morse, setMorse] = useState<ReadonlyArray<MorseLetter>>([]);
  const [locked, setLocked] = useState<boolean>(false);
  const setMorseValue = useCallback((value: string) => {
    setMorse(
      value
        .split('')
        .filter(char => !!MorseAlphabet[char as keyof typeof MorseAlphabet])
        .map(char => MorseAlphabet[char as keyof typeof MorseAlphabet]),
    );
  }, []);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const timeoutFn = useCallback(async (ms: number) => {
    await new Promise(resolve => {
      timeoutId.current = setTimeout(() => resolve(ms), ms);
    });
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);
  const sleepMorseChar = useCallback(
    async (letter: keyof typeof MorseTimeout) => {
      const tm = MorseTimeout[letter] * timeout;
      console.log(`set visible tm ${tm}ms for symbol '${letter}'`);
      await timeoutFn(tm);
      console.log(`end ${tm}ms`);
    },
    [timeout, timeoutFn],
  );
  const processMorseChar = useCallback(
    async (symbol: MorseChar) => {
      let isSubscribed = true;
      if (isSubscribed) {
        console.log('call on next letter');
        await onSetVisibility(true);
        await sleepMorseChar(symbol);
        await onSetVisibility(false);
        await sleepMorseChar(MorseChar.LONG);
      }
      return () => (isSubscribed = false);
    },
    [onSetVisibility, sleepMorseChar],
  );

  const processMorseLetter = useCallback(
    async (letter: MorseLetter, pr: Promise<void>) => {
      return pr.then(async () => {
        setLetterIndex(prevState => prevState + 1);
        await letter.reduce(async (acc, symbol) => {
          return acc.then(async () => {
            if (symbol === MorseChar.WORD) {
              await sleepMorseChar(MorseChar.WORD);
            } else {
              await processMorseChar(symbol);
            }
          });
        }, Promise.resolve());
      });
    },
    [processMorseChar],
  );

  const show = useCallback(async () => {
    if (locked) {
      return Promise.resolve();
    }
    const promise = morse.reduce(async (pr, letter) => {
      return processMorseLetter(letter, pr);
    }, Promise.resolve());
    setLocked(true);
    await promise;
    setLetterIndex(-1);
    setLocked(false);
  }, [locked, morse, processMorseLetter]);

  return {morse, setMorseValue, show, locked, letterIndex};
};
