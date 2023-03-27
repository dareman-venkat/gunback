
import mongoose from "mongoose";
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const cartschenma= new Schema({
    "companyId": ObjectId,
    "gunId": ObjectId,
    "userId":ObjectId,
    "isActive": Boolean,
    "isDeleted": Boolean
    

});

export var cartmodel = mongoose.model('cart', cartschenma);
export function model() {
    return cartmodel;

}
export async function createCart(body) {
    console.log('--> method hit')
    const result = await cartmodel.create(body);
    return result;
}

export async function getCarts(body) {
    console.log("-->got cart hit");
    const get = await cartmodel.find(body);
    return get;

}

export async function getCartbyuserID(id) {
    console.log("-->found respective cart");
    const finduercart = await cartmodel.find({userId:id});

  var aggregate=[
    {
        "$lookup": {
            "from": "cart",
            "localField": "userId",
            "foreignField": "_id",
            "as": "user"
        }
    }
  ]
    const findone = await cartmodel.aggregate(aggregate);
console.log('findone',findone)
    return finduercart;
}



export async function deleteCart(body) {
    console.log("-->detele respective cart");

   
    const deleteone = await cartmodel.findByIdAndDelete(body);

    return deleteone;
}

export async function updateCart(req, res, next) {
    console.log(req);
    console.log("-->update respective cart");
    const deleteone = await cartmodel.findByIdAndUpdate(req, res);
   
    return deleteone;
}




export default { createCart, cartschenma, model, getCarts, getCartbyuserID, deleteCart, updateCart };








