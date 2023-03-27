import cartModel from "../../model/cart.js"
import mongoose from "mongoose";

const Schema = mongoose.Types
var ObjectId = Schema.ObjectId;

let carts = [];

export const getcarts = async (req, res) => {
    console.log(`carts in the database: ${carts}`);
    const get = await cartModel.getcarts(res.body);


    res.send(get);
}

export const pushCart = async (req, res) => {   
    const cart = req.body;
    try { const result =  await cartModel.createCart(req.body).then(response => {
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
   
    

   
    
    console.log(`cart [${cart.cartname}] added to the database.`);
};

export const login = async(req,res,next)=>{
    const{email,password} =req.body;

    const result =  await cartModel.login(email,password)
    res.send(result)
    }

export const getCart = async (req, res) => {
    console.log(res.body);
    console.log(req.params.id);
    const result= await cartModel.getCartbyuserID(req.params.id);

    
   

    res.send(result);
    
};

export const deletecart = async(req, res) => { 
   
    const deleteone= await cartModel.deletecart(req.params.id);

    
    res.send("delete sucesssfully")
};

export const updatecart =  async(req,res,next) => {
    
    const id= req.params.id;
    const updates= req.body;
    const updateone= await cartModel.updatecart(id,updates);
    
    console.log(`cartname has been updated to ${req.body.cartname}.age has been updated to ${req.body.age}`)
};


