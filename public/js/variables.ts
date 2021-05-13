//VARIABLES
//variable for mode
let mode = 'pomodoro';

//variables for timer lengths, in seconds
let pomodoroTimeLength = 25 * 60;
let shortBreakTimeLength = 5 * 60;
let longBreakTimeLength = 15 * 60;
let currentTimeLength = 25 * 60;

//related to progress bar
let progressBarFunction: number;
const progressBar = document.getElementById('progressBar') as HTMLDivElement;

//variable related to timer
const startStop = document.getElementById('startStop') as HTMLButtonElement;
const seconds = document.getElementById('seconds') as HTMLSpanElement;
const minutes = document.getElementById('minutes') as HTMLSpanElement;
const innerBox = document.getElementById('innerBox') as HTMLDivElement;
let timer: number;

//variables related to logged in user
let loggedInEmail: string | null;

//variables for buttons for switching timer type
const timerSwitchButtons = document.querySelectorAll('.timerswitch');

//variables related to tasks
let addTaskButton = document.getElementById('addTask') as HTMLButtonElement;
let addTaskString = document.getElementById('addTaskString') as HTMLInputElement;
let removeTaskButtons = document.querySelectorAll('.removeTask');
let taskInputs = document.querySelectorAll('.tasks') as NodeListOf<HTMLInputElement>;
let tasks = document.getElementById('tasks') as HTMLDivElement;
let tasksText: string[] = [];

//variables related to button group
const buttonGroupLoginButton = document.getElementById('buttonGroupLoginButton') as HTMLButtonElement;

//variables related to settings modal
const settingsForm = document.getElementById('settingsForm') as HTMLFormElement;
const settingsButton = document.getElementById('settingsButton') as HTMLButtonElement;
const saveSettings = document.getElementById('saveSettings') as HTMLButtonElement;
const closeSettingsModalButton = document.getElementById('closeSettingsModalButton') as HTMLButtonElement;
let settingsPomodoroLength = document.getElementById('settingsPomodoroLength') as HTMLInputElement;
let settingsShortBreakLength = document.getElementById('settingsShortBreakLength') as HTMLInputElement;
let settingsLongBreakLength = document.getElementById('settingsLongBreakLength') as HTMLInputElement;

//variables related to login modal
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
const loginEmail = document.getElementById('loginEmail') as HTMLInputElement;
const loginPassword = document.getElementById('loginPassword') as HTMLInputElement;
const loginModalText = document.getElementById('loginModalText') as HTMLDivElement;
const closeLoginModalButton = document.getElementById('closeLoginModalButton') as HTMLButtonElement;

//variables related to register modal
const registerForm = document.getElementById('registerForm') as HTMLFormElement;
const registerButton = document.getElementById('registerButton') as HTMLButtonElement;
const registerEmail = document.getElementById('registerEmail') as HTMLInputElement;
const registerPassword = document.getElementById('registerPassword') as HTMLInputElement;
const registerModalText = document.getElementById('registerModalText') as HTMLDivElement;
const closeRegisterModalButton = document.getElementById('closeRegisterModalButton') as HTMLButtonElement;

//title text
const titleText = document.getElementById('titleText') as HTMLHeadingElement;