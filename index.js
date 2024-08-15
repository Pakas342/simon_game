function addAndRemoveClass(element, className) {
    element.classList.add(className)
    setTimeout(() => {
        element.classList.remove(className);
    }, 200);
}


class Game {
    constructor() {
        this.level = new Level();
    }
    
    startGame() {
        if (this.level.number === 0) {
            document.querySelector("body").classList.remove("game-over");
            this.level.nextLevel()
        }
    }

}

class Level {
    constructor() {
        this.number = 0;
        this.userTurn = 0;
        this.options = document.querySelectorAll(".button");
        this.options.forEach(button => {
            button.addEventListener('click', (event) => {
                addAndRemoveClass(event.target, "pressed");
                this.userEvaluation(event.target);
                this.playSound(event.target);
            })
        })
        this.instructions = [];
        this.sounds = {
            blue: new Audio("./sounds/blue.mp3"),
            yellow: new Audio("./sounds/yellow.mp3"),
            green: new Audio("./sounds/green.mp3"),
            red: new Audio("./sounds/red.mp3")
        }
    }

    userEvaluation(elementClicked) {
        if (this.instructions[this.userTurn] === elementClicked) {
            this.userTurn++;
            if (this.instructions.length === (this.userTurn)) {
                setTimeout(() => {this.nextLevel()}, 1000);
            } 
        } else {
            document.querySelector("body").classList.add("game-over");
            addAndRemoveClass(elementClicked, "game-over");
            let responseSound;
            responseSound = new Audio("./sounds/wrong.mp3");
            responseSound.play();
            document.querySelector('.level-title').innerHTML = "Game Over, Press Any Key to Restart";
            this.number = 0;
            this.instructions = [];
        }
    }

    nextLevel() {
        this.userTurn = 0;
        let levelOptions = this.options;
        let newInstruction = levelOptions[Math.floor(Math.random() * this.options.length)];
        this.number++;
        this.instructions.push(newInstruction);
        document.querySelector('.level-title').innerHTML = "Level " + this.number;
        this.showInstructions();
    }

    showInstructions() {
        this.instructions.forEach((instruction, index) => {
            setTimeout(() => {
                addAndRemoveClass(instruction, "pressed");
                this.playSound(instruction);
            }, index* 1000);
        });
    }

    playSound(element) {
        if (element.classList.contains("blue")) {
            this.sounds.blue.play();
        } else if (element.classList.contains("yellow")) {
            this.sounds.yellow.play();
        } else if (element.classList.contains("green")) {
            this.sounds.green.play();
        } else if (element.classList.contains("red")) {
            this.sounds.red.play();
        } 
    }
    
}

const game = new Game();

document.addEventListener("keydown", () => {
    game.startGame();
})

