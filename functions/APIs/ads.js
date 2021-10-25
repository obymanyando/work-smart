const { db } = require('../util/admin');

exports.getAllAds = (request, response) => {
    console.log(JSON.stringify(request.user));
	db.collection('ad')
    .where('userName', '==', request.user.userName)
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
        let ads = [];
        data.forEach((doc) => {
            ads.push({
                adId: doc.id,
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

exports.getOneAd = (request, response) => {
	db.doc(`/ad/${request.params.adId}`)
    .get()
    .then((doc) => {
        if (!doc.exists) {
            return response.status(404).json({ 
                error: 'Ad not found' 
            });
        }
        if(doc.data().userName !== request.user.userName){
            return response.status(403).json({error:"UnAuthorized"})
        }
        AdData = doc.data();
        AdData.adId = doc.id;
        return response.json(AdData);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: error.code });
    });
};

exports.postOneAd = (request, response) => {
	if (request.body.detail.trim() === '') {
		return response.status(400).json({ body: 'Must not be empty' });
    }
    
    if(request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    
    const newAdItem = {
        title: request.body.title,
        userId: request.user.user_id,
        userName: request.user.userName,
        detail: request.body.detail,
        createdAt: new Date().toISOString(),
        price: request.body.price,
        currency: request.body.currency || "",
        email: request.body.email || "",
        phone: request.body.phone || "",
        //location: request.body.location || "",
        address: request.body.address || "",
        postalCode: request.body.postalCode || 0000
    }
    console.log(JSON.stringify(newAdItem))
    db.collection('ad')
    .add(newAdItem)
    .then((doc)=>{
        const responseAdItem = newAdItem;
        responseAdItem.id = doc.id;
        return response.json(responseAdItem);
    }).catch((error) => {
        console.error(error);
        response.status(500).json({ error: 'Something went wrong' });
    });
};

exports.deleteAd = (request, response) => {
    const document = db.doc(`/ad/${request.params.adId}`);
    document
    .get()
    .then((doc) => {
        if (!doc.exists) {
            return response.status(404).json({ 
                error: 'Ad not found' 
        })}
        if(doc.data().userName !== request.user.userName){
            return response.status(403).json({error:"UnAuthorized"})
        }
        return document.delete();
    })
    .then(() => {
        response.json({ message: 'Delete successfull' });
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
            error: err.code 
        });
    });
};

exports.editAd = ( request, response ) => { 
    if(request.body.adId || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('ad').doc(`${request.params.adId}`);
    document.update(request.body)
    .then((doc)=> {
        response.json({message: 'Updated successfully'});
    })
    .catch((error) => {
        if(error.code === 5){
            response.status(404).json({message: 'Not Found'});
        }
        console.error(error);
        return response.status(500).json({ 
                error: error.code 
        });
    });
};