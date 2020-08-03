/**
 * In this file we import the firebase admin package and initialize the firestore database object. Then we export this so that other modules can use it.
 */

const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

module.exports = { admin, db}