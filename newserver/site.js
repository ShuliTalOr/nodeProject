
//GET ALL ELEMENTS FROM THE SERVER AND SHOW THEM IN THE HTML PAGE AS A TABLE
async function getAll(){
    let body=await (await(fetch("/all"))).json();
    let strOption=``;
    let strTable=`
    <tr>
    <th>name</th>
    <th>domain</th>
    <th>web_page</th>
    <th>num of register students</th>
    <th>press to add register</th>
    </tr>
    `;

    for(let uni of body){
        strOption+=`<option>${uni.name}</option>`;
        strTable+=`
        <tr>
            <td>${uni.name}</td>
            <td>${uni.domain}</td>
            <td>${uni.web_page}</td>
            <td>${uni.counter}</td>
            <td>
                <button onclick="updateCounter('${uni.name}')" class="BTN">add register</button>
            </td>
        </tr>
        `;
        
        document.getElementById("unitable").innerHTML=strTable;  
        document.getElementById("unilist").innerHTML=strOption; 
    }
}
//UPDATE THE NUM OF STUDENT (INCREASE BY 1) OF SPECIFIC UNIVERSITY BY UNIVERSITY NAME
async function updateCounter(uname){
    let initParam= { 
        "method":"PUT",
         headers: {"Content-Type": "application/json"},
         body:`{"name": "${uname}"}`
    };

    let res=await(await(fetch(`/edit/${uname}`,initParam)));
    console.log(res.status);
    getAll();

}
//DELETE UNIVERSITY
async function deleteUni(){
    let uName=document.getElementById("unilist").value;
    let res=await (fetch(`/delete/${uName}`,{"method":"DELETE"}));
    console.log(res.status);
    getAll();
}

//ADD UNIVERSITY
async function addUni(){
    let uName=document.getElementById("newuniname").value;
    let uDomain=document.getElementById("newunidomain").value;
    let uaddress=document.getElementById("newuniaddress").value;
    let initParam= { 
        "method":"POST",
         headers: {"Content-Type": "application/json"},
         body:`{"domain":"${uDomain}","web_page":"${uaddress}","name": "${uName}","counter": 0 }`
    };
    
    let res=await (fetch("/add",initParam));

    //console.log(res.status);
    getAll();
}

//ONLOEAD ARROW FUNCTION TO RUN THE DATA FROM SERVER TO HTML PAGE BY GETALL FUNCTION
onload=()=>{
    getAll();
    //setInterval(getAll,2000);

}