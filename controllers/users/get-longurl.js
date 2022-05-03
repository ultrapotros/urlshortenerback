const UrlsList = require('../../models/urlslist');

const getlongurl = async (req, res) => {
    console.log('get-longurl')
    const list = await UrlsList.find().where('shorturl').all(req.params.shortid).then((longurl) => {
        if (longurl) {
            return res.status(200).json({longurl});
        }  
        else {
            return res.status(423).json({mensaje: "No se encuentra esa url"});
            }
        })  
    .catch((error) => console.error(error));
    return list;
}


module.exports = getlongurl;