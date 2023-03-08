import PaymentDetailsModel from "../../model/PaymentDetails.js"
import CustomerDetailsmodel from "../../model/CustomerDetails.js"
import mongoose from "mongoose";
import { stringify } from "uuid";


const Schema = mongoose.Types
var ObjectId = Schema.ObjectId;

let users = [];

export const getUsers = async (req, res) => {
    console.log(`Users in the database: ${users}`);
    const get = await PaymentDetailsModel.getUsers(res.body);
    
    res.send(get);
}

export const createUser = async (req, res) => {  
 
    
    var timeInMss = new Date().getTime() 
   /* const get = await PaymentDetailsModel.aggregate(id);
   console.log(get[0]);
   const b= get[0].toString();
   console.log(b);
   /**
    * 
    */
    const user = {
        "customerId": req.body.customerId,
        "gunId": req.body.gunId,
        "gunRentaleDate":timeInMss,
        "gunRentalAmount":  req.body.gunRentalAmount
     
    
        
    }
    console.log(user);

    
    const result =  await PaymentDetailsModel.createUser(user).then(response => {
        
      })
      .catch(error => {
        return error;
      });
      res.send( {success:true,message:"successfully added",data:user});
        console.log(result);
        
        console.log("-->controller hit");
        
    
        
        
    
    console.log(`User [${user.username}] added to the database.`);  


    
   
};

export const curDate = async (req, res) => {
    console.log(`Users in the database: ${users}`);
    const get = await PaymentDetailsModel.curDate(res.body);


    res.send(get);
}
export const prevDate = async (req, res) => {
    console.log(`Users in the database: ${users}`);
    const get = await PaymentDetailsModel.prevDate(res.body);


    res.send(get);
}


export const getUser = async (req, res) => {
    console.log(res.body);
    console.log(req.params.id);
    const result= await PaymentDetailsModel.getUser(req.params.id);

    
   
    res.send(result);
    
};
export const getUseraggre = async (req, res) => {
    console.log(res.body);
    console.log(req.params.id);
    const result= await PaymentDetailsModel.getUseraggre(req.params.id);

    
   
    res.send(result);
    
};

export const deleteUser = async(req, res) => { 
   
    const deleteone= await PaymentDetailsModel.deleteUser(req.params.id);

    res.send("delete sucesssfully")
};

export const updateUser =  async(req,res,next) => {

    
    const id= req.params.id;
    const updates= req.body;
    try{const updateone= await PaymentDetailsModel.updateUser(id,updates).then(response => {
        return "successfully";
      })
      .catch(error => {
        return error;
      });
    
    console.log(` ${req.body.firstName} ${req.body.lastName} username has been updated  `)
    res.send("Updated sucesssfully")
} catch (error) {
    res.send( {success:false,message:error.message});
    
}}


