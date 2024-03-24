export enum MorseChar {
  SHORT = '.',
  LONG = '-',
  WORD = ' ',
}

export type MorseLetter = ReadonlyArray<MorseChar>;

export const MorseAlphabet = {
  a: [MorseChar.SHORT, MorseChar.LONG],
  b: [MorseChar.LONG, MorseChar.SHORT, MorseChar.SHORT, MorseChar.SHORT],
  c: [MorseChar.LONG, MorseChar.SHORT, MorseChar.LONG, MorseChar.SHORT],
  d: [MorseChar.LONG, MorseChar.SHORT, MorseChar.SHORT],
  e: [MorseChar.SHORT],
  f: [MorseChar.SHORT, MorseChar.SHORT, MorseChar.LONG, MorseChar.SHORT],
  g: [MorseChar.LONG, MorseChar.LONG, MorseChar.SHORT],
  h: [MorseChar.SHORT, MorseChar.SHORT, MorseChar.SHORT, MorseChar.SHORT],
  i: [MorseChar.SHORT, MorseChar.SHORT],
  j: [MorseChar.SHORT, MorseChar.LONG, MorseChar.LONG, MorseChar.LONG],
  k: [MorseChar.LONG, MorseChar.SHORT, MorseChar.LONG],
  l: [MorseChar.SHORT, MorseChar.LONG, MorseChar.SHORT, MorseChar.SHORT],
  m: [MorseChar.LONG, MorseChar.LONG],
  n: [MorseChar.LONG, MorseChar.SHORT],
  o: [MorseChar.LONG, MorseChar.LONG, MorseChar.LONG],
  p: [MorseChar.SHORT, MorseChar.LONG, MorseChar.LONG, MorseChar.SHORT],
  q: [MorseChar.LONG, MorseChar.LONG, MorseChar.SHORT, MorseChar.LONG],
  r: [MorseChar.SHORT, MorseChar.LONG, MorseChar.SHORT],
  s: [MorseChar.SHORT, MorseChar.SHORT, MorseChar.SHORT],
  t: [MorseChar.LONG],
  u: [MorseChar.SHORT, MorseChar.SHORT, MorseChar.LONG],
  v: [MorseChar.SHORT, MorseChar.SHORT, MorseChar.SHORT, MorseChar.LONG],
  w: [MorseChar.SHORT, MorseChar.LONG, MorseChar.LONG],
  x: [MorseChar.LONG, MorseChar.SHORT, MorseChar.SHORT, MorseChar.LONG],
  y: [MorseChar.LONG, MorseChar.SHORT, MorseChar.LONG, MorseChar.LONG],
  z: [MorseChar.LONG, MorseChar.LONG, MorseChar.SHORT, MorseChar.SHORT],
  ' ': [MorseChar.WORD],
};
