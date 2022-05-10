const { CommentsController } = require('moongose/controller');
const UrlsList = require('../models/urlslist');

const newUrl = async (username, url) => {
    console.log('postUrls')
    console.log(username)
    try {

        const urlregistered = await UrlsList.findOne( {url} )
        console.log('1'+urlregistered)
        if (urlregistered) {
            console.log('primer if')
            const test = urlregistered.username;
            if (test==username) {
                console.log('segundo if')
                /* return res.status(423).json({ mensaje: "Ya has recortado esa url", urlregistered}); */
                /* return { mensaje: "Ya has recortado esa url", urlregistered}; */
                console.log(urlregistered);
                return  urlregistered;
            }  
        }
        else {
            console.log('primer else')
            const newU = handleCreateUrl(username,url)
            return newU
        }  
        
    }
    catch(err) {
        console.log(err)
        return err
    }
}

const handleCreateUrl = async (username,url) => {
    let shortUrlcreated2 = Math.random().toString(36).substr(2, 6);
    const shortUrlcreated = 'www.'+shortUrlcreated2+'.com';
    try {

        const isShortUrlcreated = await UrlsList.findOne( {shorturl:shortUrlcreated} )
        if (isShortUrlcreated) {
            console.log('tercer if')
            /* return res.status(403).json({mensaje: "Ya hay una url igual", shortUrlcreated, isShortUrlcreated}); */
            return ({mensaje: "Ya hay una url igual", shortUrlcreated, isShortUrlcreated});
        }
        else {
            console.log('segundo else')
            const newurl = new UrlsList({
                username: username,
                clicksCounter:0,
                url: url,
                shorturl: shortUrlcreated2
            })
            try {
                const register = await newurl.save()
                /*   res.json({ mensaje: "Registro creado correctamente", register }); */
                console.log('3'+register)
                return( register );
            }
            catch(err) { console.log(err)}
            
        }
    }
    
    catch(err){
        console.log(err)
        return err
    }
}

const modifyUrl = async (filter,update) => {
    //we search the shorurl received and increment clicksCounter and get the original url
    console.log('modifyurl');
    try {

       const data = await UrlsList.findOneAndUpdate( filter, update, { returnOriginal: false })
            if (!data) {
                return ({ mensaje: "No existe esa url"});
            }  
            else {
                console.log('en else manager')
                console.log(data)
                console.log(data.url)
                return (data);
            }  
        
    }
    catch (error) { console.log(error)}
    }

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

const deleteUrl = async (shorturl) => {
    console.log('delete-url')
    try {
        const data = await UrlsList.findByIdAndDelete(shorturl.body)
        if (data) {
            console.log('url found')
            return (data);
        }  
        else {
            console.log('not found')
            return ({response:"not found"});
            }
    }

        
    catch(err) {
        console.log(err)
        return
    }
    
     
}

const getUserUrls = async (user) => {//esta función  ya funciona, está bien exportado y bien importando desde controllers/get-user-urls
    console.log('get-user')
    const list = await UrlsList.find().where('username').all(user).then((userurls) => {
        if (userurls) {
            /* return res.json({userurls}); */
            return ({userurls})
        }  
        else {
            return res.json({mensaje: "Ya hay una url igual", shortUrlcreated, isShortUrlcreated});
            }
        })  
    .catch((error) => console.error(error));
    return list;

}

const redirect = async (req, res) => {
    //we search the shorurl received and increment clicksCounter and get the original url
    console.log('redirect')
    UrlsList.findOneAndUpdate( {shorturl:req.params.shortid},{$inc:{clicksCounter:1}}).then((data) => {
        if (!data) {
            return res.json({ mensaje: "No existe esa url", shorturl});
        }  
        else {
            res.status(200).json(data.url);
        }  
    })
}

module.exports =    {newUrl,
                    modifyUrl,
                    getlongurl,
                    deleteUrl,
                    getUserUrls,
                    redirect};