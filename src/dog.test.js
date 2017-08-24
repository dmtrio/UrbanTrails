/* eslint-disable */
import { dog, bark } from './dog'

test('dog barks', () => {
  expect(bark(dog)).toBe('dog says bark!!')
})
