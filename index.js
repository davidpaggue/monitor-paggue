const status = require('./status')

//url = "https://app.paggue.io"
let url = "https://app.paggue.io/users/sign_in"
    time = 3600000 //1hrs

function check() {
    status(url);
    setTimeout(check, time);
}
check();