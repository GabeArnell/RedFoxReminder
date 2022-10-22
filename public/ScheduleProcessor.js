const form = document.querySelector('#classform')

const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const email = document.getElementById("email")
const schedule = document.getElementById("schedule")

const button = document.getElementById("send")

button.onclick = function(){
    console.log("Clicked!")
    console.log(fname.value)
    console.log(lname.value)
    console.log(email.value)
    console.log(schedule.value)

    fetch("/submit", {
        method: "POST",
        cache: "no-cache",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            schedule: schedule.value
        })
    });
    document.getElementById("classform").innerHTML = "Your responses have been submitted. Please await an email from us.";

}


/* listen for submit even
form.addEventListener('submit', event => {
   // disable default action
   event.preventDefault()

   // configure a request
   const xhr = new XMLHttpRequest()
   xhr.open('POST', '/classes')
 
   // prepare form data
   let data = new FormData(form)
 
   // set headers
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
 
   // send request
   xhr.send(data)
 
   // listen for `load` event
   xhr.onload = () => {
     console.log(xhr.responseText)
   }
})
*/
