import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "firebase-adminsdk-m9zkx@games-votes-graphic.iam.gserviceaccount.com"
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
  response.json({
      msg: 'Functions from Firebase!'
  });
});

export const getGOTY = functions.https.onRequest(async(request, response) => {

    // const name = request.query.name || 'Sin nombre';

    const gotyRef = db.collection('goty');
    const docsSnap = await gotyRef.get();
    const games = docsSnap.docs.map( doc => doc.data() );

    response.json( games );
});

//  Express
const app = express();
app.use( cors({ origin:true }) );

app.get('/goty', async(req, res) => {

    const gotyRef = db.collection('goty');
    const docsSnap = await gotyRef.get();
    const games = docsSnap.docs.map( doc => doc.data() );

    res.json( games );
});

export const api = functions.https.onRequest( app );