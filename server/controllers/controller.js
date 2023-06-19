var Userdb = require('../models/model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty!'});
        return;

    }
        //new user
        const user = new Userdb({
            name:req.body.name,
            email:req.body.email,
            gender:req.body.gender,
            status:req.body.status
        });
        console.log(user);
        user.save(user)
        .then(data => {
            // res.send(data);
            // console.log("Thành công");
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Đã xảy ra lỗi trong quá trình tạo dữ liệu người dùng"
            });
        });
    
        
}

exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}

exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({message: 'Data to update can not be empty'})
    }
    
    const id = req.params.id;
    console.log(id);
    Userdb.findByIdAndUpdate(id,  { $set: req.body }, { useFindAndModify: false, new: true })
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                console.log("Update thanh cong")
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
    
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
