let name = document.querySelector("#name"),
  secondName = document.querySelector("#secondName"),
  email = document.querySelector("#email"),
  credit = document.querySelector("#creditCardNumber"),
  pin = document.querySelector("#pinNumber"),
  btn = document.querySelector(".btn"),
  users = document.querySelector(".users"),
  clear = document.querySelector(".clear"),
  tochange = { email: "", card: "" };

// Объект для localStorage
let storage = JSON.parse(localStorage.getItem("users")) || {};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length || mutation.removedNodes.length) {
      console.log("Карта USERS обновилась");
      setListeners();
    }
  });
});

observer.observe(users, {
  childList: true,
});

btn.addEventListener("click", getData);
clear.addEventListener("click", clearLocalStorage);

function getData(e) {
  e.preventDefault();
  const data = {};

  if (email.value === "") {
    return;
  }
  data.name = name.value || "";
  data.secondName = secondName.value || "";
  data.email = email.value || "";
  data.credit = credit.value || "";
  data.pin = pin.value || "";

  const key = data.email;

  storage[key] = data;
  localStorage.setItem("users", JSON.stringify(storage));

  if (tochange.email && tochange.email !== key) {
    deleteCard(tochange.email);
    tochange.email = "";
    tochange.card = "";
  }

  rerenderCard(JSON.parse(localStorage.getItem("users")));
}

function createCard({ name, secondName, email, credit, pin }) {
  return `
        <div data-out=${email} class="user-outer shadow-md">
            <div class="user-info">
                <p>${name}</p>
                <p>${secondName}</p>
                <p>${email}</p>
                <p>${credit}</p>
                <p>${pin}</p>
            </div>
            <div class="menu">
                <button data-delete=${email} class="delete">Удалить</button>
                <button data-change=${email} class="change">Применить</button>
            </div>
        </div>
    `;
}

function rerenderCard(storage) {
  users.innerHTML = "";

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

  Object.entries(storage).forEach((user) => {
    // user = ['email1', {name: '', secondName: '', email: ''}]
    const [email, userData] = user;
    console.log("USER  === ", user);
    console.log("EMAIL === ", email);
    console.log("DATA  === ", userData);

    const div = document.createElement("div");
    div.className = "user shadow-md";
    div.innerHTML = createCard(userData);
    users.append(div);
  });
}

function deleteCard(clicked) {
  delete storage[clicked]; //storage глобальный обьект!
  localStorage.setItem("users", JSON.stringify(storage));
}

function setListeners() {
  const del = document.querySelectorAll(".delete");
  const change = document.querySelectorAll(".change");
  let clicked;

  del.forEach((n) => {
    n.addEventListener("click", () => {
      console.log("УДАЛИТЬ кнопка");
      console.log("=== NODE:", n);
      clicked = n.getAttribute("data-delete");

      const outer = document.querySelector(`[data-out="${clicked}"]`);
      console.log("=== outer", outer);
      deleteCard(clicked);
      let ls = JSON.parse(localStorage.getItem("users"));
      rerenderCard(ls);
    });
  });

  change.forEach((n) => {
    n.addEventListener("click", () => {
      console.log("=== ПРИМЕНИТЬ кнопка");
      const clicked = n.getAttribute("data-change");
      let ls = JSON.parse(localStorage.getItem("users"));
      name.value = ls[clicked].name;
      secondName.value = ls[clicked].secondName;
      email.value = ls[clicked].email;
      //это проверка, если какойто элемент уже выбран, тогда надо убрать с него стиль выделения
      if (tochange.email) {
        tochange.card.style.outline = "";
      }
      tochange.email = clicked;
      tochange.card = n.parentElement.parentElement.parentElement;
      tochange.card.style.outline = "#f5d72a solid 5px";
    });
  });
}

function clearLocalStorage() {
  window.location.reload();
  localStorage.removeItem("users");
}

function show(el) {
  el.style.display = "block";
}

function hide(el) {
  el.style.display = "none";
}

// После перезагрузки страницы подтягиваем данные из localStorage
window.onload = rerenderCard(JSON.parse(localStorage.getItem("users")));
