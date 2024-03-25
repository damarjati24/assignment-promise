const readline = require('readline');
const validator = require('validator');
const fs = require('fs');

// mengubah function menjadi async/await
async function getUserInfo() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout 
    });
    
    function askQuestion(question, validatorFn, errorMessage) {
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                if (validatorFn == null || validatorFn(answer)) {
                    resolve(answer);
                } else {
                    console.log(errorMessage);
                    resolve(askQuestion(question, validatorFn, errorMessage));
                }
            });
        });
    }

    // blok try ini untuk membantu mengelola kesalahan dan memastikan kode asinkron berjalan dengan baik
    try {
        const name = await askQuestion("What is your name? ", null, "Name: invalid, please insert your name again");
        const number = await askQuestion("What is your PhoneNumber? ", (number) => validator.isMobilePhone(number, "id-ID"), 
        "PhoneNumber: invalid, please insert your number again");
        const email = await askQuestion("What is your email? ", (email) => validator.isEmail(email), 
        "Email: invalid, please insert your email again");
        console.log(`Name: ${name}\nPhoneNumber: ${number}\nEmail: ${email}`);
        
                const contact = {name,number,email};
                const file = fs. readFileSync('data/contacts.json', 'utf8');
                const contacts = JSON.parse(file);
                contacts.push(contact);
                fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
                console.log('Terimakasih sudah memasukkan data anda!');

    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        rl.close();
    }
}

module.exports = { getUserInfo };