
const Tesseract = require("tesseract.js")

module.exports.run = (callbackFunction,imageFile)=>{
console.log("running image reader")

var classList = []
let par = ""
let week = ["Mon", "Tue", "Wed","Thu", "Fri"]
let g = 0


Tesseract.recognize(
  imageFile,
  'eng',
  //{ logger: m => console.log(m) }
).then(({ data: { text } }) => {
  for(let con = 0;con < text.length; con += 0)
  {
    console.log(con)
    let ins = ""
    let clas = ""
    let stime = ""
    let etime = ""
    let loc = ""
    let day = ""
    let space = 0
    //find class
    if(con == 0)
    {
      for(let x = text.indexOf("day") +5; space < 2; x++)
      {
        clas += text.charAt(x)

        if(!text.charAt(x).match(/[a-zA-Z]/i))
          space++
      }
    }
    else
    {
      for(let x = con; space < 2; x++)
      {
        clas += text.charAt(x)

        if(!text.charAt(x).match(/[a-zA-Z]/i))
          space++
      }
    }
    //determin if online class or not
    if(text.charAt(text.indexOf(clas) + clas.length+ 1).toLocaleLowerCase() != "o")
    {
      //find day
      let day2 = ""
      space = 0
      for(let x = text.indexOf(clas) + clas.length+ 1; space < 1; x++)
      {
        day += text.charAt(x)

        if(!text.charAt(x).match(/[a-zA-Z]/i))
          space++
      }
      console.log(text.charAt(text.indexOf(day) + day.length))
      let temp = text.substring(text.indexOf(day) + day.length, text.indexOf(day) + day.length+3)
      day2 = day
      if(week.includes(temp))
      {
        space = 0
        for(let x = text.indexOf(temp); space < 1; x++)
        {
          console.log(temp)
          day += text.charAt(x)

          if(!text.charAt(x).match(/[a-zA-Z]/i))
            space++
        }
      }
      //find start time
      space = 0
      let stime2 = ""
      for(let x = text.indexOf(day2) + day.length+ 5; !text.charAt(x).match(/[a-zA-Z]/i); x++)
      {
        stime += text.charAt(x)

        stime2 = stime

        console.log(stime)

        if((text.charAt(x+1).match(/[a-zA-Z]/i) && text.charAt(x+1).toLocaleLowerCase() == "a") && stime < 800)
          stime = "800 "

        if(text.charAt(x+1).match(/[a-zA-Z]/i) && text.charAt(x+1).toLocaleLowerCase() == "a")
        stime += "am"

        else if(text.charAt(x+1+con).match(/[a-zA-Z]/i))
        stime += "pm"

      }
      console.log(stime)
      //find end time
      space = 0
      for(let x = text.indexOf(stime2) + stime.length+ 4; !text.charAt(x).match(/[a-zA-Z]/i); x++)
      {
        etime += text.charAt(x)
        
        if(text.charAt(x+1).match(/[a-zA-Z]/i) && text.charAt(x).toLocaleLowerCase() == "p")
        etime += "pm"

        else if(text.charAt(x+1).match(/[a-zA-Z]/i))
        etime += "am"
      }
      //find location
      space = 0
      for(let x = text.indexOf(stime2) + stime.length + etime.length + 14; space < 3; x++)
      {
        loc += text.charAt(x)
        if(text.charAt(x).match(/[0-9]/i))
        {
          if(!text.charAt(x+1).match(/[0-9]/i))
            break;
        }
      }
    }
    else
    {
      loc = "online"
    }
    //find professor
      space = 0
      for(let x = text.indexOf("Inst") + 10; space < 2; x++)
      {
        ins += text.charAt(x)

        if(!text.charAt(x).match(/[a-zA-Z]/i))
          space++

          
      }
    
    var data = {
      class: clas,
      day: day,
      starttime: stime,
      endtime: etime,
      location: loc,
      professor: ins
    }
    classList.push(data)
    console.log("list",classList)
    console.log(text.indexOf(ins))

    if(con == 0)
      con += text.indexOf(ins) + ins.length +1

    else
      con += text.indexOf(ins) + ins.length +1 - text.indexOf("day")

  }

  //console.log(text)

  callbackFunction(classList)
})


}
