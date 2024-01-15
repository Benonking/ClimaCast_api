const assert = require('assert');
const sinon = require('sinon');
const axios = require('axios');
const { WeatherAPI } = require('../index');

describe('WeatherAPI', () => {
  // Hold spies, stubs, and mocks
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('fetchCoordinates', () => {
    it('should fetch coordinates of a location', async () => {
      const weatherAPI = new WeatherAPI();
      const location = 'Kasese';
      const expectedCoordinates = [20.333, -1.339];

      sandbox.stub(axios, 'get').resolves({ data: [{ lat: expectedCoordinates[0], lon: expectedCoordinates[1] }] });

      try {
        const coordinates = await weatherAPI.fetchCoordinates(location);

        assert.deepStrictEqual(coordinates, expectedCoordinates);
        sinon.assert.calledOnce(axios.get);
        sinon.assert.calledWithExactly(axios.get, sinon.match(`q=${location}`));
      } catch (error) {
        assert.fail(error.message);
      }
    });

    it('should throw an error when fetching coordinates fails', async () => {
      const weatherAPI = new WeatherAPI();
      const location = 'Invalid';

      sandbox.stub(axios, 'get').rejects(new Error('Failed to fetch coordinates'));

      try {
        await weatherAPI.fetchCoordinates(location);
        assert.fail('Expected an error but none was thrown');
      } catch (error) {
        assert.strictEqual(error.message, 'Failed to fetch coordinates');
        sinon.assert.calledOnce(axios.get);
        sinon.assert.calledWithExactly(axios.get, sinon.match(`q=${location}`));
      }
    });
  });
});
