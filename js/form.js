var link = document.querySelector(".contacts-btn-link");
var popup = document.querySelector(".modal-write");
var close = document.querySelector(".modal-close");
var form = popup.querySelector("form");
var name = popup.querySelector("[name=fio]");//Поработаем над улучшением формы входа. Фокус будет автоматически устанавливается в поле ввода логина.
var email = popup.querySelector("[name=pochta]");//Будем проверять все поля ввода в форме, поэтому найдём второе поле.
var text = popup.querySelector("[name=pismo]");

var isStorageSupport = true; //Некоторые браузеры не имеют поддержку localStorage или он может быть отключен нам стоит учитывать такую возможность.
var storage = "";
try {
    storage = localStorage.getItem("login");
} catch (err) {
    isStorageSupport = false;
}

link.addEventListener("click", function (evt) {//Поймаем событие клика по этой кнопке.
    evt.preventDefault(); //Отменим стандартное действие при нажатии на нее.
    popup.classList.add("modal-show");//С помощью метода classList.add добавляем этот класс к модальному окну по клику на ссылку.
    if (storage) { //Если значение существует, записываем логин в соответствующее поле воода при открытии модального окна.
        name.value = storage;
        email.focus();
        text.focus();
    } else {
        email.focus();//Сместим фокус на поле ввода пароля, если значение логина уже есть.
    }
});

close.addEventListener("click", function (evt) {//Обработчик клика по кнопке закрытия.
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {//Отловим событие отправки формы и отменим его стандартное действие.
    if(!name.value || !email.value || !text.value) { // Отменим отправку формы, если какое-то из полей незаполнено.
        evt.preventDefault();
        popup.classList.add("modal-error");//Если форма не валидна, добавим модальному окну класс ошибки.
        popup.offsetWidth.remove("modal-error");
        popup.classList.add("modal-error"); // Анимация ошибки будет отрабатываться несколько раз.
    }
    else {
        if (isStorageSupport) {
            localStorage.setItem("name", name.value); //А в случе правильно заполенной формы запишем логин пользователя в локальном хранилище.
        }
    }
});

window.addEventListener("keydown", function (evt) { // Обработчик события который отлавливает нажатие кнопки Esc и в случае если модальное окно открыто, закрывать его.
    if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popup.classList.contains("modal-show")) {
            popup.classList.remove("modal-show");
            popup.classList.remove("modal-error");
        }
    }
});