const {PORT,emailuser, emailpw} = require("./config.json")
const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require("path")
app.use(express.static(path.join(__dirname,'public')));
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

const parseModule = require("./parser")
const mailModule = require("./mailer")

const lazyDB = []


app.post("/submit",(req,res)=>{
    console.log("Got request to submit a schedule")

    let inputText = req.body.schedule
    let inputEmail = req.body.email.trim().toLowerCase()
    let schedule = parseModule.parse(inputText.trim())
    let userData = {
      email: inputEmail,
      schedule: schedule
    }

    lazyDB.push(userData)
})

console.log(new Date().getDay(),new Date().getHours(), new Date().getMinutes())
const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
function checkReminders(){
  for (let userData of lazyDB){
    for (let course of userData.schedule){
      let shouldAlert = false;

      let currentDay = days[new Date().getDay()]
      if (course.days.includes(currentDay)){
        let inputTime = course.starttime;
        let clock = inputTime.split(" ")[0];
        let hour = clock.split(":")[0];
        let minute = clock.split(":")[1];
        hour = parseInt(hour);
        minute = parseInt(minute);
        if (inputTime.includes("PM")){
          hour+=12;
        }
        let classTime = hour * 60 + minute

        let myTime = new Date().getHours() * 60 + new Date().getMinutes();

        if (Math.ceil(classTime-myTime) == 15 ){ // there is a 15 minute difference
          if (course.hasAlerted == false){
            course.hasAlerted = true;
          }
          shouldAlert = true
        }else{
          course.hasAlerted = false
        }
      }

      if (shouldAlert){
        mailModule.classReminder(userData.email,course)
      }
    }
  }
}
setInterval(()=>{
  checkReminders()
}, 5*1000)
// Check reminders every 5 seconds or so

const { MailtrapClient } = require("mailtrap");

const TOKEN = "aeeb2d73f4d1a73f5b7d1cc314edc6f0";
const ENDPOINT = "https://send.api.mailtrap.io/";


