const submitBtn = document.querySelector('.btn-submit')
const geoBtn = document.querySelector('.btn-geo')
const chatWindow = document.querySelector('.chat-window')

const wsUrl = 'wss://echo-ws-service.herokuapp.com'

let websocket

const displayUserMessage = message => {
    let messageBox = document.createElement('div')
    messageBox.classList.add('message-box', 'user')
    messageBox.innerHTML = message
    chatWindow.appendChild(messageBox)
}

const displayServerMessage = message => {
    let messageBox = document.createElement('div')
    messageBox.classList.add('message-box', 'server')
    messageBox.innerHTML = message
    chatWindow.appendChild(messageBox)
}

const displayGeolocation = url => {
    let messageBox = document.createElement('div')
    messageBox.classList.add('message-box', 'user')
    if(url) {
        let geoLink = document.createElement('a')
        geoLink.classList.add('geo-link')
        geoLink.innerHTML = 'Ваша Геолокация'
        geoLink.href = url
        geoLink.target = '_blank'
        messageBox.appendChild(geoLink)
        chatWindow.appendChild(messageBox)
    } else {
        messageBox.innerHTML = 'Геолокация недоступна'
        chatWindow.appendChild(messageBox)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    websocket = new WebSocket(wsUrl)
    websocket.onopen = function (evt) {
        displayServerMessage('Привет! Это твоё эхо.')
    }

    submitBtn.addEventListener('click', () => {
        const inputField = document.querySelector('.message-text')
        const userMessage = document.querySelector('.message-text').value
        if(userMessage) {
            displayUserMessage(userMessage)
            const serverResponce = displayServerMessage(userMessage)
            websocket.send(serverResponce)
            inputField.value = ''
        }
    })
})

geoBtn.addEventListener('click', () =>{
    if ('geolocation' in navigator) {
        displayServerMessage('Подождите секунду, идёт поиск...')
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            const mapUrl = 'https://www.openstreetmap.org/#map=18/${latitude}/${longitude}'
            displayGeolocation(mapUrl)
            websocket.send(coords)
        })
    }
})