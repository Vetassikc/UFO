// Чекаємо, поки вся сторінка (DOM) завантажиться, перш ніж виконувати скрипт
document.addEventListener('DOMContentLoaded', () => {

    // Знаходимо всі кнопки-фільтри та всі елементи меню
    const filterButtons = document.querySelectorAll('.filter-button');
    const menuItems = document.querySelectorAll('.menu-item');

    // Додаємо обробник кліку для кожної кнопки
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Отримуємо значення фільтра з атрибута data-filter кнопки
            const filter = button.dataset.filter;

            // Проходимось по кожному елементу меню
            menuItems.forEach(item => {
                // Отримуємо категорію елемента меню з його атрибута data-category
                const category = item.dataset.category;

                // Перевіряємо, чи потрібно показати чи приховати елемент
                if (filter === 'all' || filter === category) {
                    // Якщо фільтр 'all' або категорія збігається, показуємо елемент
                    item.classList.remove('hidden');
                } else {
                    // Інакше - приховуємо елемент
                    item.classList.add('hidden');
                }
            });

            // Робимо активною тільки натиснуту кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

// Додаємо простий клас для анімації приховування/появи
document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.add('visible'); // Початковий стан
});

// перевизначення класу .hidden з анімацією
const style = document.createElement('style');
style.innerHTML = `
    .menu-item.hidden {
        animation: fadeOut 0.5s forwards;
    }
    .menu-item {
         animation: fadeIn 0.5s forwards;
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); height: 0; padding: 0; margin: 0; border: 0;}
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);