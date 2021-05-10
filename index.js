const express = require ("express");
const app = express();

//Connection string mongodb://localhost:27017
//Mongo client
const connectionString= "mongodb://localhost:27017/bookshop"

const MongoClient= require("mongodb").MongoClient
const client = new MongoClient(connectionString, {
    useNewUriParser:true,
    useUnifiedTopology:true
})
app.use(express.json())
/*
client.connect((err,connectedClient)=>{
    if (err) throw err;
    const db = connectedClient.db("bookshop");
    db.collection("books").find({}).toArray((err, result)=>{
        console.log(result)
    })
})
*/

app.get("/books",(req,res)=>{
    client.connect((err,connectedClient)=>{
        if (err) return res.status(500).json({message:err});
        const db = connectedClient.db("bookshop");
        db.collection("books").find({}).toArray((err, result)=>{
           if (err) {
               return res.status(500).json({message: result})
            }
            return res.status(200).json({books: result})
        })
    })
    
})

app.post("/books",(req,res)=>{
    client.connect((err,connectedClient)=>{
        if (err){ return res.status(500).json({message:err});
    }
        const db = connectedClient.db();
        db.collection("books").insertOne({
            author: req.body.author,
            title: req.body.title
        }, (err,result)=>{
            if (err) return res.status(500).json({message:err})
            return res.status(200).json({message:"New book added to bookshop"})
        
        })
          
    })
})

app.listen(4000,()=>console.log("Server up and running"))