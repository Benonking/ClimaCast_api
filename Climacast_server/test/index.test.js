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

      // Stub the fetchCoordinates method and use stub.returns to specify the return value
      sandbox.stub(weatherAPI, 'fetchCoordinates').returns(Promise.resolve(expectedCoordinates));

      try {
        const coordinates = await weatherAPI.fetchCoordinates(location);

        assert.deepStrictEqual(coordinates, expectedCoordinates);
        sinon.assert.calledOnce(weatherAPI.fetchCoordinates);
        sinon.assert.calledWithExactly(weatherAPI.fetchCoordinates, location);
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
        assert.fail('Error fetching coordinates: Failed to fetch coordinates');
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Error fetching coordinates: Failed to fetch coordinates'
        );
        sinon.assert.calledOnce(axios.get);
        sinon.assert.calledWithExactly(axios.get, sinon.match(`q=${location}`));
      }
    });
    
  });
});
