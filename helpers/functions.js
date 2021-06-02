const parseTime = (cTime) => {
    if (cTime == '') return null;
    var d = new Date();
    var time = cTime.split(':');
    d.setHours(parseInt(time[0]));
    d.setMinutes(parseInt(time[1]));
    d.setSeconds(parseInt(time[2]));
    return d;
}
const formatAMPM = (date) => {
    const time = date.split(':');
    let hours = time[0];
    let minutes = time[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
const getTime = (minutes) => {
    let time = {
        "H": 0,
        "M": 0,
        "P": 0
    };
    increment(minutes);
    function increment(min) {
        if (min > 0 && min < 15) {
            time.P = time.P + 1;
        } else if (min >= 15 && min < 36) {
            time.M = time.M + 1;
        } else if (min >= 36 && min < 65) {
            time.H = time.H + 1;
        } else if (min > 64) {
            time.H = time.H + 1;
            increment(min - 60);
        }
    }

    return time;
}
module.exports = {
    parseTime,
    getTime,
    formatAMPM
}