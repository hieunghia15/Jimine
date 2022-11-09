import axios from "axios";

function convertDataJSIntoDateInput(dateInJS) {
    var tzoffset = (dateInJS).getTimezoneOffset() * 60000;
    var dateInInput = new Date(dateInJS - tzoffset).toISOString().substring(0, 10);
  
    return dateInInput;
  }

async function getTotalTasksInYear(year) {
    var projectID = localStorage.getItem("IdProject");

    var totalTasksInYear = await axios.get(
                        "http://localhost:5000/api/issue/count/idProject/"
                        + projectID + "/year/" + year);
    totalTasksInYear = totalTasksInYear.data.totalTasksInYear;

    return totalTasksInYear;
}

function getWeekBeforeDate(lastDate) {
    var yearOfLastDate = lastDate.getFullYear();
    var monthOfLastDate = lastDate.getMonth();
    var dateOfLastDate = lastDate.getDate();
    var aWeekBeforeLastDate = [
        new Date(yearOfLastDate, monthOfLastDate, dateOfLastDate - 6),
        new Date(yearOfLastDate, monthOfLastDate, dateOfLastDate - 5),
        new Date(yearOfLastDate, monthOfLastDate, dateOfLastDate - 4),
        new Date(yearOfLastDate, monthOfLastDate, dateOfLastDate - 3),
        new Date(yearOfLastDate, monthOfLastDate, dateOfLastDate - 2),
        new Date(yearOfLastDate, monthOfLastDate, dateOfLastDate - 1),
        new Date(yearOfLastDate, monthOfLastDate, dateOfLastDate)
    ];

    return aWeekBeforeLastDate;
}

async function getTotalTasksByStatusInWeek(lastDate, memberID) {
    var aWeekBeforeLastDate = getWeekBeforeDate(lastDate);
    var statuses = await axios.get("http://localhost:5000/api/status/sort/stt");
    statuses = statuses.data;
   
    var statusIDs = new Array(statuses.length);
    var statusNames = new Array(statuses.length);
    for(var i = 0; i < statuses.length; i++) {
        statusIDs[i] = statuses[i]._id;
        statusNames[i] = statuses[i].Name;
    }

    var totalTasksByStatusID = {};
    statusIDs.forEach(statusID => { 
        totalTasksByStatusID[statusID] = new Array(7).fill(0); 
    });

    var projectID = localStorage.getItem("IdProject");
    for(var i = 0; i < aWeekBeforeLastDate.length; i++) {
        var date = aWeekBeforeLastDate[i];

        var totalTasksInADate = await axios.get(
            "http://localhost:5000/api/report/user/count/task/by/status/idProject/"
            + projectID + "/date/" + convertDataJSIntoDateInput(date));

        if(!totalTasksInADate.data.status) {
            continue;
        }

        totalTasksInADate = totalTasksInADate.data.status.Total_Tasks;
        if(!memberID) {
            totalTasksInADate.forEach(totalTasksOfMember => {
                Object.keys(totalTasksOfMember).forEach(statusID => {
                    if(statusID !== "userID" && statusIDs.includes(statusID)) {
                        totalTasksByStatusID[statusID][i] += totalTasksOfMember[statusID];
                    }
                }) ;
            })
        } else {
            for(var j = 0; j < totalTasksInADate.length; j++) {
                var totalTasksOfMember = totalTasksInADate[j]
                if(totalTasksOfMember.userID == memberID) {
                    Object.keys(totalTasksOfMember).forEach(statusID => {
                        if(statusID !== "userID" && statusIDs.includes(statusID)) {
                            totalTasksByStatusID[statusID][i] += totalTasksOfMember[statusID];
                        }
                    });
                    break;
                }
            }
        }
    }

    var totalTasksByStatusName = {}
    for(var i = 0; i < statusIDs.length; i++) {
        var statusID = statusIDs[i];
        var statusName = statusNames[i];
        totalTasksByStatusName[statusName] = totalTasksByStatusID[statusID];
    }

    return totalTasksByStatusName;
}

export { 
    convertDataJSIntoDateInput, 
    getTotalTasksInYear, 
    getWeekBeforeDate,
    getTotalTasksByStatusInWeek
}