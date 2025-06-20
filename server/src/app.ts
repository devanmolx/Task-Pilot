import express from "express"

const app = express();

app.get("/" , (req,res) => {
	res.json({msg:"Server is running"})
})

app.listen(4000 , ()=>{
	console.log("Server Started")
})