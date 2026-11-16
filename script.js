let getMainCar = document.querySelector(".mainCar")
let getLeftSide = document.querySelector(".left")
let getRightSide = document.querySelector(".right")
let getRoadImg = document.querySelector(".roadImg")
let getScoreNum = document.querySelector(".scoreNum")
let getHighScoreNum = document.querySelector(".highScoreNum")
let isGameOver = false;
let left = 0
let right = 3
let carPosition = [18, 32, 48, 64]
let enemyCarPosition = [18, 32, 48, 64]
let position = 0
let score = 0
let levelUp = 3000
let carImage = ["Untitled_design__2_-removebg-preview.png", "68bcf0e85e98c8ee3866531f1bb9b7a1-removebg-preview.png", "Untitled_design__1_-removebg-preview.png", "Untitled_design__3_-removebg-preview.png", "Untitled_design__4_-removebg-preview.png", "Untitled_design-removebg-preview.png", "aa1e2eyup-removebg-preview.png", "download__1_-removebg-preview.png"]

getHighScoreNum.innerText = JSON.parse(localStorage.getItem("HighestScore")) || score


document.addEventListener('keydown', handleKeyDown);


getLeftSide.addEventListener("touchend", leftFunctionality);
getRightSide.addEventListener("touchend", rightFunctionality);

function handleKeyDown(Event) {
    if (Event.key == "ArrowRight") {
        rightFunctionality();
    }
    if (Event.key == "ArrowLeft") {
        leftFunctionality();
    }
}

function leftFunctionality() {
    if (right < 3) {
        if (position > 0) {
            position--
        }

        getMainCar.style.left = `${carPosition[position]}%`
        left--
        right++
    }
}
function rightFunctionality() {
    if (left < 3) {
        if (position < carPosition.length - 1) {
            position++
        }

        getMainCar.style.left = `${carPosition[position]}%`
        left += 1
        right--
    }
}


function enemySpawnLoop() {

    if (isGameOver) {
        return;
    }

    let createDiv = document.createElement("div")
    let createImgTag = document.createElement("img")
    let randomNumForImg = Math.floor(Math.random() * carImage.length)
    let randomNumForCarPosition = Math.floor(Math.random() * enemyCarPosition.length)
    let randomImg = carImage[randomNumForImg]
    let lanePosition = enemyCarPosition[randomNumForCarPosition];

    if (innerWidth < 600) {

        if (randomImg === "aa1e2eyup-removebg-preview.png") {
            createDiv.style.left = `calc(${lanePosition}% + 4%)`
        } else if (randomImg === "Untitled_design__1_-removebg-preview.png") {
            createDiv.style.left = `calc(${lanePosition}% - 0%)`
        } else if (
            randomImg === "Untitled_design__4_-removebg-preview.png" ||
            randomImg === "Untitled_design__3_-removebg-preview.png" ||
            randomImg === "Untitled_design__2_-removebg-preview.png"
        ) {
            createDiv.style.left = `calc(${lanePosition}% - 0%)`
        } else if (randomImg === "download__1_-removebg-preview.png") { createDiv.style.left = `calc(${lanePosition}% + 3%)` } else {
            createDiv.style.left = `${lanePosition}%`
        }
    } else {
        if (randomImg === "aa1e2eyup-removebg-preview.png") {
            createDiv.style.left = `calc(${lanePosition}% + 3.5%)`
        } else if (randomImg === "Untitled_design__1_-removebg-preview.png") {
            createDiv.style.left = `calc(${lanePosition}% - 1.2%)`
        } else if (
            randomImg === "Untitled_design__4_-removebg-preview.png" ||
            randomImg === "Untitled_design__3_-removebg-preview.png" ||
            randomImg === "Untitled_design__2_-removebg-preview.png"
        ) {
            createDiv.style.left = `calc(${lanePosition}% - 1%)`
        } else if (randomImg === "download__1_-removebg-preview.png") { createDiv.style.left = `calc(${lanePosition}% + 3%)` } else {
            createDiv.style.left = `${lanePosition}%`
        }
    }
    createImgTag.setAttribute("src", randomImg)
    createDiv.classList.add("enemyCar")
    createDiv.append(createImgTag)
    getRoadImg.append(createDiv)

    setTimeout(() => {

        if (isGameOver) {
            return;
        }

        let highestScore = JSON.parse(localStorage.getItem("HighestScore")) || score

        if (createDiv.parentNode === getRoadImg) {
            console.log(createDiv.parentNode)
            console.log(getRoadImg)
            getRoadImg.removeChild(createDiv)
            score++
            if (highestScore < score) {
                localStorage.setItem("HighestScore", JSON.stringify(score))
            }
            getScoreNum.innerText = score
            getHighScoreNum.innerText = JSON.parse(localStorage.getItem("HighestScore")) || score

            if (levelUp > 700) {
                levelUp = levelUp - 100
            }

        }

    }, 2600)


    if (!isGameOver) {
        setTimeout(enemySpawnLoop, levelUp);
    }
}

enemySpawnLoop();


let gameLoop; 

function gameOver() {
    isGameOver = true


    clearInterval(gameLoop);

    document.removeEventListener('keydown', handleKeyDown);
    getLeftSide.removeEventListener("touchend", leftFunctionality);
    getRightSide.removeEventListener("touchend", rightFunctionality);


    // 3. Road ki animation rok dein
    getRoadImg.style.animationPlayState = 'paused';

    // 4. Screen par maujood saari enemy cars ki animation rok dein
    let allEnemies = document.querySelectorAll(".enemyCar");
    allEnemies.forEach(enemy => {
        enemy.style.animationPlayState = 'paused';
    });


    setTimeout(() => {
        let highestScore = JSON.parse(localStorage.getItem("HighestScore")) || 0
        let createDiv = document.createElement("div")
        createDiv.classList.add("gameOver")
        if (highestScore == score) {
            createDiv.innerHTML = `  <div class="gameOverText">Game Over</div>
               <div class="scoreBoard2">
                <div class="highestScore2"> Highest:<span class="highScoreNum2"></span></div>
            </div>
             <div class="button2">Restart</div>`

            createDiv.querySelector(".highScoreNum2").innerText = highestScore

        } else {
            createDiv.innerHTML = `  <div class="gameOverText">Game Over</div>
               <div class="scoreBoard2">
                <div class="score2">Score:<span class="scoreNum2">0</span></div>
            </div>
             <div class="button2">Restart</div>`

            createDiv.querySelector(".scoreNum2").innerText = score

        }
        getRoadImg.append(createDiv)

        createDiv.querySelector(".button2").addEventListener("click", () => {
            location.reload();
        })


    }, 500);
}

function checkCollision() {
    let mainCarRect = getMainCar.getBoundingClientRect();
    let allEnemies = document.querySelectorAll(".enemyCar");

    allEnemies.forEach(enemy => {
        let enemyRect = enemy.getBoundingClientRect();

        // === BUG 1 & 2 FIX ===
        // 1. Current 'enemy' (div) ke andar 'img' tag ko dhoondein
        let enemyImgElement = enemy.querySelector("img");

        // 2. Agar image mil jaaye, toh uska 'src' nikaalein
        let enemyImgSrc = ""; // Pehle khaali rakhein
        if (enemyImgElement) {
            enemyImgSrc = enemyImgElement.src; // 'src' ko yahan store karein
        }

        let collisionPaddingX;
        let collisionPaddingY;

        if (innerWidth < 600) {

            // 3. 'src' ko check karne ke liye 'includes()' ka istemal karein
            //    (kyunki .src poora URL deta hai, jaise 'http://.../file.png')
            if (enemyImgSrc.includes("Untitled_design__1_-removebg-preview.png")) {
                collisionPaddingX = 13;
                collisionPaddingY = 8;
            } else if (enemyImgSrc.includes("Untitled_design__3_-removebg-preview.png")) {
                collisionPaddingX = 13;
                collisionPaddingY = 3;
            } else if (enemyImgSrc.includes("Untitled_design-removebg-preview.png")) {
                collisionPaddingX = 13;
                collisionPaddingY = 5;
            } else if (enemyImgSrc.includes("Untitled_design__2_-removebg-preview.png")) {
                collisionPaddingX = 13;
                collisionPaddingY = 6;
            } else {
                collisionPaddingX = 13;
                collisionPaddingY = 2;
            }
        } else {

            if (enemyImgSrc.includes("Untitled_design__2_-removebg-preview.png")) {
                collisionPaddingX = 30;
                collisionPaddingY = 11;
            } else if (enemyImgSrc.includes("Untitled_design__1_-removebg-preview.png")) {
                collisionPaddingX = 30;
                collisionPaddingY = 9;
            } else {
                collisionPaddingX = 30;
                collisionPaddingY = 7;
            }
        }

        // Baaki ka aapka collision logic bilkul theek hai
        let isColliding = (
            (mainCarRect.right - collisionPaddingX) > (enemyRect.left + collisionPaddingX) &&
            (mainCarRect.left + collisionPaddingX) < (enemyRect.right - collisionPaddingX) &&
            (mainCarRect.bottom - collisionPaddingY) > (enemyRect.top + collisionPaddingY) &&
            (mainCarRect.top + collisionPaddingY) < (enemyRect.bottom - collisionPaddingY)
        );

        if (isColliding) {
            gameOver();
        }
    });
}


gameLoop = setInterval(checkCollision, 50);