// script

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
            // ваш код
        }
    })
})

// Поменяйте название переменной elem
const elem = document.querySelector('ЗДЕСЬ_КЛАСС_КОТОРЫЙ_ХОТИТЕ_ОТСЛЕДИТЬ')
observer.observe(elem, {
    childList: true
})
