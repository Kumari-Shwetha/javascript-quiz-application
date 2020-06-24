let question_count = 0;
let score = 0;
let username;
let seconds=0;
let minutes=0;
let mytime;

/*new*/
let myArray=[]; //stroes the random number
let array=[];
let count=0;
let question_index;

const questionSpan = document.querySelector(".question-span");
const quesionNoSpan = document.querySelector(".question-no-span");
const optionList = document.querySelector(".option_group").children;
const welcomeContainer = document.querySelector(".welcome_text");
const quizContainer = document.querySelector(".quiz");
const resultContainer = document.querySelector(".result");
const name = document.querySelectorAll(".name");
const spanScore = document.querySelector(".score");
const timeSpan=document.querySelector(".total-time");
const totalQuestionSpan=document.querySelector(".total-question");
let questions = [
{
    question: "What is the full form of RAM ?",
    options: [
        "Random Access Memory",
        "Randomly Access Memory",
        "Run Accept Memory",
        "None of these"
    ],
    answer: 0
},
{
    question: "HTML is a...?",
    options: [
        "Programming Language",
        "Markup Language",
        "Script Language",
        "Machine Language"
    ],
    answer: 1
},
{
    question: "What is the full form of CPU ?",
    options: [
        "Central Program Unit",
        "Central Processing Unit",
        "Central Preload Unit",
        "None of these"
    ],
    answer: 1
},
{
    question: "What is the full form of E-mail ?",
    options: [
        "Electronic Mail",
        "Electric Mail",
        "Engine Mail",
        "None of these"
    ],
    answer: 0
},
{
    question: 'How you call a function named "myFunction"?',
    options: [
        'myFunction()',
        'call myFunction()',
        'call function myFunction()',
        'all the above'
    ],
    answer: 0
},
{
    question: 'How to write an IF statement in Javascript?',
    options: [
        'if i == 5 then',
        'if (i == 5)',
        'if i = 5',
        'if i = 5 then'
    ],
    answer: 1
},
{
    question: 'How does a FOR loop start?',
    options: [
        'for(i = 0; i <= 5)',
        'for(i <= 5; i++)',
        'for i = 1 to 5',
        'for (i = 0; i <= 5; i++)'
    ],
    answer: 3
},
{
    question: 'How do you declare a Javascript variable?',
    options: [
        'variable carName',
        'var carName',
        'v carName',
        'none of these'
    ],
    answer: 1
},
{
    question: 'Which operator is used to assign a value to a variable',
    options: [
        '-',
        '=',
        '+',
        '*'
    ],
    answer: 1
},
{
    question: "Number of Headings available in HTML",
    options:[
          "4",
          "6",
          "7",
          "8",
        ],
        answer: 1
}
];
function timer(){
    let dt=new Date(new Date().setTime(0));
    let time=dt.getTime();
    seconds=Math.floor(( time % ( 100 * 60 )) / 1000);
    minutes=Math.floor(( time % ( 1000 * 60 * 60 )) / (1000 * 60 ));
    mytime=setInterval(function(){
        if(seconds < 59){
            seconds++;
        }
        else{
            seconds=0;
            minutes++;
        }
        //console.log(seconds,minutes);
        let formatted_sec=seconds < 10 ? '0' + seconds: seconds;
        let formatted_minute=minutes < 10 ? '0' + minutes : minutes;
        
        document.querySelector(".time").innerHTML= formatted_minute+ ':' + formatted_sec;
    },1000); 
}

function submitForm(e) {
    e.preventDefault();
    textBox = document.forms["welcome_form"]["name"];
    username = document.forms["welcome_form"]["name"].value;
    if(username != '')
    {
        name.forEach(spanname => {
            spanname.innerHTML = username;
        });
        startQuiz();
    }
    else
    {
        textBox.classList.add("error");
    }
}

function startQuiz()
{
    welcomeContainer.style.display = "none";
    quizContainer.style.display = "grid";
    randomQuestion();
    timer();
}
function next() {
    if (question_count == questions.length - 1) {
        timeSpan.innerHTML=minutes + ' minutes and ' + seconds +' seconds';
        clearInterval(mytime);
        quizOver();
    } else {
        question_count++;
        clearOptionClass();
        randomQuestion();
    }
}

function show() {
    quesionNoSpan.innerHTML = count + 1;
    questionSpan.innerHTML = questions[question_index]['question'];

    for (let i = 0; i < optionList.length; i++) {
        optionList[i].innerHTML = questions[question_index]['options'][i];
    }
    count++;
}
function randomQuestion(){
	let randomNumber=Math.floor(Math.random() * questions.length); //generates random number
	hitDuplicate=0;

	if(myArray.length > 0)
	{
		for(let i=0; i < myArray.length; i++)
		{
			if(myArray[i] == randomNumber) //generated new random number compares with the stored random nummber array
			{

				hitDuplicate = 1;
				break;
			}
		}
		if(hitDuplicate == 1)
		{
	   		randomQuestion();
		}
		else
		{
			question_index=randomNumber;
			show();
			myArray.push(question_index);
		}

	}
	if(myArray.length == 0)//first random number
	{
		question_index=randomNumber;
		show();
		myArray.push(question_index);
	}
}
function clearOptionClass() {
    for (let i = 0; i < optionList.length; i++) {
        optionList[i].classList.remove("active");
    }
}

for (let i = 0; i < optionList.length; i++) {
    optionList[i].addEventListener("click", function () {

        let id = this.getAttribute("data-id");

        for (let k = 0; k < optionList.length; k++) {
            if (optionList[k].classList.contains("active")) {
                optionList[k].classList.remove("active");
            }
        }
        this.classList.add("active");
        if (id == questions[question_index].answer) {
            score++;
            console.log(score);
        }

    });
}

function quizOver() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    spanScore.innerHTML = score;
    totalQuestionSpan.innerHTML = questions.length;
}

function tryAgain() {
    window.location.reload();
}