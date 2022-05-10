const  {modifyUrl} = require('../../managers/urls');

async function modifyOneUrl (req, res){
    const filter = {"_id":req.params.id};
    const update = {"shorturl":req.params.newshorturl};
    try {

        const result = await modifyUrl(filter,update)
        console.log('respuesta recibida')
        /* console.log(res) */
        console.log('en controler     '+result)
        res.status(200).json(result)
        /* if (result) {
            console.log('en if')
            res.status(200).json(result);
        }
        else {
            console.log('en else')
            res.status(404).json("not found")
        } */
    } catch(error) { console.log(error) }
        
}

module.exports = modifyOneUrl; 