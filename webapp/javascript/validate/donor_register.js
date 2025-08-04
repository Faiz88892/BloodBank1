function validateForm(){
    let name=document.getElementById("name").value.trim();
    let city=document.getElementById("city").value.trim();
    let contact=document.getElementById("contact").value.trim();
    if(name===""){
        alert("please enter a full name");
        return false;
    }
    if(city===""){
        alert("please enter city name");
        return false;
    }
    if(contact.length!=10){
        alert("please enter a valid contact number");
        return false;
    }
    return true;
}