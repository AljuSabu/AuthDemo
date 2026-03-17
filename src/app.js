import express from "express";

const app = express();

app.get('/',(req,res)=>{
    res.send('<h1>App is running</h1>')
})

export default app;
