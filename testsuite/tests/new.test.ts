import { describe, it, expect } from '@jest/globals';
import { removeEmpty } from '#js/common/base_util';

describe('New test', () => {
    it('first test', () => {
      expect(removeEmpty(['1', '2', '', '3'])).toEqual(['1', '2', '3']);
    });
});
