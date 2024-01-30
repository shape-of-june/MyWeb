const startButton = document.querySelector('#start-button');
const questionContainer = document.querySelector('#question-form');
const question = document.querySelector('#question');
const answer = document.querySelector('#answer');

let quizNumber = 0;


const quizList=["내 이름은? (한글)",
    "내 나이는?",
    "내가 가장 좋아하는 음식은?",
    "내가 가장 싫어하는 동물은?",
    "가장 좋아하는 롤 챔피언은?"

]
const answerList=["김준형",
    "25",
    "치킨",
    "코알라",
    "카타리나"
    
]

function handleAnswer(event) {
    event.preventDefault();
    if (answer.value === answerList[quizNumber]) {
        alert('정답입니다.');
        if(quizNumber === quizList.length-1) {
            alert('퀴즈가 끝났습니다. 상품코드는 1248 입니다.');
            history.back();
            return;
        }
        quizNumber++;
        question.innerText = quizList[quizNumber];
        answer.value = '';
    } else {
        alert('틀렸습니다. 다시 입력해주세요.');
        answer.value = '';
    }
}


startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    question.innerText = quizList[quizNumber];
});

questionContainer.addEventListener('submit', handleAnswer);
