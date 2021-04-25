//VARIABLES
//variable for mode
let mode = 'pomodoro';

//variables for timer lengths, in seconds
let pomodoroTimeLength = 25 * 60;
let shortBreakTimeLength = 5 * 60;
let longBreakTimeLength = 15 * 60;
let currentTimeLength = 25 * 60;

//related to progress bar
let progressBarFunction;
const progressBar = document.getElementById('progressBar');

//variable related to timer
const startStop = document.getElementById('startStop');
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');
let timer;

//variables related to logged in user
let loggedInEmail;

//variables for buttons for switching timer type
const timerSwitchButtons = document.querySelectorAll('.timerswitch');

//variables related to tasks
let addTaskButton = document.getElementById('addTask');
let addTaskString = document.getElementById('addTaskString');
let removeTaskButtons = document.querySelectorAll('.removeTask');
let taskInputs = document.querySelectorAll('.tasks');
let tasksText = [];

//variables related to button group
const buttonGroupLoginButton = document.getElementById('buttonGroupLoginButton');

//variables related to settings modal
const settingsForm = document.getElementById('settingsForm');
const settingsButton = document.getElementById('settingsButton');
const saveSettings = document.getElementById('saveSettings');
let settingsPomodoroLength = document.getElementById('settingsPomodoroLength');
let settingsShortBreakLength = document.getElementById('settingsShortBreakLength');
let settingsLongBreakLength = document.getElementById('settingsLongBreakLength');

//variables related to login modal
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginModalText = document.getElementById('loginModalText');
const closeLoginModalButton = document.getElementById('closeLoginModalButton');

//variables related to register modal
const registerForm = document.getElementById('registerForm');
const registerButton = document.getElementById('registerButton');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerModalText = document.getElementById('registerModalText');
const closeRegisterModalButton = document.getElementById('closeRegisterModalButton');

//title text
const titleText = document.getElementById('titleText');