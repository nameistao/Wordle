document.addEventListener("DOMContentLoaded",(()=>{minutes.textContent=(pomodoroTimeLength/60).toString()})),startStop.addEventListener("click",(()=>{startStopFunction()})),timerSwitchButtons.forEach((t=>{t.addEventListener("click",(()=>{let e=t.id;"pomodoro"===e?toPomodoroMode():"short-break"===e?toShortBreakMode():"long-break"===e&&toLongBreakMode()}))})),addTaskButton.addEventListener("click",(()=>{addTaskFunction()})),settingsButton.addEventListener("click",(()=>{settingsPomodoroLength.value=pomodoroTimeLength/60,settingsShortBreakLength.value=shortBreakTimeLength/60,settingsLongBreakLength.value=longBreakTimeLength/60})),settingsForm.addEventListener("submit",(t=>{t.preventDefault(),pomodoroTimeLength=60*settingsPomodoroLength.value,shortBreakTimeLength=60*settingsShortBreakLength.value,longBreakTimeLength=60*settingsLongBreakLength.value,startStop.textContent="Start",progressBar.style.width="0%",clearInterval(timer),"pomodoro"===mode?(minutes.textContent=(pomodoroTimeLength/60).toString(),seconds.textContent="00",currentTimeLength=pomodoroTimeLength):"shortBreak"===mode?(minutes.textContent=(shortBreakTimeLength/60).toString(),seconds.textContent="00",currentTimeLength=shortBreakTimeLength):"longBreak"===mode&&(minutes.textContent=(longBreakTimeLength/60).toString(),seconds.textContent="00",currentTimeLength=longBreakTimeLength),updateTitle(),null!==loggedInEmail&&void 0!==loggedInEmail&&updateTimers(loggedInEmail,pomodoroTimeLength,shortBreakTimeLength,longBreakTimeLength),closeSettingsModalButton.click()})),buttonGroupLoginButton.addEventListener("click",(()=>{"Logout"===buttonGroupLoginButton.textContent&&(buttonGroupLoginButton.setAttribute("data-bs-target","#loginModal"),buttonGroupLoginButton.setAttribute("data-bs-toggle","modal"),buttonGroupLoginButton.textContent="Login",loggedInEmail=null,titleText.textContent="Pomodororo")})),loginForm.addEventListener("submit",(t=>{t.preventDefault(),loginModalText.textContent="Status: Logging in...",fetch("/server?mode=login&email="+loginEmail.value.toLowerCase().trim()+"&password="+loginPassword.value).then((t=>{t.json().then((t=>{if(t.error)loginModalText.textContent="Status: "+t.error;else{switch(buttonGroupLoginButton.textContent="Logout",loggedInEmail=t.email,pomodoroTimeLength=t.pomodoroTime,shortBreakTimeLength=t.shortBreakTime,longBreakTimeLength=t.longBreakTime,mode){case"pomodoro":toPomodoroMode();break;case"shortBreak":toShortBreakMode();break;case"longBreak":toLongBreakMode()}buttonGroupLoginButton.removeAttribute("data-bs-target"),buttonGroupLoginButton.removeAttribute("data-bs-toggle");for(let e=0;e<t.tasks.length;e++)""!==t.tasks[e]&&tasks.insertAdjacentHTML("beforeend","<div class='row'><div class='col-11 p-2'><input type='text' value='"+t.tasks[e]+"' class='tasks form-control'></div><div class='col-1 p-2'><button onclick='removeTask(this)' class='removeTask btn btn-outline-light'><i class='fas fa-minus'></i></button></div></div>");loginModalText.textContent="Status: Success",loginEmail.value="",loginPassword.value="",closeLoginModalButton.click(),loginModalText.textContent="",titleText.textContent=t.email+"'s Pomodororo"}}))}))})),registerForm.addEventListener("submit",(t=>{t.preventDefault(),registerModalText.textContent="Status: Registering...",fetch("/server?mode=register&email="+registerEmail.value.toLowerCase().trim()+"&password="+registerPassword.value).then((t=>{t.json().then((t=>{t.error?registerModalText.textContent="Status: "+t.error:(registerModalText.textContent="Status: Success",registerEmail.value="",registerPassword.value="",closeRegisterModalButton.click(),registerModalText.textContent="",alert("Registration Success!"))}))}))})),addTaskButton.addEventListener("click",(()=>{updateTasks(loggedInEmail,tasksText)}));