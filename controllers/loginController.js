const jwt = require('jsonwebtoken')
const User = require('../models/users');
/* const md5 = require('md5'); */

const loginController = async (req, res) => {
    console.log('dentro del loginController');
    const { username, password } = req.body
    /* const passwordtocheck = md5(password); */
    console.log(username, password);
     const token2 = await User.findOne( {username} ).then((user) => {
        if(!user){ 
            console.log('no existe usuario')
            return 
        }
        else if (password !== user.password){
            console.log('no coincide la contraseña')
            return
           /*  return res.status(401).end() */
        }
        else {
            console.log(user);
            console.log('usuario y contraseña válidos')
            console.log(username);
            const token = jwt.sign({ username }, process.env.SECRET, {
            algorithm: 'HS256',
            expiresIn: 3000
            })
            console.log(token);
            return ([token,user])
            /* return res.status(200,token).end() */
        }
        
    })
    .catch(err => console.log(err));
       
    console.log(token2);
    if (token2) {
        res.json({...token2})
    }
    else {
        console.log('en else')
        res.status(206).end();
        /* res.json({'respuesta':'usuario o contraseña incorrecto'}) */
    }
}
module.exports = loginController;
