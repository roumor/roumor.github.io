let name = document.querySelector('#name'),
    secondName = document.querySelector('#secondName'),
    email = document.querySelector("#email"),
    btn = document.querySelector('.btn'),
    users = document.querySelector('.users'),
    clear = document.querySelector('.clear')

// Объект для localStorage
let storage = {}

// TODO МОЖЕТ ПРИГОДИТЬСЯ
/*
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
            // ваш код
        }
    })
})

const elem = document.querySelector('ЗДЕСЬ_КЛАСС_КОТОРЫЙ_ХОТИТЕ_ОТСЛЕДИТЬ')
observer.observe(elem, {
    childList: true
})
 */

btn.addEventListener('click', getData)
clear.addEventListener('click', clearLocalStorage)

function getData(e) {
    e.preventDefault()
    const data = {}

    data.name = name.value || ''
    data.secondName = secondName.value || ''
    data.email = email.value || ''

    const key = data.email
    storage[key] = data

    localStorage.setItem('users', JSON.stringify(storage))

    rerenderCard(JSON.parse(localStorage.getItem('users')))

    name.value = ''
    secondName.value = ''
    email.value = ''

    return data
}

function createCard({ name, secondName, email }) {
    return `
        <div>
            <p>${name}</p>
            <p>${secondName}</p>
            <p>${email}</p>
        </div>
    `
}

function rerenderCard(storage) {
    users.innerHTML = ''

    Object.entries(storage).forEach(user => {
        const [email, userData] = user

        const div = document.createElement('div')
        div.className = 'user'
        div.innerHTML = createCard(userData)
        users.append(div)
    })
}

function clearLocalStorage() {
    window.location.reload()
    localStorage.removeItem('users')
}

// После перезагрузки страницы подтягиваем данные из localStorage
window.onload = rerenderCard(JSON.parse(localStorage.getItem('users')))



















