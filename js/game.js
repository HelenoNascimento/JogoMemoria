const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const personagens = [
    'brook',
    'chopper',
    'luffy',
    'nami',
    'sanji',
    'zoro',
    'frank',
    'law',
    'jinbe',
    'bigmon',
];


const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firtsCard = '';
let secondCard = '';

const checkEndGame= () =>{
const disabledCards = document.querySelectorAll('.disabled-card');
if(disabledCards.length === 20){
    clearInterval(loop);
    alert(`Parabens, ${spanPlayer.innerHTML} seu tempo foi : ${timer.innerHTML}`);
}
}

const checkCards = () =>{
    const primeiroPersonagem = firtsCard.getAttribute('data-personagem');
    const segundoPersonagem = secondCard.getAttribute('data-personagem');

    if(primeiroPersonagem === segundoPersonagem){
        firtsCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firtsCard = '';
        secondCard = '';

        checkEndGame();
    }else{
        setTimeout(() =>{
            firtsCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firtsCard = '';
            secondCard = '';
        },700)
        
    }

}

const revealCard = ({target}) =>{
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    if(firtsCard === ''){
        target.parentNode.classList.add('reveal-card');
        firtsCard = target.parentNode;
    }else if( secondCard ===''){
        target.parentNode.classList.add('reveal-card');
        secondCard =  target.parentNode;
        checkCards();
    }
    
} 

const createCard = (personagem) =>{

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${personagem}.jpg')`;

    card.appendChild(front)
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-personagem',personagem);
   return card;
}



const loadGame = () =>{
    const duplicatePersonagens =[ ...personagens, ...personagens];
   
   const personagensEmbaralhado = duplicatePersonagens.sort(() => Math.random() -0.5);
   
   personagensEmbaralhado.forEach((personagem) => {

        const card =  createCard(personagem);
        grid.appendChild(card);
    });
}

const startTimer= () =>{
    this.loop = setInterval(() =>{
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    },1000);
}

window.onload= () =>{
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
