let correctAnswers = 0;
let questions = [];

let AUDIO_Success = new Audio ('audio/success.mp3');
let AUDIO_Fail = new Audio ('audio/wrong.mp3');
let AUDIO_End = new Audio ('audio/tada.mp3');


function init(){
    let start = document.getElementById('question-card');
    start.innerHTML = '';
    start.innerHTML = displayStart();
}


function HTMLQuiz() {
    questions = questdataHTML;
    startQuiz();
}


function CSSQuiz() {
    questions = questdataCSS;
    startQuiz();
}


function JSQuiz() {
    questions = questdataJS;
    startQuiz();
}


function PythonQuiz() {
    questions = questdataPython;
    startQuiz();
}


function startQuiz(){
    correctAnswers = 0;
    let i = 0;
    let card = document.getElementById('quizcard');
    card.innerHTML = '';
    card.innerHTML = displayQuizCard(i);
    disableBtn();
}


function nextQuestion(i) {
    let card = document.getElementById('quizcard');
    card.innerHTML = '';

    if (i < questions.length-1) {
        i++;
        card.innerHTML = displayQuizCard(i);
        disableBtn();
        updateProgressBar(i);
    }
    else{
        card.innerHTML = endQuiz();
    }
}


function answer(i, numberOfSelectedAnswer){
    let rightAnswer = questions[i]['rightAnswer'];
    disableAnswerButton();

    if (rightAnswer == numberOfSelectedAnswer){
        AUDIO_Success.play();
        document.getElementById(`answer${numberOfSelectedAnswer}`).classList.add('bg-success');
        correctAnswers++;
    }
    else{
        AUDIO_Fail.play();
        document.getElementById(`answer${numberOfSelectedAnswer}`).classList.add('bg-danger');
        document.getElementById(`answer${rightAnswer}`).classList.add('bg-success');
    }
    displayQuizCard(i);
    enableBtn();
}


function disableAnswerButton(){
    document.getElementById('answer1').onclick = null;
    document.getElementById('answer2').onclick = null;
    document.getElementById('answer3').onclick = null;
    document.getElementById('answer4').onclick = null;
}


function endQuiz(){
    AUDIO_End.play();
    let points = correctAnswers/questions.length;

    if( points < 0.6){
        return result('Bleib dran!', 'Lerne weiter und verbesser dich. Wir haben alle klein Angefangen.', 'img/student.jpg');
    }
    if (points < 0.8){
        return result('Solides Wissen!', 'Gut gemacht! Übe weiter und baue dein Potential aus.', 'img/pro.jpg');
    }
    else{
        return result('Spitzenklasse!', 'Du gehörst zu den Profis', 'img/master.jpg');
    }
}

function disableBtn(){
    document.getElementById('btn').disabled = true;
}


function enableBtn(){
    document.getElementById('btn').disabled = false;
}


function updateProgressBar(i){
    i++;
    let percent = ((i/questions.length)*100)-10;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}


//------------------ TEMPLATES ----------------------------------//

function displayStart(){
    return `
    <div id="quizcard" class="card quizcard">

        <div class="card-body">
            <img src="img/quiz.jpg" id="card-img-top" class="card-img-top">
            <h5 id="card-title" class="card-title text-center">Willkommen!</h5>
            <p id="card-text" class="card-text text-center">
                Bei diesem Quiz kannst du dein Wissen zu verschiedenen Programmiersparchen testen.
            </p>
            <p id="card-text" class="card-text text-center">
                Bist du bereit? Dann starte jetzt mit der Programmiersparche deinen Wahl!
            </p>
            <div class="bottom-line">
                <button onclick="HTMLQuiz()" id="btn" class="btn btn-primary">HTML</button>
                <button onclick="CSSQuiz()" id="btn" class="btn btn-primary">CSS</button>
                <button onclick="JSQuiz()" id="btn" class="btn btn-primary">JS</button>
                <button onclick="PythonQuiz()" id="btn" class="btn btn-primary">Python</button>
            </div>
        </div>

        <div class="progress">
            <div id='progress-bar' class="progress-bar" role="progressbar" style="width: 0%"></div>
        </div>
    </div>`;
}


function displayQuizCard(i) {
    return `
    <div class="card-body">
        <img src="${questions[i]['question-image']}" id="card-img-top" class="card-img-top">
        <h5 id="card-title" class="card-title">Frage ${i + 1}</h5>
        <p id="card-text" class="card-text">${questions[i]['question']}</p>

        <div id ="answer">
            <div id="answer1" class="card answer" onclick="answer(${i}, 1)">
                <div class="card-body ">
                    ${questions[i]['answer1']}
                </div>
            </div>
            <div id="answer2" class="card answer" onclick="answer(${i}, 2)">
                <div class="card-body">
                    ${questions[i]['answer2']}
                </div>
            </div>
            <div id="answer3" class="card answer" onclick="answer(${i}, 3)">
                <div class="card-body">
                    ${questions[i]['answer3']}
                </div>
            </div>
            <div id="answer4" class="card answer" onclick="answer(${i}, 4)">
            <div class="card-body">
                ${questions[i]['answer4']}
            </div>
        </div>

        <div class="bottom-line">
            <p class="card-text"> Frage ${i+1} von ${questions.length}</p>
            <button onclick="nextQuestion(${i})" id="btn" class="btn btn-primary">Nächste Frage</button>
        </div>

        <div class="progress">
            <div id='progress-bar' class="progress-bar" role="progressbar" style="width: 0%"></div>
        </div>
    </div>`;
}


function result(resulttitle, resultparagraph, resultimg){
    return `
    <div class="card-body card-end">
        <h5 id="card-title" class="card-title">
            ${resulttitle}<span>Du hast <b>${correctAnswers}</b> von <b>${questions.length}</b> Fragen richtig beantwortet</span>
        </h5>
        <p>${resultparagraph}</p>
        <br>
        <img src="${resultimg}" id="card-img-top" class="card-img-top img-end">
        <button onclick="init()" class="btn btn-primary">Zurück zum Start</button>
    </div>`;
}
