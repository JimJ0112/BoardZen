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
    var BoardContainer = document.getElementById("BoardContainer");
    if(UserInfoJSON != null && UserInfoJSON != ""){
        UserInfoJSON = JSON.parse(UserInfoJSON);
        console.log(UserInfoJSON[1].length);
        document.getElementById('UserInfoForm').style.display = "none";
        document.getElementById("BoardContainer").style.display = "grid";

        for(var i=0;i<UserInfoJSON[1].length;i++){
            var div = document.createElement("div");
            div.setAttribute("class","boardColumn");
            div.setAttribute("id", "'" + UserInfoJSON[1][i].ColumnName);
            div.innerText = UserInfoJSON[1][i].ColumnName;
            BoardContainer.appendChild(div);

        }
    }
}