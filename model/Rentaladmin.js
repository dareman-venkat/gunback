
import mongoose from "mongoose";
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const Rentaladminschenma= new Schema({
    "companyId": ObjectId,
    "userName": String,
    "email": String,
    "password": String,
    "contactNo": String,
    "isActive": String,
    "isDeleted": String
    

});

export var Rentaladminmodel = mongoose.model('Rentaladmin', Rentaladminschenma);
export function model() {
    return Rentaladminmodel;

}
export async function createUser(body) {
    console.log('--> method hit')
    const result = await Rentaladminmodel.create(body);
    return result;
}

export async function getUsers(body) {
    console.log("-->got user hit");
    const get = await Rentaladminmodel.find(body);
    return get;

}

export async function getUser(id) {
    console.log("-->found respective user");

  
    const findone = await Rentaladminmodel.findById(id);

    return findone;
}

export async function login(email,password,callback){
    console.log(email)
    console.log(password)
    
  const user=await Rentaladminmodel.find({email});
  const x=user[0].password
  console.log(user)
  console.log(x)
  if(user!=null){
    if(x==password){
        callback="Successfully Login As ADMIN"
        return callback;
      
      
    }else{
        callback="ADMIN {Invalid Username/Password!}"
        return callback;
    }
  }else{
 
    callback="ADMIN {Pls Fill Email&Password OR Invalid Username/Password!}"
    return callback;
            
  }
}

export async function deleteUser(body) {
    console.log("-->detele respective user");

   
    const deleteone = await Rentaladminmodel.findByIdAndDelete(body);

    return deleteone;
}

export async function updateUser(req, res, next) {
    console.log(req);
    console.log("-->update respective user");
    const deleteone = await Rentaladminmodel.findByIdAndUpdate(req, res);
   
    return deleteone;
}




export default { createUser,login, Rentaladminschenma, model, getUsers, getUser, deleteUser, updateUser };








