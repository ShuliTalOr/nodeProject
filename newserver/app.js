const express=require("express");
const app = express();
const bodyParser= require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

let universities=require("./uni.json");

//ADD COUNTER TO ALL UNIVERSITIES
for (let i = 0; i < universities.length; i++) {
    universities[i].counter=0;
}

//GET ALL UNIVERSITIES AND COLLAGES FROM SERVER
app.get("/all", (req,res)=>{
    res.status(200);
    res.send(universities);
});
 
//CREATE NEW UNIVERSITY 
app.post("/add", (req,res)=>{
            console.log("try to add: ", req.body);
            universities.push(req.body);
            res.status(201);
            res.send();           
});

//UPDATE UNIVERSITIES REGISTERS COUNTER BY NAME
app.put("/edit/:n",(req,res) => {
    let univ=universities.find( u=> u.name == req.params.n);
    if(univ != undefined){
        univ.counter++;
    }
    res.status(200);
    res.send();
    }
);

//DELETE UNIVERSITY BY NAME
app.delete("/delete/:name",(req,res) => {
    universities=universities.filter(n=>n.name != req.params.name);
    res.status(204);
    res.send();
});

// LISTENING TO PORT 9000
app.listen(8000,()=>{console.log("ok")});