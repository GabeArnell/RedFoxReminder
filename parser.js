const imageModule = require("./image-reader")

module.exports.parse = async (callback,imageFile)=>{

    imageModule.run(callback,imageFile)

    return;

    // placeholder
    return ([
        {
            course: "Intro to Programming",
            instructor: "Professor Tokash",
            location: "HC ROOM 2021",
            days: ["monday","friday"],
            starttime: "8:00 AM",
            endtime: "9:15 AM",
            hasAlerted: false,
        },
        {
            course: "Cosmology",
            instructor: "Professor Sivers",
            location: "DN ROOM 185",
            day: ["thursday"],
            starttime: "5:00 PM",
            endtime: "6:15 PM",
            hasAlerted: false,
        }
    ])
}