(function() {
    // listen form submit
    document.getElementById('signupForm').addEventListener("submit", function(e) {
        e.preventDefault();

        // collect values
        var signupValues = {
            firstname: document.getElementById('nameInput').value,
            lastname: document.getElementById('lnameInput').value,
            address: document.getElementById('addressInput').value,
            birthday: document.getElementById('birthdayInput').value,
            gender: document.getElementById('genderInput').value,
            notes: document.getElementById('textareaInput').value
        };

        // add user & update listing
        if(checkForm(signupValues)) {
            // add user
            userAdd(signupValues);

            // reset form
            document.getElementById("signupForm").reset();

            // update listing
            tableListing(
                document.querySelector('.users > table tbody'),
                'users'
            );
        }

        return false;
    });

    // users listing
    tableListing(
        document.querySelector('.users > table tbody'),
        'users'
    );
 })();