const mongoose=require("mongoose");
const S=new mongoose.Schema({type:String,data:mongoose.Schema.Types.Mixed,files:mongoose.Schema.Types.Mixed,status:{type:String,default:"pending"},createdAt:{type:Date,default:Date.now}});
const Submission=mongoose.models.Submission||mongoose.model("Submission",S);
let ready=false;
async function db(){if(!process.env.MONGODB_URI)throw new Error("MONGODB_URI is not configured.");if(!ready){await mongoose.connect(process.env.MONGODB_URI);ready=true}}
module.exports=async(req,res)=>{
 try{
  const supplied=req.headers["x-admin-password"];
  if(!process.env.ADMIN_PASSWORD)return res.status(500).json({ok:false,message:"ADMIN_PASSWORD is not configured."});
  if(supplied!==process.env.ADMIN_PASSWORD)return res.status(401).json({ok:false,message:"Invalid admin password."});
  await db();
  if(req.method==="GET"){
   const type=req.query?.type;const status=req.query?.status;
   const filter={...(type?{type}:{}),...(status?{status}:{})};
   const items=await Submission.find(filter).sort({createdAt:-1}).limit(500).lean();
   return res.json({ok:true,items});
  }
  if(req.method==="PATCH"){
   const {id,status}=req.body||{};
   if(!id||!["pending","approved","rejected"].includes(status))return res.status(400).json({ok:false,message:"Invalid update."});
   const updated=await Submission.findByIdAndUpdate(id,{status},{new:true}).lean();
   if(!updated)return res.status(404).json({ok:false,message:"Record not found."});
   return res.json({ok:true,item:updated});
  }
  return res.status(405).json({ok:false,message:"Method not allowed."});
 }catch(e){console.error(e);return res.status(500).json({ok:false,message:e.message||"Unable to load submissions."})}
};
