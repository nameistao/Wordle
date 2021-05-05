//HELPER FUNCTIONS
//switching to other modes
function toPomodoroMode(){
    minutes.textContent = (pomodoroTimeLength / 60).toString();
    seconds.textContent = '00';
    toPomodoroColor();
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
    toShortBreakColor();
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
    toLongBreakColor();
    startStop.textContent = 'Start';
    clearInterval(timer);
    currentTimeLength = longBreakTimeLength;
    progressBar.style.width = '0%';
    mode = 'longBreak';
    updateTitle();
}

//color scheme change functions
function toPomodoroColor(){
    document.body.style.backgroundColor = '#2f806d';
    document.getElementById('innerBox').style.backgroundColor = "#37957f";
    startStop.style.color = '#2f806d';
}

function toShortBreakColor(){
    document.body.style.backgroundColor = '#0E555E';
    document.getElementById('innerBox').style.backgroundColor = "#13707C";
    startStop.style.color = '#0E555E';
}

function toLongBreakColor(){
    document.body.style.backgroundColor = '#164779';
    document.getElementById('innerBox').style.backgroundColor = "#19528A";
    startStop.style.color = '#164779';
}

//for removing tasks
function removeTask(row){
    row.parentNode.parentNode.remove();
    removeTaskButtons = document.querySelectorAll('.removeTask');
    taskInputs = document.querySelectorAll('.tasks');
    updateTasks(loggedInEmail, tasksText);
}

//update title with time
function updateTitle(){
    document.title = minutes.textContent + ":" + seconds.textContent + " - Pomodororo";
}

//adding tasks based on text in task bar
function addTaskFunction(){
    let taskString = addTaskString.value;
    document.getElementById('tasks').insertAdjacentHTML('beforeend', "<div class='row'><div class='col-11 p-2'><input type='text' value='" + taskString + "' class='tasks form-control'></div><div class='col-1 p-2'><button onclick='removeTask(this)' class='removeTask btn btn-outline-light'><i class='fas fa-minus'></i></button></div></div>");
    addTaskString.value = null;
    removeTaskButtons = document.querySelectorAll('.removeTask');
    taskInputs = document.querySelectorAll('.tasks');
}

//start/stop functionality
function startStopFunction(){
    if(startStop.textContent === 'Start'){
        startStopButtonSound.play();
        startStop.textContent = 'Stop';
        startStop.classList.add('active');

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
        startStop.classList.remove('active');
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

//for updating user's tasks in database
function updateTasks(loggedInEmail, tasksText){
    //get all the data first and store it in tasksText
    tasksText.splice(0,tasksText.length);

    taskInputs.forEach( (input) => {
        tasksText.push(input.value);
    });

    //remove the first value
    tasksText.shift();

    //pass tasksText to back-end
    fetch('/server?mode=updateTasks&email=' + loggedInEmail + '&tasksText=' + tasksText).then((response) => {
        
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
            }
            //if update is successful
            else{
                alert("Update Success!");
            }
        });
    });
}