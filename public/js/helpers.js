//HELPER FUNCTIONS
//switching to other modes
function toPomodoroMode(){
    minutes.textContent = (pomodoroTimeLength / 60).toString();
    seconds.textContent = '00';
    toRed();
    startStop.textContent = 'Start';
    clearInterval(timer);
    currentTimeLength = pomodoroTimeLength;
    progressBar.style.width = '0%';
    mode = 'pomodoro';
    updateTitle();
}

function toShortBreakMode(){
    minutes.textContent = (shortBreakTimeLength / 60).toString();
    seconds.textContent = '00';
    toGreen();
    startStop.textContent = 'Start';
    clearInterval(timer);
    currentTimeLength = shortBreakTimeLength;
    progressBar.style.width = '0%';
    mode = 'shortBreak';
    updateTitle();
}

function toLongBreakMode(){
    minutes.textContent = (longBreakTimeLength / 60).toString();
    seconds.textContent = '00';
    toBlue();
    startStop.textContent = 'Start';
    clearInterval(timer);
    currentTimeLength = longBreakTimeLength;
    progressBar.style.width = '0%';
    mode = 'longBreak';
    updateTitle();
}

//color scheme change functions
function toRed(){
    document.body.style.backgroundColor = '#db524d';
    document.getElementById('innerBox').style.backgroundColor = "#df645f";
}

function toGreen(){
    document.body.style.backgroundColor = '#468e91';
    document.getElementById('innerBox').style.backgroundColor = "#599a9c";
}

function toBlue(){
    document.body.style.backgroundColor = '#437ea7';
    document.getElementById('innerBox').style.backgroundColor = "#568bb1";
}

//for removing tasks
function removeTask(row){
    row.parentNode.parentNode.remove();
}

//update title with time
function updateTitle(){
    document.title = minutes.textContent + ":" + seconds.textContent + " - Pomodororo";
}

//adding tasks based on text in task bar
function addTaskFunction(){
    let taskString = addTaskString.value;
    document.getElementById('tasks').insertAdjacentHTML('beforeend', "<div class='row'><div class='col-11 p-2'><input type='text' value='" + taskString + "' class='tasks form-control'></div><div class='col-1 p-2'><button onclick='removeTask(this)' id='removeTask' class='btn btn-outline-light'><i class='fas fa-minus'></i></button></div></div>");
    addTaskString.value = null;
    removeTaskButtons = document.querySelectorAll('.removeTask');
}

//start/stop functionality
function startStopFunction(){
    if(startStop.textContent === 'Start'){
        startStopButtonSound.play();
        startStop.textContent = 'Stop';

        let sec = +seconds.textContent;
        let min = +minutes.textContent;
        timer = setInterval(function(){
            if(sec === 0 && min === 0){
                clearInterval(timer);
                timesUpSound.play();
                if(mode === 'pomodoro'){
                    toShortBreakMode();
                }
            }
            else if(sec === 0){
                sec = 59;
                minutes.textContent = --min;
            }
            else{
                --sec;
            }
            if(sec<10){
                seconds.textContent = "0" + sec.toString();
            }
            else{
                seconds.textContent = sec;
            }
            updateTitle();
        },1000);

        //start progres bar
        progressBarFunction = setInterval(function(){
            let progressBarWidth = ((+minutes.textContent) * 60 + (+seconds.textContent)) / currentTimeLength;
            progressBarWidth = (100-progressBarWidth*100).toString() + "%";
            progressBar.style.width = progressBarWidth;
        }, 1000);
    }
    else{
        startStopButtonSound.play();
        startStop.textContent = 'Start';
        clearInterval(timer);
        clearInterval(progressBarFunction);
    }
}

//for updating user's timers in database
function updateTimers(loggedInEmail, pomodoroTimeLength, shortBreakTimeLength, longBreakTimeLength){
    fetch('/server?mode=updateTimers&email=' + loggedInEmail + '&pomodoroTime=' + pomodoroTimeLength + '&shortBreakTime=' + shortBreakTimeLength + '&longBreakTime=' + longBreakTimeLength).then((response) => {
        
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
            }
            //if update is successful
            else{
                console.log(data);
            }
        });
    });
}