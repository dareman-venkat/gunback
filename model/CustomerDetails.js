import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const CustomerDetailsschenma= new Schema({
    "customerId": ObjectId,
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
    "adharNo": String,
    "panNo": String,
    "address": String,
    "contactNo": String,
    "isActive": String,
    "isDeleted": String
    

});

export var CustomerDetailsmodel = mongoose.model('CustomerDetails', CustomerDetailsschenma);
export function model() {
    return CustomerDetailsmodel;

}
export async function createUser(body,email,callback) {
    console.log('--> method hit')
    let user=await CustomerDetailsmodel.find({email});

  try {
    console.log(user)
    const x=user[0].email
    console.log(x)
    if(user!=null){
      if(x==email){
        callback="Already Created Accound using this Email, Pls use Other Email Address"
          return callback;
        
        
      }else{
          
          const callback = await CustomerDetailsmodel.create(body);
          return callback;
          
          
      }
    }else{
   
        callback="Customer {Pls Fill Email&Password OR Invalid Username/Password!}"
      return callback;
              
    }
    
  } catch (error) {
    const callback = await CustomerDetailsmodel.create(body);
    console.log(error);
    return "Account Created Sucessfully";
  }
    
    
}

export async function getUsers(body) {
    console.log("-->got user hit");
    const get = await CustomerDetailsmodel.find(body);
    return get;

}
export async function activeUsers(body) {
    console.log("-->got user hit");
    const get = await CustomerDetailsmodel.find(body);
    return get;

}
export async function noactiveUsers(body) {
    console.log("-->got user hit");
    const get = await CustomerDetailsmodel.find(body);
    return get;

}

export async function getUser(id) {
    console.log("-->found respective user");

 
    const findone = await CustomerDetailsmodel.findById(id);

    return findone;
}


export async function login(email,password,callback){
    console.log(email)
    console.log(password)
    
  let user=await CustomerDetailsmodel.find({email});

  try {
    console.log(user)
    const x=user[0].password
   // console.log(x)
    if(user!=null){
      if(x==password){
          callback={
            "statusCode": 200,
            "result": "Record Updated",
            "hasError": false,
            "message": "Successfully Login As Customer",
            "requestTime": "2022-08-12T05:55:27.0577545Z"
          }
          return callback;
        
        
      }else{
          callback={
            "statusCode": 402,
            "result": "Record Updated",
            "hasError": false,
            "message": "Customer {Invalid Password!}",
            "requestTime": "2022-08-12T05:55:27.0577545Z"
          }
          return callback;
      }
    }else{
   
      callback={
        "statusCode": 402,
        "result": "Record Updated",
        "hasError": false,
        "message": "Customer {Pls Fill Email&Password OR Invalid Username/Password!}",
        "requestTime": "2022-08-12T05:55:27.0577545Z"
      }
      return callback;
              
    }
    
  } catch (error) {
    callback={
      "statusCode": 402,
      "result": "Record Updated",
      "hasError": false,
      "message":"Customer {Your Email are Not Registered ,Pls Sign Up}",
      "requestTime": "2022-08-12T05:55:27.0577545Z"
    }
    console.log(error);
    return callback;
  }
 
}
export async function deleteUser(body) {
    console.log("-->detele respective user");

    
    const deleteone = await CustomerDetailsmodel.findByIdAndDelete(body);

    return deleteone;
}

export async function updateUser(req, res, next) {
    console.log(req);
    console.log("-->update respective user");
    const deleteone = await CustomerDetailsmodel.findByIdAndUpdate(req, res);
    
    return deleteone;
}




export default { createUser,login, activeUsers ,noactiveUsers ,CustomerDetailsschenma, model, getUsers, getUser, deleteUser, updateUser };








