let correctAnswers = 0;
let questions = [];


function init(){
    let start = document.getElementById('question-card');
    start.innerHTML = '';
    start.innerHTML = templateStart();
}


function HTMLQuiz() {
    questions = questhtml;
    startQuiz();
}


function CSSQuiz() {
    questions = questcss;
    startQuiz();
}


function JSQuiz() {
    questions = questjs;
    startQuiz();
}


function PythonQuiz() {
    questions = questpython;
    startQuiz();
}


function startQuiz(){
    let i = 0;
    let card = document.getElementById('quizcard');
    card.innerHTML = '';
    card.innerHTML = templateQuizCard(i);
    disableBtn();
}


function nextQuestion(i) {
    let card = document.getElementById('quizcard');
    card.innerHTML = '';

    if (i < questions.length-1) {
        i = i + 1;
        card.innerHTML = templateQuizCard(i);
        disableBtn();
        progressBar(i);
    }else{
        card.innerHTML = templateEndQuiz();
        document.getElementById('progress-bar').style.display = 'none';
    }
}


function answer(i, number){
    let rightAnswer = questions[i]['rightAnswer'];
    document.getElementById('answer1').onclick = null;
    document.getElementById('answer2').onclick = null;
    document.getElementById('answer3').onclick = null;
    document.getElementById('answer4').onclick = null;

    if (rightAnswer == number){
        document.getElementById(`answer${number}`).classList.add('bg-success');
        correctAnswers++;
    }else{
        document.getElementById(`answer${number}`).classList.add('bg-danger');
        document.getElementById(`answer${rightAnswer}`).classList.add('bg-success');
    }
    templateQuizCard(i);
    enableBtn();
}

function disableBtn(){
    document.getElementById('btn').disabled = true;
}


function enableBtn(){
    document.getElementById('btn').disabled = false;
}


function progressBar(i){
    i++;
    let percent = ((i/questions.length)*100)-10;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

//------------------ TEMPLATE ----------------------------------//

function templateStart(){
    return `
        <div class="card quizcard">
            <div id="quizcard">

            <div class="card-body">
                <a href="index.html">
                <img src="img/quiz.jpg" id="card-img-top" class="card-img-top">
                </a>
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


            </div>
            <div class="progress">
            <div id='progress-bar' class="progress-bar" role="progressbar" style="width: 0%"></div>
            </div>
        </div>`
}


function templateQuizCard(i) {
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
            </div>
            <div class="bottom-line">
                <p class="card-text"> Frage ${i+1} von ${questions.length}</p>
                <button onclick="nextQuestion(${i})" id="btn" class="btn btn-primary">Nächste Frage</button>
            </div>
    </div>`;
}


function templateEndQuiz(){
    return `
    <div class="card-body card-end">
        <h5 id="card-title" class="card-title">
            Geschafft! <span>Du hast <b>${correctAnswers}</b> von <b>${questions.length}</b> Fragen richtig beantwortet</span>
        </h5>
        <p>Wir hoffen dir hat das Quiz gefallen!</p>
        <br>
        <img src="img/end.png" id="card-img-top" class="card-img-top img-end">
        <button onclick="init()" class="btn btn-primary">Zurück zum Start</button>
    </div>`;
}