let name = document.querySelector('#name'),
    secondName = document.querySelector('#secondName'),
    email = document.querySelector("#email"),
    btn = document.querySelector('.btn'),
    users = document.querySelector('.users'),
    clear = document.querySelector('.clear')

// Объект для localStorage
let storage = JSON.parse(localStorage.getItem('users')) || {}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
            console.log("Карта USERS обновилась")
        }
    })
})

observer.observe(users, {
    childList: true
})

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

    return data
}

function createCard({ name, secondName, email }) {
    return `
        <div class="user-outer">
            <div class="user-info">
                <p>${name}</p>
                <p>${secondName}</p>
                <p>${email}</p>
            </div>
            <div class="menu">
                <button class="delete">Удалить</button>
                <button class="change">Применить</button>
            </div>
        </div>
    `
}

function rerenderCard(storage) {
    users.innerHTML = ''

    /*
    storage имеет структуру
    storage = {
        email1: {
            name: '',
            secondName: '',
            email: ''
        },
        email2: {
            name: '',
            secondName: '',
            email: '',
        }
    }
     */

    /*
    Object.etries переводит объект в массив
    Object.etries(storage) ===>>>> [
            ['email1', {name: '', secondName: '', email: ''}],
            ['email2', {name: '', secondName: '', email: ''}]
        ]
     */

    Object.entries(storage).forEach(user => {
        // user = ['email1', {name: '', secondName: '', email: ''}]
        const [email, userData] = user
        console.log("USER  === ", user)
        console.log("EMAIL === ", email)
        console.log("DATA  === ", userData)

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

function show(el) {
    el.style.display = 'block'
}

function hide(el) {
    el.style.display = 'none'
}

// После перезагрузки страницы подтягиваем данные из localStorage
window.onload = rerenderCard(JSON.parse(localStorage.getItem('users')))



















