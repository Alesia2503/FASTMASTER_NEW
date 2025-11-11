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