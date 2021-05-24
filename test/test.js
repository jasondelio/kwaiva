'use strict';

const chai = require('chai');
const assert = chai.assert;
const request = require('request');
const Axios = require('axios');
const URL = 'http://localhost:3001/songs/getid';

/**
 * @param  {Object} options -
 * @return {Promise}
 */
const pRequest = (options) => {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    });
  });
};

// Testing
describe('API response', async function () {
  this.timeout(10000);

  // Normal (No error)
  it('The Song id should be same', async function () {
    const res = await Axios({
      method: 'GET',
      url: URL,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      params: {
        songID: 1,
      },
    });
    assert.equal(res.data[0]["song_id"], 1, 'Comparing ID');
    // try {
    //   const body = JSON.parse(res.body);
    //   assert.strictEqual(body.message, '', '');
    // } catch (e) {
    //   assert.fail('');
    // }
  });

});
