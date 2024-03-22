const validator = require('validator');
const readline = require('readline');

function getUserInfo() {
    const rl= require('readline').createInterface ({
        input: process.stdin,
        output: process.stdout
    });

    function askQuestion(question, validatorFn, errorMessage, nextFunction) {
        rl.question(question, (answer) => {
            if (validatorFn == null|| validatorFn(answer)) 
            nextFunction(answer);
             else {
                console.log(errorMessage);
                askQuestion(question, validatorFn, errorMessage, nextFunction);
            }
        });
    }

    askQuestion("What is your name? ", null, "Name: invalid, please insert your name again", (name) => {
        
        askQuestion("What is your PhoneNumber? ", (number) => validator.isMobilePhone(number, "id-ID"), 
        "PhoneNumber: invalid, please insert your number again", (number) => {
            
            askQuestion("What is your email?", (email) => validator.isEmail(email), 
            "Email: invalid, please insert your email again", (email) => {
                console.log(`Name: ${name}\nPhoneNumber: ${number}\nEmail: ${email}`);
                rl.close();
            });
        });
    });
}
module.exports = { getUserInfo };