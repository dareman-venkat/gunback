
import mongoose from "mongoose";
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var date = new Date();
var milliseconds = date.getTime();
const gunCollectionschenma= new Schema({
    "gunId": ObjectId,
    "gunModelName": String,
    "gunCompany": String,
    "gunstock": Number,
    "gunimgurl": String,
    "gunModelYear": String,
    "gunRentalAmount": String,
    "guntimestamp": Number,
    "plateNo": String,
    "gunColor": String,
    "isActive": String,
    "isDeleted": String
    

});

export var gunCollectionmodel = mongoose.model('gunCollection', gunCollectionschenma);
export function model() {
    return gunCollectionmodel;

}
export async function createUser(body) {
    console.log('--> method hit')
    const result = await gunCollectionmodel.create(body);
    return result;
}

export async function getUsers(body) {
    console.log("-->got user hit");
    const get = await gunCollectionmodel.find(body);
    return get;

}
export async function noactiveUsers(body) {
    console.log("-->got user hit");
    const get = await gunCollectionmodel.find({ "isActive":'No'});
    return get;

}
export async function activeUsers(body) {
    console.log("-->got user hit");
    const get = await gunCollectionmodel.find({ "isActive":'YES'});

    return get;

}

export async function getUser(id) {
    console.log("-->found respective user");

    
    const findone = await gunCollectionmodel.findById(id);

    return findone;
}

export async function deleteUser(body) {
    console.log("-->detele respective user");

  
    const deleteone = await gunCollectionmodel.findByIdAndDelete(body);

    return deleteone;
}

export async function updateUser(req, res, next) {
    console.log(req);
    console.log("-->update respective user");
    const deleteone = await gunCollectionmodel.findByIdAndUpdate(req, res);
    
    return deleteone;
}




export default { createUser, activeUsers ,noactiveUsers ,gunCollectionschenma, model, getUsers, getUser, deleteUser, updateUser };








