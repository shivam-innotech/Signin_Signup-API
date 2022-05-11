const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/mydata",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log("mongoose is connected")
}).catch((err)=>{
    console.log("something is wrong")
})