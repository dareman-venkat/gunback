import RentaladminModel from "../../model/Rentaladmin.js"
import mongoose from "mongoose";

const Schema = mongoose.Types
var ObjectId = Schema.ObjectId;

let users = [];

export const getUsers = async (req, res) => {
    console.log(`Users in the database: ${users}`);
    const get = await RentaladminModel.getUsers(res.body);


    res.send(get);
}

export const createUser = async (req, res) => {   
    const user = req.body;
    try { const result =  await RentaladminModel.createUser(req.body).then(response => {
        return "successfully";
      })
      .catch(error => {
        return error;
      });

        console.log(result);
        res.send( {success:true,message:"successfully added",data:result});
        console.log("-->controller hit");
        
    } catch (error) {
        res.send( {success:false,message:error.message});
        
    }
   
    

   
    
    console.log(`User [${user.username}] added to the database.`);
};

export const login = async(req,res,next)=>{
    const{email,password} =req.body;

    const result =  await RentaladminModel.login(email,password)
    res.send(result)
    }

export const getUser = async (req, res) => {
    console.log(res.body);
    console.log(req.params.id);
    const result= await RentaladminModel.getUser(req.params.id);

    
   

    res.send(result);
    
};

export const deleteUser = async(req, res) => { 
   
    const deleteone= await RentaladminModel.deleteUser(req.params.id);

    
    res.send("delete sucesssfully")
};

export const updateUser =  async(req,res,next) => {
    
    const id= req.params.id;
    const updates= req.body;
    const updateone= await RentaladminModel.updateUser(id,updates);
    
    console.log(`username has been updated to ${req.body.username}.age has been updated to ${req.body.age}`)
};


