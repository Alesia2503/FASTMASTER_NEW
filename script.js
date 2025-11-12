document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    const body = document.body;

    // Функция для открытия/закрытия меню
    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        // Обновляем атрибуты ARIA
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Переключаем класс для анимации и отображения меню
        mainMenu.classList.toggle('open');
        
        // Дополнительный класс для блокировки скролла на мобильных устройствах
        body.classList.toggle('no-scroll');
        
        // Анимация бургер-иконки (Опционально: можно добавить в CSS)
        // menuToggle.classList.toggle('is-active'); 
    };

    menuToggle.addEventListener('click', toggleMenu);
    
    // Закрытие меню при клике по ссылке
    mainMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });
});

/* ВНИМАНИЕ: Для блокировки скролла необходимо добавить в CSS: */
/*
body.no-scroll {
    overflow: hidden;
}
*/




document.addEventListener('DOMContentLoaded', () => {
    // ... (Существующий код для бургер-меню) ...
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    const body = document.body;
    const menuCloseBtn = document.querySelector('.menu-close-btn');

    // ... (Функция toggleMenu и обработчики) ...
    const toggleMenu = () => {
        // ... (Существующая логика) ...
    };

    menuToggle.addEventListener('click', toggleMenu);
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', toggleMenu);
    }
    mainMenu.querySelectorAll('li a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    
    /* ==================================== */
    /* ЛОГИКА МОДАЛЬНОГО ОКНА */
    /* ==================================== */
    const modal = document.getElementById('callback-modal');
    // Используем класс для всех кнопок "Оставить заявку"
    const openModalBtns = document.querySelectorAll('.open-modal-btn'); 
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('callback-form');

    // Функция открытия модального окна
    const openModal = (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        body.classList.add('no-scroll');
    };

    // Функция закрытия модального окна
    const closeModal = () => {
        modal.style.display = 'none';
        body.classList.remove('no-scroll');
    };

    // Открытие по кнопкам
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Закрытие по крестику
    closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне окна
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Обработка отправки формы (пример)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // ВАШ КОД ДЛЯ ОТПРАВКИ ДАННЫХ НА СЕРВЕР (AJAX/Fetch)
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;

        console.log('Данные формы:', { name, phone, service });
        
        // В реальном проекте: после успешной отправки
        alert('Заявка успешно отправлена! Мы скоро свяжемся с вами.');
        closeModal();
        form.reset(); // Сброс формы
    });
});



// ... (Существующий код для бургер-меню и модального окна) ...

/* ==================================== */
/* ЛОГИКА ТАБОВ (ПЕРЕКЛЮЧЕНИЯ УСЛУГ) */
/* ==================================== */
const tabButtons = document.querySelectorAll('.tab-button');
const serviceContents = document.querySelectorAll('.services-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;

        // 1. Сброс активного состояния кнопок
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // 2. Скрытие всего контента
        serviceContents.forEach(content => content.classList.remove('active'));

        // 3. Активация текущей кнопки и контента
        button.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    });
});





// ... (Существующий код для бургер-меню, модального окна и табов) ...

/* ==================================== */
/* ЛОГИКА КНОПКИ НАВЕРХ (Scroll-to-Top) */
/* ==================================== */
const scrollToTopBtn = document.getElementById('scroll-to-top');

// Функция для определения, на сколько процентов прокручен экран
const getScrollPercent = () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (window.scrollY / scrollHeight) * 100;
};

// Обработчик прокрутки
window.addEventListener('scroll', () => {
    // Показать кнопку, когда прокручено более 50%
    if (getScrollPercent() > 50) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Обработчик нажатия
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});