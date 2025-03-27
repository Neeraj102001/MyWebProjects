const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex;
let timeLeft = 10;
let timer;

// Fetch real-time questions from Open Trivia API
async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
        const data = await response.json();
        return data.results.map(q => ({
            question: q.question,
            answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
            correct: q.correct_answer
        }));
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

async function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = await fetchQuestions();
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        startTimer();
    } else {
        alert('Quiz Completed!');
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function showQuestion(question) {
    questionElement.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, question.correct));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(selected, correct) {
    clearInterval(timer);
    if (selected === correct) {
        alert('Correct!');
    } else {
        alert('Wrong! Correct answer: ' + correct);
    }
    nextButton.classList.remove('hide');
}

function resetState() {
    clearInterval(timer);
    timerElement.innerText = '';
    answerButtonsElement.innerHTML = '';
    nextButton.classList.add('hide');
}

function startTimer() {
    timeLeft = 10;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time up! Moving to next question.');
            currentQuestionIndex++;
            setNextQuestion();
        }
    }, 1000);
}
