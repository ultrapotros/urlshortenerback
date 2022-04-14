const User = require('../../models/users');

const newUser = async (req, res) => {

    const { username, premium, email, password } = req.body;

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
  
module.exports = newUser;