var dt = new Date();
document.getElementById('date-time').innerHTML=dt;

function finishedSending(){
    document.getElementById("classform").innerHTML = "Your responses have been submitted. Please await an email from us.";
}



/*

const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const email = document.getElementById("email")
const schedule = document.getElementById("schedule")
const image = document.getElementById("schedulephoto")

const button = document.getElementById("send")

button.onclick = function(){
    if ((fname.value == "") || (lname.value == "") || (email.value == ""))
    {
        alert("Can't accept empty input");
        return;
    }
    if (image.files.length < 1){
        alert("Submit Schedule Screenshot")
        return;
    }
    console.log("Clicked!")
    console.log(fname.value)
    console.log(lname.value)
    console.log(email.value)
    console.log(image.files[0])
    const formData = new FormData();
    formData.append('imagefile', image.files[0]);
    formData.append('email', email.value);
        
    fetch("/submit", {
        method: "POST",
        cache: "no-cache",
        headers: [["Content-Type", "application/json"]],
        body: formData
    });

}

*/