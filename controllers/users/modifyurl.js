const UrlsList = require('../../models/urlslist');

const modifyUrl = async (req, res) => {
    const filter = {"_id":req.params.id};
    const update = {"shorturl":req.params.newshorturl};
    //we search the shorurl received and increment clicksCounter and get the original url
    console.log('modifyurl');
    UrlsList.findOneAndUpdate( filter, update, { returnOriginal: false }).then((data) => {
        if (!data) {
            return res.json({ mensaje: "No existe esa url"});
        }  
        else {
            res.status(200).json(data.url);
        }  
    })
}

module.exports = modifyUrl;