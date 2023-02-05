import {Router} from 'express'
import  multer from 'multer'
import {existsSync , mkdirSync , unlinkSync , readFileSync} from 'fs'
import {join} from 'path'
import { CustomRequest, authMiddleware } from '../middleware/auth'
import { imagekit } from '../config/imagekit'
const mediaRoutes = Router()
//Folder where file will get stored for temporary
let dir = join(__dirname,'../../uploads/');

//Check is folder exist
if (!existsSync(dir)) {
  mkdirSync(dir);
}

const fileStorage = multer.diskStorage(
    {
      destination: function (req, file, cb) {
        cb(null, dir);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
      },
    },
  );
  
//File fileter can be used to add limit
const uploader = multer({ storage: fileStorage  });


//Endpoint will support single file at one time
//Currnttely not added any upper media file size limit
//Or Media file type
mediaRoutes.post("/upload",authMiddleware,uploader.single("file"), 
async (req:CustomRequest,res)=>{
   try{
    // const 
    const file = req.file
    if(!file) throw new  Error("File upload failed")
    //Upload to image kit 
    const url =await imagekit.upload(
        {file:readFileSync(file.path), //Passing media as Buffer to image KIT
        fileName:file.filename , })
    // Delete from file storage
    unlinkSync(file.path)
    return res.json({error:false,url:url.url})
   }catch(e:any){
    return res.status(400).jsonp({error:true,message: e?.["message"]||"Failed"})
   }
})
export default mediaRoutes