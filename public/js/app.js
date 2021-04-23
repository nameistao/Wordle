//EVENT LISTENERS & Key Functions
//on startup (document load), we need to set the timer to pomodoroTimeLength
document.addEventListener("DOMContentLoaded", () => {
    minutes.textContent = (pomodoroTimeLength / 60).toString();
});

//start & stop button functionality & progress bar based on clicking start & stop button
startStop.addEventListener('click', () => {
    startStopFunction();
});

//timer switch functionality
timerSwitchButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        let btn = button.id;
        if(btn === 'pomodoro'){
            toPomodoroMode();
        }
        else if(btn === 'short-break'){
            toShortBreakMode();
        }
        else if(btn === 'long-break'){
            toLongBreakMode();
        }
    });
});

//for adding tasks based on clicked the add button
addTaskButton.addEventListener('click', () => {
    addTaskFunction();
});

//for filling out the settings modal upon clicking the settings button
settingsButton.addEventListener('click', () => {
    settingsPomodoroLength.value = pomodoroTimeLength / 60;
    settingsShortBreakLength.value = shortBreakTimeLength / 60;
    settingsLongBreakLength.value = longBreakTimeLength / 60;
});

//for saving settings upon clicking the save button
settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    pomodoroTimeLength = settingsPomodoroLength.value * 60;
    shortBreakTimeLength = settingsShortBreakLength.value * 60;
    longBreakTimeLength = settingsLongBreakLength.value * 60;
    startStop.textContent = 'Start';
    progressBar.style.width = '0%';
    clearInterval(timer);
    if(mode === 'pomodoro'){
        minutes.textContent = (pomodoroTimeLength / 60).toString();
        seconds.textContent = '00';
        currentTimeLength = pomodoroTimeLength;
    }
    else if(mode === 'shortBreak'){
        minutes.textContent = (shortBreakTimeLength / 60).toString();
        seconds.textContent = '00';
        currentTimeLength = shortBreakTimeLength;
    }
    else if(mode === 'longBreak'){
        minutes.textContent = (longBreakTimeLength / 60).toString();
        seconds.textContent = '00';
        currentTimeLength = longBreakTimeLength;
    }
    updateTitle();

    //if a user is logged in, need to update their timers in database
    if(loggedInEmail !== null && loggedInEmail !== undefined){
        updateTimers(loggedInEmail, pomodoroTimeLength, shortBreakTimeLength, longBreakTimeLength);
    }

    closeSettingsModalButton.click();
});

//for logout
buttonGroupLoginButton.addEventListener('click', () => {
    if(buttonGroupLoginButton.textContent === 'Logout'){
        //update button functionality and text
        buttonGroupLoginButton.setAttribute('data-bs-target', '#loginModal');
        buttonGroupLoginButton.textContent = 'Login';

        //update loggedInEmail
        loggedInEmail = null;
    }
});

//for login, sends info to back-end
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/server?mode=login&email=' + loginEmail.value + '&password=' + loginPassword.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                loginModalText.textContent = 'Status: ' + data.error;
            }
            //if login is successful
            else{
                //change login button to logout
                buttonGroupLoginButton.textContent = 'Logout';

                //change login status to email
                loggedInEmail = data.email;

                //update page with user information (timers)
                pomodoroTimeLength = data.pomodoroTime;
                shortBreakTimeLength = data.shortBreakTime;
                longBreakTimeLength = data.longBreakTime;

                switch(mode){
                    case 'pomodoro':
                        toPomodoroMode();
                        break;
                    case 'shortBreak':
                        toShortBreakMode();
                        break;
                    case 'longBreak':
                        toLongBreakMode();
                        break;
                }

                buttonGroupLoginButton.removeAttribute('data-bs-target');

                //TODO: update page with user information (tasks)

                //close the modal
                closeLoginModalButton.click();
            }
        });
    });
});

//for register, sends info to back-end
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    registerModalText.textContent = 'Status: Registering...';
    fetch('/server?mode=updateTimers&email=' + registerEmail.value + '&password=' + registerPassword.value).then((response) => {
        
        response.json().then((data) => {
            if(data.error){
                registerModalText.textContent = 'Status: ' + data.error;
            }
            //if registration is successful
            else{
                //display success and close out of modal, does not auto-log in
                registerModalText.textContent = 'Status: Success';
                registerEmail.value = '';
                registerPassword.value = '';
                closeRegisterModalButton.click();
                registerModalText.textContent = '';
                alert("Registration Success!");
            }
        });
    });
});
