//EVENT LISTENERS & Key Functions
//on startup (document load), we need to set the timer to pomodoroTimeLength
document.addEventListener("DOMContentLoaded", function(){
    minutes.textContent = (pomodoroTimeLength / 60).toString();
});

//start & stop button functionality & progress bar based on clicking start & stop button
startStop.addEventListener('click',function(){
    startStopFunction();
});

//functionality based on keyboard keys
document.body.onkeyup = function(e){
    switch(e.keyCode){
        //for adding tasks based on clicking enter
        case 13:
            addTaskFunction();
            break;
    } 
}

//timer switch functionality
timerSwitchButtons.forEach(function(button){
    button.addEventListener('click',function(){
        let btn = button.textContent;
        if(btn === 'Pomodoro'){
            toPomodoroMode();
        }
        else if(btn === 'Short Break'){
            toShortBreakMode();
        }
        else if(btn === 'Long Break'){
            toLongBreakMode();
        }
    });
});

//for adding tasks based on clicked the add button
addTaskButton.addEventListener('click',function(){
    addTaskFunction();
});

//for filling out the settings modal upon clicking the settings button
settingsButton.addEventListener('click',function(){
    settingsPomodoroLength.value = pomodoroTimeLength / 60;
    settingsShortBreakLength.value = shortBreakTimeLength / 60;
    settingsLongBreakLength.value = longBreakTimeLength / 60;
});

//for saving settings upon clicking the save button
saveSettings.addEventListener('click', function(){
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
});

//for login, sends info to back-end
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/server?mode=login&email=' + loginEmail.value + '&password=' + loginPassword.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                alert(data.error);
            }
            else{
                alert(data);
            }
        });
    });
});

//for register, sends info to back-end
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    registerModalText.textContent = 'Status: Registering...';
    fetch('/server?mode=register&email=' + registerEmail.value + '&password=' + registerPassword.value).then((response) => {
        
        response.json().then((data) => {
            if(data.error){
                registerModalText.textContent = 'Status: ' + data.error;
            }
            //if registration is successful, close out of the modal
            else{
                registerModalText.textContent = 'Status: Success';
                registerEmail.value = '';
                registerPassword.value = '';
                closeRegisterModalButton.click();
                registerModalText.textContent = '';
            }
        });
    });
});
