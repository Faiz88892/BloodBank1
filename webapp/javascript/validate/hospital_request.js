function validateForm(){
    let hospitalName=document.getElementById("hospital_name").value.trim();
    let bloodUnits=document.getElementById("blood_units").value.trim();

    if(hospitalName===" "){
        alert("please enter hospital name");
        return false;
    }
    bloodUnits=number(bloodUnits);
    if(bloodUnits<=0){
        alert("please enter a valid unit");
        return false;
    }
    return true;
}