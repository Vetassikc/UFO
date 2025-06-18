// Чекаємо, поки вся сторінка (DOM) завантажиться, перш ніж виконувати скрипт
document.addEventListener('DOMContentLoaded', () => {

    // --- НОВИЙ КОД ДЛЯ КЕРУВАННЯ ЗАСТАВКОЮ ---
    const preloader = document.getElementById('preloader');
    // Встановлюємо таймер, щоб приховати заставку через 3.2 секунди
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3200);
    // --- КІНЕЦЬ НОВОГО КОДУ ---


    // Знаходимо всі кнопки-фільтри та всі елементи меню (старий код)
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

// === ГЕНЕРАЦІЯ ЗІРОК ДЛЯ ФОНУ ===
function createStars() {
    const container = document.querySelector('body');
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    
    for (let i = 0; i < 200; i++) { // Створюємо 200 зірок
        const star = document.createElement('div');
        const sizeClass = i % 20 === 0 ? 'stars-large' : i % 5 === 0 ? 'stars-medium' : 'stars-small';
        star.className = `stars ${sizeClass}`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`; // Різна затримка для асинхронного блимання
        starsContainer.appendChild(star);
    }
    container.prepend(starsContainer); // Додаємо контейнер на початок body
}

// Запускаємо генерацію зірок після завантаження сторінки
createStars();

// === ФІНАЛЬНА ВЕРСІЯ КОДУ ДЛЯ КНОПКИ "ПОВЕРНУТИСЯ НАГОРУ" ===

// Ця функція запуститься тільки після того, як вся сторінка буде готова
document.addEventListener('DOMContentLoaded', () => {

    // Підтвердження, що основний скрипт почав працювати
    console.log('DOM завантажено. Шукаємо кнопку...');

    const backToTopButton = document.getElementById('back-to-top-btn');

    // Перевіряємо, чи знайшлася кнопка
    if (backToTopButton) {
        console.log('Кнопка "нагору" успішно знайдена!');

        // Функція, яка показує або ховає кнопку
        const toggleButtonVisibility = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            
            // Діагностика, яка спрацює ТІЛЬКИ ЯКЩО подія scroll відбулася
            console.log('Подія scroll! Позиція:', scrollPosition);

            if (scrollPosition > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        // Функція для скролу нагору
        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Прив'язуємо слухача події до вікна
        window.addEventListener('scroll', toggleButtonVisibility);
        
        // Прив'язуємо слухача події до кнопки
        backToTopButton.addEventListener('click', scrollToTop);

        console.log('Слухачі подій для кнопки та скролу додано.');

    } else {
        console.error('ПОМИЛКА: Кнопка "нагору" з id "back-to-top-btn" не знайдена в HTML.');
    }
});