const UrlsList = require('../../models/urlslist');

const redirect = async (req, res) => {
    //we search the shorurl received and increment clicksCounter and get the original url
    UrlsList.findOneAndUpdate( {shorturl:req.params.shortid},{$inc:{clicksCounter:1}}).then((data) => {
        if (!data) {
            return res.json({ mensaje: "No existe esa url", shorturl});
        }  
        else {
            res.status(200).json(data.url);
        }  
    })
}


module.exports = redirect;