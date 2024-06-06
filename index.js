const inputs = document.querySelectorAll('input');
const errorFeedbacks = document.querySelectorAll('.error');
const checkFields = document.querySelectorAll('.valid');
const form = document.querySelector('form');
const password2 = document.getElementById('password2');
const password1 = document.getElementById('password1');

inputs.forEach(input => input.addEventListener('blur', (e) => {
    validate(input)
}))

inputs.forEach(input => input.addEventListener('input', (e) => {
    const errorFeedback = input.nextElementSibling;
    const validFeedback = errorFeedback.nextElementSibling;
    
    errorFeedback.style.display = 'none';
    validFeedback.style.display = 'none';
}))

function validate(input) {
    const errorFeedback = input.nextElementSibling;
    const validFeedback = errorFeedback.nextElementSibling;
    
    //check passwordsd match    
    if (input === password2) {
        if (password2.value !== password1.value) {
            errorFeedback.textContent = "⚠️ Passwords do not match.";
            errorFeedback.style.display = 'block';
        }
        return
    }
    //check constraints
    if (input.validity.valueMissing){   
        console.log("emptyyyy")
        errorFeedback.textContent = "⚠️ Please fill out this field"
        errorFeedback.style.display = 'block';
    } else if ( input.validity.typeMismatch) {
        errorFeedback.textContent = `⚠️ Ensure you have entered the correct ${input.type} format`
        errorFeedback.style.display = 'block';
    } else if (input.validity.tooLong) {
        errorFeedback.textContent = "⚠️ Exceeded maximum character length"
        errorFeedback.style.display = 'block';
    } else if (input.validity.tooShort) {
        errorFeedback.textContent = "⚠️ Too short. Below expected length"
        errorFeedback.style.display = 'block';
    } else if (input.validity.patternMismatch) {
        if (input.type == 'password'){
            errorFeedback.innerHTML = 
            `Password Should: <br>
            ⚠️ Be at least 8 characters long.<br>
            ⚠️ Contain both uppercase and lowercase letters.<br>
            ⚠️ Include at least one numeric digit.<br>
            ⚠️ Contain at least one special character.<br>`;
        
            errorFeedback.style.display = 'block';
        } else {
            console.log("New mismatch")
            errorFeedback.textContent = '⚠️ Kindly match the requested format'
            errorFeedback.style.display = 'block';
        }
    } else if (input.validity.valid){
        validFeedback.style.display='block';
    }
    
}
form.addEventListener('submit',(e) =>{
    if (!form.checkValidity() || (password1.value !== password2.value)) {
        e.preventDefault();
        alert("Kindly Revise the form for errors")
    }
})