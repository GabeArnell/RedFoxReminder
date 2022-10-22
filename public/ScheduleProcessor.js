var dt = new Date();
document.getElementById('date-time').innerHTML=dt;
const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const email = document.getElementById("email")
const schedule = document.getElementById("schedule")
const image = document.getElementById("schedulephoto")

const button = document.getElementById("send")

button.onclick = function(){
    if ((fname.value == "") || (lname.value == "") || (email.value == ""))
    {
        return "Can't accept empty input";
    }
    console.log("Clicked!")
    console.log(fname.value)
    console.log(lname.value)
    console.log(email.value)
    console.log(schedule.value)
    console.log(image.value)
    fetch("/submit", {
        method: "POST",
        cache: "no-cache",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            schedule: schedule.value,
            image: image.value
        })
    });
    document.getElementById("classform").innerHTML = "Your responses have been submitted. Please await an email from us.";

}



