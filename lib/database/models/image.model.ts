import { Document } from "mongodb";
import { Schema, model, models } from "mongoose";

export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureUrl: string; // or custom URL type
    width?: number;
    height?: number;
    config?: object;
    transformationUrl?: string; // or custom URL type
    aspectRatio?: string;
    color?: string;
    prompt?: string;
    author:{
        _id:string;
        firstName:string;
        lastName:string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}



const ImageSchema = new Schema({
    title:{type:String,required:true},
    transformationType:{type:String,require:true},
    publicId:{type:String,required:true},
    secureUrl:{type:URL,required:true},
    width:{type:Number},
    height:{type:Number},
    config:{type:Object},
    transformationUrl:{type:URL},
    aspectRatio:{type:String},
    color:{type:String},
    prompt:{type:String},
    author:{type:Schema.Types.ObjectId,ref:'User'},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
});

const Image = models?.Image || model('Image',ImageSchema);

export default Image;