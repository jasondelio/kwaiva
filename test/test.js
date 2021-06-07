'use strict';

const chai = require('chai');
const assert = chai.assert;
const request = require('request');
const Axios = require('axios');
// const URL =;
var FormData = require('form-data');

// Run this ./node_modules/.bin/mocha test/test.js to test the backend working


// Login Song Testing
describe('API response', async function () {
  this.timeout(10000);

  // LogIn verification
  // it('Check User Login Coorect ! ', async function () {
  //   const res = await Axios({
  //     method: "get",
  //     url: "http://localhost:3001/login/verify",
  //     params: {
  //       userName: 'admin',
  //       password: 'adminTest',
  //     },
  //   });
  //   // console.log(res.data);
  //   assert.equal(res.data, "Yes", 'See if login succeed');
  // });

  // Normal(No error)
  // it('The Song id should be same', async function () {
  //   const res = await Axios({
  //     method: 'get',
  //     url: 'http://localhost:3001/songs/get',
  //   });
  //   // console.log(res.data)
  //   assert.equal(res.data[0]["song_id"], 2, 'Comparing ID');
  //   // try {
  //   //   const body = JSON.parse(res.body);
  //   //   assert.strictEqual(body.message, '', '');
  //   // } catch (e) {
  //   //   assert.fail('');
  //   // }
  // });

  // Music get
  it('The Song data should be same', async function () {
    const res = await Axios({
      method: 'get',
      url: 'http://localhost:3001/songs/getsongbuffer',
      params: {
        songID: '2',
      },
    });
    // console.log(res.data)
    // assert.equal(res.data[0]["song_id"], 2, 'Comparing ID');
  });

  // it('The Test Song is added', async function () {
  //   const res = await Axios({
  //     method: "post",
  //     url: "http://localhost:3001/getform",
  //     data: {
  //       title: 'TestTitle',
  //       musician: 'TestTitle',
  //       genre: 'TestPop',
  //       year: 2020,
  //       price: 10,
  //       quantity: 10,
  //       urlYoutube: 'https://test',
  //       musicfile: 'musicFile',
  //       imagefile: 'imageFile',
  //     },
  //   });
  //   // console.log(res.data);
  //   assert.equal(res.data, "Succeed", 'Comparing ID');
  // });


  // deletesong
  // it('The Test Song is deleted ! ', async function () {
  //   const res = await Axios({
  //     method: "post",
  //     url: "http://localhost:3001/deletesong",
  //     data: {
  //       song_id: 19,
  //     },
  //   });
  //   // console.log(res.data);
  //   assert.equal(res.data, "Succeed", 'See if deleting succeed');
  // });

});

// // User Testing
// describe('API response', async function () {
//   this.timeout(10000);

//   // LogIn verification
//   it('Check User Login Coorect ! ', async function () {
//     const res = await Axios({
//       method: "get",
//       url: "http://localhost:3001/login/verify",
//       params: {
//         userName: 'admin',
//         password: 'adminTest',
//       },
//     });
//     // console.log(res.data);
//     assert.equal(res.data, "Yes", 'See if login succeed');
//   });

//   // Normal(No error)
//   it('The Song id should be same', async function () {
//     const res = await Axios({
//       method: 'GET',
//       url: URL,
//       headers: {
//         "Content-Type": "multipart/form-data"
//       },
//       params: {
//         songID: 2,
//       },
//     });
//     assert.equal(res.data[0]["song_id"], 2, 'Comparing ID');
//     // try {
//     //   const body = JSON.parse(res.body);
//     //   assert.strictEqual(body.message, '', '');
//     // } catch (e) {
//     //   assert.fail('');
//     // }
//   });

//   // it('The Test Song is added', async function () {
//   //   const res = await Axios({
//   //     method: "post",
//   //     url: "http://localhost:3001/getform",
//   //     data: {
//   //       title: 'TestTitle',
//   //       musician: 'TestTitle',
//   //       genre: 'TestPop',
//   //       year: 2020,
//   //       price: 10,
//   //       quantity: 10,
//   //       urlYoutube: 'https://test',
//   //       musicfile: 'musicFile',
//   //       imagefile: 'imageFile',
//   //     },
//   //   });
//   //   // console.log(res.data);
//   //   assert.equal(res.data, "Succeed", 'Comparing ID');
//   // });


//   // // deletesong
//   // it('The Test Song is deleted ! ', async function () {
//   //   const res = await Axios({
//   //     method: "post",
//   //     url: "http://localhost:3001/deletesong",
//   //     data: {
//   //       song_id: 5,
//   //     },
//   //   });
//   //   // console.log(res.data);
//   //   assert.equal(res.data, "Succeed", 'See if deleting succeed');
//   // });

// });
