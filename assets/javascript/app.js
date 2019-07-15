$(document).ready(function () {

    var game = {
        questions: [
            {
                question: 'What is the higest mountain in the world?',
                possibles: ['K2', 'Mt Everest', 'Denali', 'Mt Kilimanjro'],
                id: 'question-one',
                answer: 1
            }, {
                question: 'What is the higest mountain in the United States?',
                possibles: ['Denali', 'Mt Washington ', 'Mt Whitney', 'Mt Rainier'],
                id: 'question-two',
                answer: 0
            }, {
                question: 'Which of the following Presidents faces is NOT on Mount Rushmore?',
                possibles: ['George Washington', 'Thomas Jefferson', 'Theodore Roosevelt', 'Franklin Roosevelt'],
                id: 'question-three',
                answer: 3
            }, {
                question: 'What is the most dangerous Mountain in the world?',
                possibles: ['K2', 'Annapurna', 'Mt Everest', 'Matterhorn'],
                id: 'question-four',
                answer: 1
            }
        ]}

        var message = 'Game Over!';
 
        var number = 60;
        $('#timeLeft').on('click', run);
    
        function decrement(){

            number--;

            $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
            
            if (number === 0){
            
            stop();

            $('#message').html('time up!');
            checkAnswers();
            }
        }

        function run(){
            counter = setInterval(decrement, 1000);
        }
        
        function stop(){
    
            clearInterval(counter);
        }
    
        run();
    
    function formTemplate(data) {

        var qString = "<form id='questionOne'>"+ data.question +"<br>";
    
        var possibles = data.possibles;

        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            console.log(possible);
            qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;
    
        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;
    
    function buildQuestions(){
        var questionHTML = ''
        for (var i = 0; i<game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $('#questions-container').append(questionHTML);
    
    }
    function isCorrect(question){
        var answers = $('[name='+question.id+']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }
    
    buildQuestions();
    
    function resultsTemplate(question){
        var htmlBlock = '<div>'
        htmlBlock = htmlBlock + question.question + ': ' + isChecked;
        return htmlBlock + "</div>";
    }
    
    function checkAnswers (){
    
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered =0
    
        for (var i = 0; i<game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {

                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }
    
        }

        $('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
    }
    
    function checkAnswered(question){
        var anyAnswered = false;
        var answers = $('[name='+question.id+']');

        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }

        return anyAnswered;

    }

        $('#doneButton').on('click', function() {
        checkAnswers();
        stop();
        $("#messageDiv").html("Game Over!");
        })
    });