import './styles/index.scss'
import './number-validation.js'

const popup = document.querySelector('.popup') as HTMLDivElement
const overlay = popup.querySelector('.overlay') as HTMLDivElement
const toFormButton = popup.querySelector('#to-form') as HTMLButtonElement

let cursorOnSite = true
let popupTriggeredOnMouseLeave = false

function togglePopup(state: boolean) {
  if (state) {
    popup.classList.add('active')
  } else {
    popup.classList.remove('active')
  }
}

function scrollToForm() {
  togglePopup(false)
  window.scrollTo({
    top: document.querySelector('form')?.offsetTop,
    left: 0,
    behavior: 'smooth',
  })
}

toFormButton.addEventListener('click', () => scrollToForm())
overlay.addEventListener('click', () => togglePopup(false))

window.addEventListener('load', () => {
  setTimeout(() => popup.classList.add('init'), 0)
  setTimeout(() => {
    if (cursorOnSite) {
      togglePopup(true)
    }
  }, 20000)

  document.addEventListener('mouseleave', function () {
    if (!popupTriggeredOnMouseLeave) {
      cursorOnSite = false
      popupTriggeredOnMouseLeave = true
      togglePopup(true)
    }
  })
})

// countdown
const countdown = document.getElementById('countdown') as HTMLDivElement

let currentTime = Date.now()
let endTime = currentTime + 10 * 60 * 1000

function updateCountdown() {
  const timeLeft = endTime - Date.now()

  if (timeLeft <= 0) {
    clearInterval(timerInterval)
    localStorage.removeItem('endTime')

    return
  }

  const minutes = Math.floor(timeLeft / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)

  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  countdown.innerHTML = formattedTime
}

const savedEndTime = localStorage.getItem('endTime')
if (savedEndTime) {
  currentTime = Date.now()
  endTime = parseInt(savedEndTime)
  if (currentTime >= endTime) {
    localStorage.removeItem('endTime')
  } else {
    updateCountdown()
  }
}

const timerInterval = setInterval(updateCountdown, 1000)

localStorage.setItem('endTime', endTime.toString())

// date
const dateFiveDays = document.getElementById('date') as HTMLDivElement

let currentDate = new Date()

currentDate.setDate(currentDate.getDate() - 5)

const formattedDate = currentDate
  .toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  .replace(/\//g, '.')

dateFiveDays.innerText = formattedDate
