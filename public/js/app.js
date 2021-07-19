console.log('Client Side JS file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = 'http://localhost:3000/weather?id=' + encodeURIComponent(search.value)

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        console.log(data.error)
      } else {
        messageOne.textContent = data.forecastData
        messageTwo.textContent = data.location
      }
    })
  })
})
