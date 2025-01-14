// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
let signupform = document.getElementById('signup-form');
let errorMsg = document.getElementById("error");



if(signupform){
    signupform.addEventListener('submit', (event) => {
        console.log('Form submission fired');
        event.preventDefault();

        errorMsg.innerHTML = '';
        let firstName = document.getElementById('firstName').value.trim();
        let lastName = document.getElementById('lastName').value.trim();
        let userId = document.getElementById('userId').value.trim();
        let password = document.getElementById('password').value.trim();
        let confirmPassword = document.getElementById('confirmPassword').value.trim();
        let favoriteQuote = document.getElementById('favoriteQuote').value.trim();
        let backgroundColor = document.getElementById('backgroundColor').value.trim();
        let fontColor = document.getElementById('fontColor').value.trim();
        let role = document.getElementById('role').value.trim();

        let validatedForm = true;

        if(firstName === "" || lastName === "" || userId === "" ||  password === "" ||  confirmPassword === "" || favoriteQuote === "" || backgroundColor === "" || fontColor === "" || role ==="" ){
            let p = document.createElement('p');
            p.innerHTML = "Please Make sure the Field Inputs are not empty";
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(firstName.length<2 || lastName.length<2 || firstName.length>25 || lastName.length>25){
            let p = document.createElement('p');
            p.innerHTML = "Firstname and Lastname should be between 2 and 25 characters";
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(userId.length<5 || userId.length>10){
            let p = document.createElement('p');
            p.innerHTML = "UserId should be more than 5 characters and less than 10 characters";
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(/\d/.test(firstName) || /\d/.test(lastName) || /\d/.test(userId)){
            let p = document.createElement('p');
            p.innerHTML = "First Name, Last Name and UserId should not contain numbers.";
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(password.trim().length < 8){
            let p = document.createElement('p');
            p.innerHTML = 'Password must be minimum 8 characters';
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        for(let i=0;i<password.length;i++){
            if(password[i] == ' '){
                let p = document.createElement('p');
                p.innerHTML = 'Password Must not contain a space.';
                errorMsg.appendChild(p);
                validatedForm = false;
                event.preventDefault();

            }
        }

        if(!/[A-Z]/.test(password) || !/\d/.test(password)){
            let p = document.createElement('p');
                p.innerHTML = 'Password should contain atleast one uppercase character and one number.';
                errorMsg.appendChild(p);
                validatedForm = false;
                event.preventDefault();
        }
      
        if(!/[^a-zA-Z0-9\s]/.test(password)){
            let p = document.createElement('p');
            p.innerHTML = 'Password Should contain atleast one special character.';
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(password !== confirmPassword){
            let p = document.createElement('p');
            p.innerHTML = "Password and Confirm Password fields should be equal";
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(favoriteQuote.trim().length < 20 || favoriteQuote.trim().length > 255){
            let p = document.createElement('p');
            p.innerHTML = 'Favourite Quote should contain more than 20 and less than 255 characters';
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        if(!hexPattern.test(backgroundColor.trim()) || !hexPattern.test(fontColor.trim())){
            let p = document.createElement('p');
            p.innerHTML = `Background Color or Font color are not the valid hex codes.`;
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(backgroundColor.toLowerCase().trim() === fontColor.toLowerCase().trim()){
            let p = document.createElement('p');
            p.innerHTML = `Background Color and Font Color cannot be the same.`;
            errorMsg.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(validatedForm){
            event.target.submit();
        }else{
            event.preventDefault();
        }
    });
}

let signinform = document.getElementById('signin-form');
let signinError = document.getElementById("signin-error");

if(signinform){
    signinform.addEventListener('submit', (event) => {
        console.log('Form submission fired');
        event.preventDefault();

        signinError.innerHTML = '';

        let userId = document.getElementById('user_id').value.trim();
        let password = document.getElementById('password').value.trim();

        let validatedForm = true;

        console.log(userId);

        if(!userId || !password){
            let p = document.createElement('p');
            p.innerHTML = 'UserId or Password not provided';
            signinError.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(userId.length<5 || userId.length>10){
            let p = document.createElement('p');
            p.innerHTML = "UserId should be more than 5 characters and less than 10 characters";
            signinError.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if (/\d/.test(userId)){
            let p = document.createElement('p');
            p.innerHTML = "First Name, Last Name and UserId should not contain numbers.";
            signinError.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(password.trim().length < 8){
            let p = document.createElement('p');
            p.innerHTML = 'Password must be minimum 8 characters';
            signinError.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        for(let i=0;i<password.length;i++){
            if(password[i] == ' '){
                let p = document.createElement('p');
                p.innerHTML = 'Password Must not contain a space.';
                signinError.appendChild(p);
                validatedForm = false;
                event.preventDefault();

            }
        }

        if(!/[A-Z]/.test(password) || !/\d/.test(password)){
            let p = document.createElement('p');
                p.innerHTML = 'Password should contain atleast one uppercase character and one number.';
                signinError.appendChild(p);
                validatedForm = false;
                event.preventDefault();
        }
      
        if(!/[^a-zA-Z0-9\s]/.test(password)){
            let p = document.createElement('p');
            p.innerHTML = 'Password Should contain atleast one special character.';
            signinError.appendChild(p);
            validatedForm = false;
            event.preventDefault();
        }

        if(validatedForm){
            event.target.submit();
        }else{
            event.preventDefault();
        }
    });
}