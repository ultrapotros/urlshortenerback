const UrlsList = require('../../models/urlslist');

const deleteurl = async (req, res) => {
    const {shorturl} = req.body;
    console.log('delete-url')
    await UrlsList.findByIdAndDelete(shorturl).then((data) => {
        if (data) {
            return res.status(200).json({data});
        }  
        else {
            return res.status(204).json({mensaje: "No se encuentra la url" });
            }
        })  
    .catch((error) => console.error(error));
    return 
}


module.exports = deleteurl;