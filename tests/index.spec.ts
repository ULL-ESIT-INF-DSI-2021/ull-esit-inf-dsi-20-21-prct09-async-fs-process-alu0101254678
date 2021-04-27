import 'mocha';
import {expect} from 'chai';
import {restaNunmeros} from '../src/index';

describe('Tests', () => {
  expect(restaNunmeros(3, 2)).to.be.equal(-1);
});
