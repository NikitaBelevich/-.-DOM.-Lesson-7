'use strict';


// Task 1. Очистите элемент. Создайте функцию clear(elem), которая удаляет всё содержимое из elem.
let olElem = document.querySelector('.task1').lastElementChild;
let but1 = document.querySelector('.task1 button');
but1.addEventListener('click', () => {
    clear(olElem);
});

function clear(elem) {
    elem.firstElementChild.remove();
    elem.lastElementChild.remove();
}
































