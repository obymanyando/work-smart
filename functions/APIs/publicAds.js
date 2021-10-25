const { db } = require('../util/admin');

exports.getAllPublicAds = async (request, response) => {
    const itemsPerPage = 3;
    let query = db.collection('ad');

    let lastAd = null;
    console.log(request.query);
    console.log(request.params);
    if (request.query && request.query.lastAdId) {
        console.log(request.query.lastAdId);
        try {
            console.log("Getting last ad.")
            lastAd = await db.collection('ad').doc(request.query.lastAdId).get();
            query = query.startAfter(lastAd);
        } catch (error) {
            console.log(error);
        }
    }

    query
    .limit(itemsPerPage)    
    .get()
    .then((data) => {
        let ads = [];
        data.forEach((doc) => {
            ads.push({
                id: doc.id,
                title: doc.data().title,
                userId: doc.data().userId,
                userName: doc.data().userName,
                detail: doc.data().detail,
                createdAt: doc.data().createdAt,
                price: doc.data().price,
                currency: doc.data().currency,
                email: doc.data().email,
                phone: doc.data().phone,
                location: doc.data().location,
                address: doc.data().address,
                postalCode: doc.data().postalCode
            });
        });
        return response.json(ads);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code});
    });
};

exports.getOnePublicAd = (request, response) => {
	db.doc(`/ad/${request.params.adId}`)
    .get()
    .then((doc) => {
        if (!doc.exists) {
            return response.status(404).json({ 
                error: 'Ad not found' 
            });
        }
        // TODO: add public check
        AdData = doc.data();
        AdData.adId = doc.id;
        return response.json(AdData);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: error.code });
    });
};
