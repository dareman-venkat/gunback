    
import mongoose from "mongoose";
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const PaymentDetailsschenma= new Schema({

    "customerId": {type: ObjectId, ref: 'CustomerDetailsmodel'},
    "gunId": {type: ObjectId, ref: 'gunCollectionmodel'},
    "gunRentaleDate": Number,
    "gunRentalAmount": String

});

export var PaymentDetailsmodel = mongoose.model('PaymentDetails', PaymentDetailsschenma);
export function model() {
    return PaymentDetailsmodel;

}

export async function createUser(body) {
    console.log('--> method hit')
    const result = await PaymentDetailsmodel.create(body);
    return result;
}

export async function prevDate(body) {
    console.log("-->got user hit");
    var timeInMss = new Date().getTime() 
    const get = await PaymentDetailsmodel.find({"gunRentaleDate"  : {$lte : timeInMss}});

    return get;

}
export async function curDate(body) {
    console.log("-->got user hit");
    const timeInMss = new Date().getTime() 
    console.log("-->got X hit",timeInMss);
    const get = await PaymentDetailsmodel.find({"gunRentaleDate"  : {$gte : timeInMss}});
    const x=get[0]
    console.log("-->got get hit",get);
    console.log("-->got X hit",x);
    return get;

}

export async function getUsers(body) {
    console.log("-->got user hit");
    const get = await PaymentDetailsmodel.find(body);
    return get;

}

export async function getUser(id) {
    console.log("-->found respective user");

    
    const findone = await PaymentDetailsmodel.findById(id);

    return findone;
}
export async function getUseraggre(id) {
    console.log("-->found respective user");
    console.log(id);

    var aggregateQuery = [
        {
             $match: { _id:mongoose.Types.ObjectId(id) } 
        },
        {
            $lookup:
            {
                from: "customerdetails",
                localField: "customerId",
                foreignField: "_id",
                as: "customer"
            }
        },
        {
            $lookup:
            {
                from: "guncollections",
                localField: "gunId",
                foreignField: "_id",
                as: "gun"
            }
        },
      
        { $project: {
           
            Details: {
                Name:"$customer.firstName",
                RentalgunModelName:"$gun.gunModelName",
                gunCompany:"$gun.gunCompany",
                Email:"$customer.email",
                AdharNo:"$customer.adharNo",
                PAN_No:"$customer.panNo",
                Address:"$customer.address",
                ContactNo:"$customer.contactNo",
            }
        }}


       
    ]

    
    const findone = await PaymentDetailsmodel.aggregate(aggregateQuery);
    console.log(findone);

    return findone;
}
export async function aggregate(id) {
    console.log("-->found respective user");
    console.log(id);
    
try{


    var aggregateQuery = [
        {
            $match: { _id:mongoose.Types.ObjectId(id) } 
       },
      
       {
        $lookup:
        {
            from: "guncollections",
            localField: "gunId",
            foreignField: "_id",
            as: "gun"
        }
    },
      
       
        { $project: {
           
            Details: {
                
                Rentalamount:"$gun.gunRentalAmount",
                
                
            }
        }}
        
       
    ]


    
    let findone = await PaymentDetailsmodel.aggregate(aggregateQuery);
    console.log("find one this is my eye to see",findone);
    findone=findone[0]
    console.log("find one this is my eye 2 to see",findone);
    return findone;
}catch(error){
    console.log(error)

}
}

export async function deleteUser(body) {
    console.log("-->detele respective user");

   
    const deleteone = await PaymentDetailsmodel.findByIdAndDelete(body);

    return deleteone;
}

export async function updateUser(req, res, next) {
    console.log(req);
    console.log("-->update respective user");
    const deleteone = await PaymentDetailsmodel.findByIdAndUpdate(req, res);
   
    return deleteone;
}




export default { createUser,aggregate, PaymentDetailsschenma,curDate,prevDate, model, getUsers, getUser,getUseraggre, deleteUser, updateUser };








