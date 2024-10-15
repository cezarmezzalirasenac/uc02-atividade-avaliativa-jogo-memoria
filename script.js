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

let cardsTurned = 0

const turnCardUp = (event) => {
    if (!timerRunning) {
        startTimer()
    }
    cardsTurned++
    if (cardsTurned === 2) {

    }

    const card = event.target

    card.classList.add("flip")
    card.removeEventListener("click", turnCardUp)

    const cardNumber = card.id.split("-")[2]
    card.classList.remove("card-turned-down")
    card.innerHTML = `<img src="${cdnImageURL}/${randomCardsList[cardNumber].path}">`
}

function addCards(itemCount) {
    for (let i = 0; i < itemCount; i++) {
        const cardDiv = document.createElement("div")
        cardDiv.addEventListener("click", turnCardUp)
        cardDiv.classList.add("card")
        cardDiv.classList.add("card-turned-down")
        cardDiv.id = `card-number-${i}`
        // cardDiv.innerHTML = `
        //   <img src="./assets/codememo.svg"/>
        // `
        divRoot.appendChild(cardDiv)
    }
}

const randomCardsList = []
randomCardsList.push(...languages.sort(() => Math.random() - 0.5))
randomCardsList.push(...languages.sort(() => Math.random() - 0.5))


addCards(randomCardsList.length)