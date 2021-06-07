'use strict';

const chai = require('chai');
const assert = chai.assert;
const request = require('request');
const Axios = require('axios');
// const URL =;
var FormData = require('form-data');

// Run this ./node_modules/.bin/mocha test/test.js to test the backend working


// Login Song Testing
// describe('API response', async function () {
//   this.timeout(10000);

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
// });

// Music get
// it('Check get Music data', async function () {
//   const res = await Axios({
//     method: 'get',
//     url: 'http://localhost:3001/songs/getsong',
//     params: {
//       songID: '24',
//     },
//   });
//   // console.log(res.data)
//   // assert.equal(res.data[0]["song_id"], 2, 'Comparing ID');
// });

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
//
// });

// User Testing
describe('API response', async function () {
  this.timeout(10000);

  // User Select
  // it('The User id should be same', async function () {
  //   const res = await Axios({
  //     method: 'GET',
  //     url: "http://localhost:3001/users/getUser",
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     },
  //     params: { keyid: 15 },
  //   });
  //   assert.equal(res.data[0]["keyId"], 15, 'Comparing ID');
  // });

  // it('The Test User is added', async function () {
  //   const res = await Axios({
  //     method: "post",
  //     url: "http://localhost:3001/users/insert",
  //     data: {
  //       firstName: 'Testfirstname',
  //       lastName: 'Testsecondname',
  //       userName: 'Testusername1',
  //       email: 'TestEmail',
  //       password: "Pass",
  //       role: "fun",
  //     },
  //   });
  //   console.log(res.data);
  //   assert.equal(res.data["affectedRows"], 1, 'Add Succeed');
  // });


  // deletesong
  it('The Test User is deleted ! ', async function () {
    const res = await Axios({
      method: "post",
      url: "http://localhost:3001/users/delete",
      data: {
        keyId: 16,
      },
    });
    console.log(res.data);
    assert.equal(res.data["affectedRows"], 1, 'Delete Succeed');
  });

});
