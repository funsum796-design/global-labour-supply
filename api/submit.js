const nodemailer=require("nodemailer");
const mongoose=require("mongoose");
let ready=false;
const S=new mongoose.Schema({type:String,data:mongoose.Schema.Types.Mixed,files:mongoose.Schema.Types.Mixed,status:{type:String,default:"pending"},createdAt:{type:Date,default:Date.now}});
const Submission=mongoose.models.Submission||mongoose.model("Submission",S);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
module.exports=async(req,res)=>{
 if(req.method!=="POST")return res.status(405).json({ok:false,message:"Method not allowed"});
 try{
  const {type,data,files}=req.body||{};
  if(!type||!data)return res.status(400).json({ok:false,message:"Invalid submission"});
  if(process.env.MONGODB_URI&&!ready){await mongoose.connect(process.env.MONGODB_URI);ready=true}
  if(process.env.MONGODB_URI)await Submission.create({type,data,files,status:"pending"});
  if(!process.env.GMAIL_USER||!process.env.GMAIL_APP_PASSWORD||!process.env.OWNER_EMAIL)
   return res.status(500).json({ok:false,message:"Gmail is not configured in Vercel environment variables."});
  const t=nodemailer.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_APP_PASSWORD}});
  const rows=Object.entries(data).map(([k,v])=>`<tr><td style="padding:8px;border:1px solid #ddd;font-weight:700">${esc(k)}</td><td style="padding:8px;border:1px solid #ddd">${esc(v)}</td></tr>`).join("");
  const attachments=Object.values(files||{}).filter(f=>f?.data).map(f=>({filename:f.name,content:Buffer.from(f.data.split(",")[1],"base64"),contentType:f.type}));
  await t.sendMail({from:`Global Labour Supply <${process.env.GMAIL_USER}>`,to:process.env.OWNER_EMAIL,replyTo:data.Email||data["Email Address"]||process.env.GMAIL_USER,subject:`New ${type}`,html:`<h2>New ${esc(type)}</h2><table style="border-collapse:collapse">${rows}</table><p>${attachments.length} attachment(s) included.</p>`,attachments});
  res.json({ok:true,message:"Submitted successfully. Our team has received your request."});
 }catch(e){console.error(e);res.status(500).json({ok:false,message:"Submission failed. Please try again."})}
};
