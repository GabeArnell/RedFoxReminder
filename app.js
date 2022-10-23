const {PORT,emailuser, emailpw} = require("./config.json")
const express = require('express')
const app = express()
const formidable = require('formidable');
const fs = require('fs');

// default options
//app.use(express.json())

const path = require("path")
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

const parseModule = require("./parser")
const mailModule = require("./mailer")

const lazyDB = []

//mainpage
app.get("/",(req,res)=>{
  fs.readFile('public/index.html', function (error, data){
      if (error){
          res.writeHead(404);
          res.write('Error: Shard not found.');
      }else{
          res.write(data);
      }
      res.end()
  })
  console.log('main hit')
})
app.get("/ScheduleProcessor.js",(req,res)=>{
  fs.readFile('public/ScheduleProcessor.js', function (error, data){
      if (error){
          res.writeHead(404);
          res.write('Error: Shard not found.');
      }else{
          res.write(data);
      }
      res.end()
  })
})
app.get("/Schedule_Reminder.css",(req,res)=>{
  fs.readFile('public/Schedule_Reminder.css', function (error, data){
      if (error){
          res.writeHead(404);
          res.write('Error: Shard not found.');
      }else{
          res.write(data);
      }
      res.end()
  })
})

app.post("/submit",(req,res)=>{
  console.log("Got request to submit a schedule")

  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    let downloadPath = './uploads/image.png'
    console.log("Fields", fields)
    console.log("files",files)
    if (err) {
      console.log('errored out', err)
      return;
    }

    let inputEmail = fields.email;
    let imageFile = files.image;
    let filepath = imageFile.filepath;   // this gives error
    console.log(filepath)
    let newpath = downloadPath;

    //Copy the uploaded file to a custom folder
    fs.rename(filepath, newpath, function () {
      //Send a NodeJS file upload confirmation message
      console.log('NodeJS File Upload Success! to ',newpath);
    });


    parseModule.parse(callback, newpath)
    function callback(schedule){
      let userData = {
        email: inputEmail,
        schedule: schedule
      }
      lazyDB.push(userData)
      res.json(schedule[0]);     
      res.end();
  
    }


  });
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

