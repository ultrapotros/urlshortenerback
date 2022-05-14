const  {modifyUrl} = require('../../managers/urls');

async function modifyOneUrl (req, res){
    const filter = {"_id":req.params.id};
    const update = {"shorturl":req.params.newshorturl};
    try {
        const result = await modifyUrl(filter,update)
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json("not found")
        }
    } catch(error) { console.log(error) }
}

module.exports = modifyOneUrl; 