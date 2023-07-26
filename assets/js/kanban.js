function addColumnToForm(){
   var formInputsDiv =  document.getElementById("formInputsDiv");
   
   var formInput = document.createElement('input');
   formInput.setAttribute('type','text');
   formInput.setAttribute('class','formColumnInput');
   formInput.setAttribute('required','required');
   formInput.setAttribute('placeholder','Enter Column Name');

   formInputsDiv.appendChild(formInput);
}


function preventSubmit(){
    var formColumnInput = document.getElementsByClassName('formColumnInput');
    if(formColumnInput === null){
        console.log("No Columns");
    } else{
        generateUserInfo();
    }
}

function generateUserInfo(){
    var UserName = document.getElementById('UsernameTB').value;
    var formInputs = document.getElementsByClassName('formColumnInput');
    var UserInfoArray = [];
    var UserInfo =[]; 

    UserInfoArray[0] = {'UserName': UserName}; 

    for(var i = 0; i < formInputs.length; i++){
        var j = i;
        UserInfo[i] = {"ID":j,"ColumnName":formInputs[i].value} 
    };

    UserInfoArray[1] = UserInfo;

    //console.log(UserInfoArray[1][2].ColumnName);
    console.log(UserInfoArray);

    localStorage.setItem("UserInfo", JSON.stringify(UserInfoArray));
    //location.reload();
    generateColumns();

}


function generateColumns(){
    var UserInfoJSON = localStorage.getItem("UserInfo");
    var Board = document.getElementById("Board");
    if(UserInfoJSON != null && UserInfoJSON != ""){
        UserInfoJSON = JSON.parse(UserInfoJSON);
        console.log(UserInfoJSON[1].length);
        document.getElementById('UserInfoForm').style.display = "none";
        document.getElementById("BoardContainer").style.display = "grid";
        document.getElementById("Board").style.display = "grid";


        for (var i = 0; i < UserInfoJSON[1].length; i++){
            
            var div = document.createElement("div");
            var divHeader =  document.createElement("div");
            var divContainter = document.createElement("div");
            var divAdd = document.createElement("div");

            divHeader.setAttribute("class", "boardColumnHeader");
            divContainter.setAttribute("class", "boardColumnContainer");
            divContainter.setAttribute("id", UserInfoJSON[1][i].ColumnName + "Container");
            
            divAdd.setAttribute("class", "boardColumnAddRow");
            divAdd.setAttribute("onclick", "AddRow('" + UserInfoJSON[1][i].ColumnName + "Container','" +UserInfoJSON[1][i].ColumnName  +   "')");
            
            div.setAttribute("class","boardColumn");
            div.setAttribute("id", "'" + UserInfoJSON[1][i].ColumnName);
            divHeader.innerText = UserInfoJSON[1][i].ColumnName;

            divAdd.innerText = " + Add  ";
            div.appendChild(divHeader);
            div.appendChild(divContainter);
            div.appendChild(divAdd);
            Board.appendChild(div);

        }
    }
}


// Add rows
function AddRow(Containeridname,Colname){
    var Containeridname = Containeridname;
    var Colname = Colname;
    var div = document.getElementById(Containeridname);

    var row = document.createElement('div');
    row.setAttribute("class",Colname+"Row");
    row.setAttribute("contentEditable","true");
    row.setAttribute("draggable","true");
    div.appendChild(row);

    addDragAndDrop();
}


function closeBoard() {
    localStorage.setItem("UserInfo", "");
    location.reload();

}


/*Drag and drop */


function addDragAndDrop(){
    var UserData = localStorage.getItem('UserInfo');
    var containers = document.getElementsByClassName('boardColumnContainer');

    UserData = JSON.parse(UserData);
    
    for(var i=0; i<UserData[1].length;i++){
        var ColumnName = UserData[1][i].ColumnName + "Container";
        var Container = document.getElementById(ColumnName);
        var rows = Container.children;
    


        Array.prototype.forEach.call(Container.children, row => {
            //console.log(row)

            row.addEventListener('dragstart',()=>{
                row.classList.add('dragging');
                console.log(row);
               
            })

            row.addEventListener('dragend',()=>{
                row.classList.remove('dragging');
                console.log(row);
               
            })

     

        });

    }


    // set event for containers

    Array.prototype.forEach.call(containers, container => {
        
        container.addEventListener('dragover',e =>{
           
           e.preventDefault();
           const row = document.getElementsByClassName('dragging')[0];
           container.appendChild(row);
           
        })


 

    });





}



