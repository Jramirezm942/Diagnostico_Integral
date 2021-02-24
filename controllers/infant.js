const Infant = require("../models/infant");




exports.infantProcess = (req,res)=> {
    const {name,relationship,genre,date,age} = req.body
    if (name === "" || relationship === "" || age === "" || date === "" || genre === "") {
        res.status(400).json({message: "Indica por favor todas las casillas del infante " });
        return;
      }
  }

