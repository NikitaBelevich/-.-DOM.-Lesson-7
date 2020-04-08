'use strict';


// Task 1. Очистите элемент. Создайте функцию clear(elem), которая удаляет всё содержимое из elem.
let olElem = document.querySelector('.task1').lastElementChild;
let but1 = document.querySelector('.task1 button');
but1.addEventListener('click', () => {
    clear(olElem);
});

function clear(elem) {
    while (elem.children.length != 0) {
        elem.firstElementChild.remove();
    }
}


/* 
Task 2. Создайте список 
Напишите интерфейс для создания списка. 

Для каждого пункта:
Запрашивайте содержимое пункта у пользователя с помощью prompt.
Создавайте элемент li и добавляйте его к ul.
Процесс прерывается, когда пользователь нажимает Esc или вводит пустую строку
Все элементы должны создаваться динамически.

Если пользователь вводит HTML-теги -– пусть в списке они показываются как обычный текст.
*/
let divTask2 = document.querySelector('.task2');
const but2 = document.querySelector('.task2 button');
but2.addEventListener('click', () => {
    generateList(divTask2);
});

function generateList(targetElement) {
    const title = document.createElement('h3');
    title.textContent = 'Create List';
    targetElement.append(title);

    const list = document.createElement('ul');
    targetElement.append(list);
    while (true) {
        let textLi = prompt('Введите текст для пункта списка', '');
        if (!textLi) {
            if (list.children.length == 0) list.remove();
            throw new Error('Отмена генерации списка');
        }

        const li = document.createElement('li');
        li.textContent = textLi;
        list.append(li);
    }
}


























