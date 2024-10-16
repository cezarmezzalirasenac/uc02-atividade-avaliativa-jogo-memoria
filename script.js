const languages = [
    { languageName: "Python", path: "/python/python-original-wordmark.svg" },
    { languageName: "Java", path: "/java/java-original-wordmark.svg" },
    { languageName: "JavaScript", path: "/javascript/javascript-original.svg" },
    { languageName: "C#", path: "/csharp/csharp-original.svg" },
    { languageName: "C/C++", path: "/cplusplus/cplusplus-original.svg" },
    { languageName: "PHP", path: "/php/php-original.svg" },
    { languageName: "Swift", path: "/swift/swift-original-wordmark.svg" },
    { languageName: "Rust", path: "/rust/rust-original.svg" }
]


const divRoot = document.getElementById("root")
const cdnImageURL = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

const randomCardsList = []
const cardDivList = []
randomCardsList.push(...languages.sort(() => Math.random() - 0.5))
randomCardsList.push(...languages.sort(() => Math.random() - 0.5))

const timer = document.getElementById("timer")
let seconds = 0
let minutes = 0
let hours = 0
let timerInterval
let timerRunning = false

const addZero = (number) => {
    return number < 10 ? `0${number}` : number
}

const startTimer = () => {
    timerRunning = true
    timerInterval = setInterval(() => {
        seconds++
        if (seconds === 60) {
            seconds = 0
            minutes++
            if (minutes === 60) {
                minutes = 0
                hours++
            }
        }
        const formattedSeconds = addZero(seconds)
        const formattedMinutes = addZero(minutes)
        const formattedHours = addZero(hours)
        timer.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    }, 1000)
}

const turnCardDown = (cardId) => {
    const elementId = `card-number-${cardId}`
    const card = document.getElementById(elementId)
    card.classList.add("card-turned-down")
    card.innerHTML = ''
    card.addEventListener("click", turnCardUp)
}

let cardsTurned = 0
let lastCardFlippedId = null
let points = 0
const divPoints = document.getElementById("points")

const turnCardDownTimeout = (currentCardId) => {
    setTimeout(() => {
        turnCardDown(lastCardFlippedId)
        turnCardDown(currentCardId)
        lastCardFlippedId = null
        cardsTurned = 0
    }, 1000);
}

const turnCardUp = (event) => {
    cardsTurned++

    if (cardsTurned > 2) return

    if (!timerRunning) startTimer()

    const card = event.target
    card.removeEventListener("click", turnCardUp)
    
    const currentCardId = card.id.split("-")[2]
    card.classList.remove("card-turned-down")
    card.innerHTML = `<img src="${cdnImageURL}/${randomCardsList[currentCardId].path}">`

    if (!lastCardFlippedId) {
        lastCardFlippedId = currentCardId
    } else {
        if (randomCardsList[currentCardId].languageName === randomCardsList[lastCardFlippedId].languageName) {
            points++
            divPoints.innerHTML = points
            lastCardFlippedId = null
            cardsTurned = 0
        } else {
            turnCardDownTimeout(currentCardId)
        }
    }

}

function addCards(itemCount) {
    for (let i = 0; i < itemCount; i++) {
        const cardDiv = document.createElement("div")
        cardDiv.addEventListener("click", turnCardUp)
        cardDiv.classList.add("card")
        cardDiv.classList.add("card-turned-down")
        cardDiv.id = `card-number-${i}`
        cardDivList.push(cardDiv)
        divRoot.appendChild(cardDiv)
    }
}




addCards(randomCardsList.length)