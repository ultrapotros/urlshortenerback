/* const User = require('../../models/users');

const newUser = async (req, res) => {
    const { username, premium, email, password } = req.body;
    console.log('newuser')
    User.findOne({ username }).then((usuario) => {
      if (usuario) {
        return res.json({ mensaje: "Ya existe un usuario con ese username" });
      }  
      else {
            const nuevoUsuario = new User({
              username,
              premium,
              email,
              password
            });
  
            nuevoUsuario
              .save()
              .then((usuario) => {
                res.json({ mensaje: "Usuario creado correctamente", usuario });
              })
              .catch((error) => console.error(error));
          }
  });
}
  
module.exports = newUser; */

import { Auth } from 'aws-amplify';
const { Auth } = require('.././../aws-amplify') ;

async function signUp() {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}