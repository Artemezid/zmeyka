let interval;

let field = document.getElementsByClassName('field');
for(let i = 1; i < 101; i++){
   let exel = document.createElement('div');
   field[0].appendChild(exel);
   exel.classList.add('exel');
}

let exel = document.getElementsByClassName('exel');
let x = 1,
    y = 10;

for (let i = 0; i < exel.length; i++){
    if (x>10){
        x=1;
        y--;
    }
    exel[i].setAttribute('posX', x);
    exel[i].setAttribute('posY', y);
    x++;
}

let input = document.getElementById('1');
let score = 0;
input.value = `${score}`;

let input2 = document.getElementById('2');
let record = 0;
input2.value = localStorage.getItem('record', `${record}`);


function createSnake() {
    let posX = 6;
    let posY = 5;
    return [posX,posY]
}

let coordinates = createSnake();
let snakebody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];

for (let i = 0; i < snakebody.length; i ++){
    snakebody[i].classList.add('snakebody');
}
snakebody[0].classList.add('head');

let food;

function createFood(){
        function generateFood() { 
            let posX = Math.round(Math.random()*(10-3)+3);
            let posY = Math.round(Math.random()*(10-1)+1);
            return [posX,posY];
        }

        let foodCoordinates = generateFood();
        food = document.querySelector('[posX = "' + foodCoordinates[0] + '"][posY = "' + foodCoordinates[1] + '"]'); 

        while(food.classList.contains('snakebody')){
            let foodCoordinates = generateFood();
            food = document.querySelector('[posX = "' + foodCoordinates[0] + '"][posY = "' + foodCoordinates[1] + '"]'); 
        }
    food.classList.add('food') ;
};
createFood();

let direction = 'right';
let step = false;


function move() {
    let coordinates = [snakebody[0].getAttribute('posX'), snakebody[0].getAttribute('posY')];
    snakebody[0].classList.remove('head');
    snakebody[snakebody.length-1].classList.remove('snakebody');
    snakebody.pop();

    if(direction == 'right'){   
        if (coordinates[0] < 10){
            snakebody.unshift(document.querySelector('[posX = "' + (+coordinates[0]+1) + '"][posY = "' + coordinates[1] + '"]'));
        }else {
            snakebody.unshift(document.querySelector('[posX = "1"][posY = "' + coordinates[1] + '"]')); 
        };
    }else if (direction == 'left'){
        if(coordinates[0] > 1){
            snakebody.unshift(document.querySelector('[posX = "' + (+coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'));
        }else {
            snakebody.unshift(document.querySelector('[posX = "10"][posY = "' + coordinates[1] + '"]')); 
        };
    }else if(direction == 'up'){
        if(coordinates[1] < 10){
            snakebody.unshift(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + (+coordinates[1]+1) + '"]')); 
        }else {
            snakebody.unshift(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "1"]'));
        }; 
    }else if(direction == 'down'){
        if(coordinates[1] > 1){
            snakebody.unshift(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + (+coordinates[1]-1) + '"]')); 
        }else {
            snakebody.unshift(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "10"]'));
        };
    };

    function eatingFood(){
        //
        let boost = 500- (`${score}`*10);
        //
        if(snakebody[0].getAttribute('posX') == food.getAttribute('posX') && snakebody[0].getAttribute('posY')==food.getAttribute('posY')){
            food.classList.remove('food');
            let a = snakebody[snakebody.length-1].getAttribute('posX');
            let b = snakebody[snakebody.length-1].getAttribute('posY');
            snakebody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
            createFood();
            score++;
            // дополнительное задание
            clearInterval(interval);
            interval = setInterval(move, boost);
            //
            input.value = `${score}`;
        };
    };
    eatingFood();

    function gameover(){
        if(snakebody[0].classList.contains('snakebody')){
            alert(`Game Over. Ваши очки: ${score}`);
            clearInterval(interval);   
        }; 
        if(score > record){
            record = `${score}`;
            if (localStorage.getItem('record', `${record}`) < score){
                localStorage.setItem('record', `${record}`);
            }
            input2.value = localStorage.getItem('record', `${record}`); 
        };
    }; 
    gameover();

    snakebody[0].classList.add('head');
    for (let i = 0; i < snakebody.length; i ++){
        snakebody[i].classList.add('snakebody');
    };
    step = true
};   

let startGame = document.querySelector('.field');
startGame.addEventListener('click', ()=>{
     interval = setInterval(move, 500);
}, {once: true});


window.addEventListener('keydown', function(e){
    if(step == true){ 
        if(e.key == 'ArrowLeft' && direction != 'right'){
            direction = 'left';
            step = false;
        }else if(e.key == 'ArrowUp' && direction != 'down'){
            direction = 'up';
            step = false;
        }else if(e.key == 'ArrowRight' && direction != 'left'){
            direction = 'right';
            step = false;
        }else if(e.key == 'ArrowDown' && direction != 'up'){
            direction = 'down';
            step = false;
        };
    };
});

let button = document.querySelector('button');
button.addEventListener('click', function(){
    document.location.reload();
});