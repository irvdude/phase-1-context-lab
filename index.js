/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(array) {
    const employeeRecords = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecords
}


function createEmployeeRecords(employeeData) {
    let employeeRecords = [];

    employeeData.forEach(function (array) {
        let employeeRecord = {
            firstName: array[0],
            lastName: array[1],
            employeeId: array[2],
            timeInEvents: [],
            timeOutEvents: []
        };
        employeeRecords.push(employeeRecord);
    });

    return employeeRecords;
}

function createTimeInEvent(employeeRecord, timestamp) {
    let timeInEvent = {
        type: "TimeIn",
        date: timestamp.split(" ")[0],
        hour: parseInt(timestamp.split(" ")[1])
    };

    employeeRecord.timeInEvents.push(timeInEvent);

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timestamp) {
    let timeOutEvent = {
        type: "TimeOut",
        date: timestamp.split(" ")[0],
        hour: parseInt(timestamp.split(" ")[1])
    };

    employeeRecord.timeOutEvents.push(timeOutEvent);

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(function (e) {
        return e.date === date
    })

    const timeOutEvent = employeeRecord.timeOutEvents.find(function (e) {
        return e.date === date
    })

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100

    return hoursWorked

}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const hourlyWage = employeeRecord.payPerHour
    const wagesEarned = hoursWorked * hourlyWage

    return wagesEarned
}