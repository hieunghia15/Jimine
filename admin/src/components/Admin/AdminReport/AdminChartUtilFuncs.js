const axios = require("axios");

function convertDataJSIntoDateInput(dateInJS) {
    var tzoffset = (dateInJS).getTimezoneOffset() * 60000;
    var dateInInput = new Date(dateInJS - tzoffset).toISOString().substring(0, 10);
  
    return dateInInput;
}

function getDaysDifferentBetweenTwoDates(date1, date2) {
    return Math.abs(Math.floor(date1 - date2) / (1000 * 60 * 60 * 24)) + 1;     
}

function getNDaysBeforeDate(numOfDays, lastDate) {
    var yearOfLastDate = lastDate.getFullYear();
    var monthOfLastDate = lastDate.getMonth();
    var dateOfLastDate = lastDate.getDate();
    var nDaysBeforeLastDate = [];

    for(var i = numOfDays - 1; i >= 0 ; i--) {
        nDaysBeforeLastDate.push(
            new Date(yearOfLastDate, monthOfLastDate, dateOfLastDate - i)
        );
    }

    return nDaysBeforeLastDate;
  }

async function getTotalProjectsAndTasksInNDay(numOfDays, lastDate) {
    var nDaysBeforeLastDate = getNDaysBeforeDate(numOfDays, lastDate);
    var totalProjects = new Array(numOfDays).fill(0);
    var totalTasks = new Array(numOfDays).fill(0);

    for(var i = 0; i < numOfDays;i++) {
        var date = convertDataJSIntoDateInput(nDaysBeforeLastDate[i]);

        var totalProjectsInADay = await axios.get("http://localhost:5000/api/project/"
                                                    + "count/createAt/" + date);
        totalProjects[i] = totalProjectsInADay.data.soLuong;

        var totalTasksInADay = await axios.get("http://localhost:5000/api/issue/"
                                                    + "count/createAt/" + date);
        totalTasks[i] = totalTasksInADay.data.soLuong;
    }
    
    return [totalProjects, totalTasks];
}


export {
    convertDataJSIntoDateInput, 
    getDaysDifferentBetweenTwoDates, 
    getNDaysBeforeDate, 
    getTotalProjectsAndTasksInNDay
}