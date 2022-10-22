const { MailtrapClient } = require("mailtrap");

const TOKEN = "0e50b14cb71ccddc66e803fde1943526";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@redfoxreminder.com",
  name: "Mailtrap Test",
};

module.exports.classReminder = (targetEmail,courseData)=>{
    
    const recipients = [
      {
        email: targetEmail,
      },
      {
        email: "gabearnell@gmail.com"
      }
    ];
    
    client
      .send({
        from: sender,
        to: recipients,
        subject: emailTemplate.subject.replace("[COURSE]",courseData.course),
        text: emailTemplate.content.replace("[COURSE]",courseData.course).replace("[STARTTIME]",courseData.starttime).replace("[LOCATION]",courseData.location),
        category: "Integration Test",
      })
      .then(console.log, console.error);
}

const emailTemplate = {
    subject: "[COURSE] in 15 minutes!",
    content: `Your [COURSE] class starts in 15 minutes at [STARTTIME]. It is located in [LOCATION].`
}
