const nodemailer = require("nodemailer");


const emailTemplate = {
    subject: "[COURSE] in 15 minutes!",
    content: `Your [COURSE] class starts in 15 minutes at [STARTTIME]. It is located in [LOCATION].`
}

// async..await is not allowed in global scope, must use a wrapper
const {emailUser,emailPassword} = require("./config.json")
module.exports.classReminder = async (targetEmail,courseData)=>{
    let mailContent = {
        subject: emailTemplate.subject.replace("[COURSE]",courseData.course),
        text: emailTemplate.content.replace("[COURSE]",courseData.course).replace("[STARTTIME]",courseData.starttime).replace("[LOCATION]",courseData.location),
    }
      // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: emailUser, 
      pass: emailPassword,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'mail@redfoxreminder.com', // sender address
    to: "gabearnell@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    
}

/*
module.exports.classReminder("gabearnell@gmail.com",{
    course: "Testcourse",
    starttime: "9:30 PM",
    location: "Student Center"
})
*/