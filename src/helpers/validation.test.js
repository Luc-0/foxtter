import {
  validateEmail,
  validateName,
  validateDescription,
  isEqualString,
} from './validation';

test('name normal case', () => {
  expect(validateName('Luc-0')).toBeFalsy();
  expect(validateName('L0w')).toBeFalsy();
  expect(validateName('The Odin Project')).toBeTruthy();
  expect(validateName('user784 8564')).toBeFalsy();
  expect(validateName(' userfive')).toBeFalsy();
  expect(validateName('random user  ')).toBeFalsy();
  expect(validateName('Joe')).toBeTruthy();
  expect(validateName('Jo3')).toBeFalsy();
  expect(validateName('123name')).toBeFalsy();
});

test('only number name', () => {
  expect(validateName('7848564')).toBeFalsy();
  expect(validateName('784 8564')).toBeFalsy();
  expect(validateName('000')).toBeFalsy();
});

test('name length', () => {
  expect(validateName('tolong7848564aaaaaaaaaaaaalmost35')).toBeFalsy();
  expect(validateName('lo')).toBeFalsy();
  expect(validateName('')).toBeFalsy();
});

test('Not a string', () => {
  expect(validateName(null)).toBeUndefined();
  expect(validateName({})).toBeUndefined();
  expect(validateName(123)).toBeUndefined();
});

// Email
test('Email Normal case', () => {
  expect(validateEmail('luc0x00@gmail.com')).toBeTruthy();
  expect(validateEmail('foxtter.test@fox.com')).toBeTruthy();
  expect(validateEmail('luke123@hotmail.com')).toBeTruthy();
  expect(validateEmail('bad email@gma1l.com')).toBeFalsy();
  expect(validateEmail('symbol$#@email@gmail.com')).toBeFalsy();
  expect(validateEmail('symbolemail@gm$!l.com')).toBeFalsy();
});

// Description
test('Description normal case', () => {
  expect(validateDescription('123 this is my desc', 160)).toBeTruthy();
  expect(validateDescription('123 this is my desc', 10)).toBeFalsy();
  expect(validateDescription(123123, 10)).toBeFalsy();
  expect(validateDescription({ description: '123' }, 100)).toBeFalsy();
});

// Equal string
test('is equal string', () => {
  expect(isEqualString('123', '321')).toBeFalsy();
  expect(isEqualString(123, '123')).toBeFalsy();
  expect(isEqualString('123', 123)).toBeFalsy();
  expect(isEqualString('abc', '123')).toBeFalsy();
  expect(isEqualString('cba', 'cBa')).toBeFalsy();
  expect(isEqualString('CBa', 'CBa')).toBeTruthy();
  expect(isEqualString('abc', 'abc')).toBeTruthy();
});
