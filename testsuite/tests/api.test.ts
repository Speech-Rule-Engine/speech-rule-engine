import { describe, it, expect, beforeAll } from '@jest/globals';
import * as System from '#js/common/system';

describe('New API test', () => {
    beforeAll(() => System.setupEngine({
        locale: 'en'
    }));
    it('first test', () => {
        expect(System.toSpeech('<math><mi>a</mi><mo>=</mo><mi>b</mi></math>')).toEqual('a equals b');
    });
});
