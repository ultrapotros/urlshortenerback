const { CommentsController } = require('moongose/controller');
const UrlsList = require('../models/urlslist');

const newUrl = async (username, url) => {

    try {

        const urlregistered = await UrlsList.findOne( {url} )
        if (urlregistered) {
            console.log('primer if')
            const test = urlregistered.username;
            if (test==username) {
                return  urlregistered;
            }  
        }
        else {
            const newU = handleCreateUrl(username,url)
            return newU
        }  
        
    }
    catch(err) {
        return err
    }
}

const handleCreateUrl = async (username,url) => {
    let shortUrlcreated2 = Math.random().toString(36).substr(2, 6);
    const shortUrlcreated = 'www.'+shortUrlcreated2+'.com';
    try {

        const isShortUrlcreated = await UrlsList.findOne( {shorturl:shortUrlcreated} )
        if (isShortUrlcreated) {
            return ({mensaje: "Ya hay una url igual", shortUrlcreated, isShortUrlcreated});
        }
        else {
            const newurl = new UrlsList({
                username: username,
                clicksCounter:0,
                url: url,
                shorturl: shortUrlcreated2
            })
            try {
                const register = await newurl.save()
                return( register );
            }
            catch(err) { console.log(err)}
            
        }
    }
    catch(err){
        return err
    }
}

const modifyUrl = async (filter,update) => {
    //we search the shorurl received to not repeat shorurls
    try {
        const isShortUrlcreated = await UrlsList.findOne( {shorturl:update.shorturl} )
        console.log(isShortUrlcreated)
        if (isShortUrlcreated) {
            return ({message: "Already exists"});
        }
        else {
            try {
                const data = await UrlsList.findOneAndUpdate( filter, update, { returnOriginal: false })
                if (!data) {
                    return ({ message: "Not found"});
                }  
                else {
                    return ({message:"updated"});
                }  
            }
            catch (error) { console.log(error)}
        }
    }
    catch (error) { console.log(error) }
}

const getlongurl = async (req, res) => {
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
    try {
        const data = await UrlsList.findByIdAndDelete(shorturl.body)
        if (data) {
            return (data);
        }  
        else {
            return ({response:"not found"});
            }
    }
    catch(err) {
        return
    }
    
     
}

const getUserUrls = async (user) => {
    const list = await UrlsList.find().where('username').all(user).then((userurls) => {
        if (userurls) {
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