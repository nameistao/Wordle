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

//variables for buttons for switching timer type
const timerSwitchButtons = document.querySelectorAll('.timerswitch');

//variables related to tasks
const addTaskButton = document.getElementById('addTask');
let addTaskString = document.getElementById('addTaskString');
let removeTaskButtons = document.querySelectorAll('.removeTask');

//variables related to settings modal
const settingsButton = document.getElementById('settingsButton');
const saveSettings = document.getElementById('saveSettings');
let settingsPomodoroLength = document.getElementById('settingsPomodoroLength');
let settingsShortBreakLength = document.getElementById('settingsShortBreakLength');
let settingsLongBreakLength = document.getElementById('settingsLongBreakLength');