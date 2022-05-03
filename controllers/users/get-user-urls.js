const UrlsList = require('../../models/urlslist');

const geturls = async (req, res) => {
    const usernametosearch  = req.params.username;
    console.log('get-user')
    const list = await UrlsList.find().where('username').all(usernametosearch).then((userurls) => {
        if (userurls) {
            return res.json({userurls});
        }  
        else {
            return res.json({mensaje: "Ya hay una url igual", shortUrlcreated, isShortUrlcreated});
            }
        })  
    .catch((error) => console.error(error));
    return list;

}


module.exports = geturls;