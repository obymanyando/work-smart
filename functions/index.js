const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');
 
const {
    getAllAds,
    getOneAd,
    postOneAd,
    deleteAd,
    editAd
} = require('./APIs/ads')

const {
    getAllPublicAds,
    getOnePublicAd,
} = require('./APIs/publicAds')

const { 
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails
} = require('./APIs/users')

const base = '/adapi';

// User Ads
app.get(base + '/ad', auth, getAllAds);
app.get(base + '/ad/:adId', auth, getOneAd);
app.post(base + '/ad',auth, postOneAd);
app.delete(base + '/ad/:adId',auth, deleteAd);
app.put(base + '/ad/:adId',auth, editAd);

// Public Ads
app.get(base + '/publicad', getAllPublicAds);
app.get(base + '/publicad/:adId', getOnePublicAd);

// Users
app.post(base + '/login', loginUser);
app.post(base + '/signup', signUpUser);
app.post(base + '/user/image', auth ,uploadProfilePhoto);
app.post(base + '/user', auth ,updateUserDetails);
app.get(base + '/user', auth, getUserDetail);

exports.api = functions.https.onRequest(app);