const word1 = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message_el = document.getElementById('message');
const button = document.getElementById('play-again');

function getRandomWord(){
    const words = ["javascript", "java", "python", "css", "html", "sql", "php"];
    return words[Math.floor(Math.random() * words.length)];
}

const correctLetters = [];
const wrongLetters = [];
let selectWord = getRandomWord();

function displayWord(){
    word1.innerHTML = `
        ${selectWord.split(``).map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}
    `;

    const w = word1.innerText.replace(/\n/g, '');
    if(w === selectWord){
        popup.style.display = 'flex';
        message.innerText = 'Tebrikler Kazandiniz';
    }
}

function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatali Harfler</h3>':''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if(index < errorCount){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })

    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        message.innerText = 'Maalesef Kaybettiniz';
    }
}

function displayMessage(){
    message_el.classList.add('show');

    setTimeout(function() {
        message_el.classList.remove('show');
    }, 2000)
}

button.addEventListener('click', function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
})
window.addEventListener('keydown', function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else{
                displayMessage();
            }
        }
    }
    console.log(e.key);
})

displayWord();