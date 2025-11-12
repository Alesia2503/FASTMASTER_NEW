document.addEventListener('DOMContentLoaded', () => {

    /* ==================================== */
    /* 1. ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ */
    /* ==================================== */
    // Шапка и меню
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    const body = document.body;
    const menuCloseBtn = document.querySelector('.menu-close-btn');
    const headerElement = document.querySelector('.header');

    // Модальное окно
    const modal = document.getElementById('callback-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn'); 
    const closeModalBtn = document.querySelector('.modal-close');
    const callbackForm = document.getElementById('callback-form');
    
    // Формы
    const pageFormSimple = document.getElementById('callback-form-page-simple');

    // Табы услуг
    const tabButtons = document.querySelectorAll('.tab-button');
    const serviceContents = document.querySelectorAll('.services-content');
    
    // Кнопка наверх
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // Слайдер
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 1;
    const totalSlides = slides.length;
    
    
    /* ==================================== */
    /* 2. БУРГЕР МЕНЮ - ОТКРЫТИЕ/ЗАКРЫТИЕ */
    /* ==================================== */

    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainMenu.classList.toggle('open');
        body.classList.toggle('no-scroll');
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', toggleMenu);
    }
    
    /* ==================================== */
    /* 3. ПЛАВНЫЙ СКРОЛЛ И ЗАКРЫТИЕ МЕНЮ */
    /* ==================================== */

    mainMenu.querySelectorAll('li a[data-target-id]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const targetId = link.getAttribute('data-target-id');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = headerElement ? headerElement.offsetHeight : 0;
                // Скролл с учетом фиксированной шапки
                const targetPosition = targetElement.offsetTop - headerHeight + 1; 

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Закрываем меню
            if (mainMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    /* ==================================== */
    /* 4. МОДАЛЬНОЕ ОКНО И ФОРМЫ */
    /* ==================================== */

    const closeModal = () => {
        if(modal) modal.style.display = 'none';
        body.classList.remove('no-scroll');
        if(callbackForm) callbackForm.reset();
    };
    
    // Открытие по кнопкам
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if(modal) modal.style.display = 'block';
            body.classList.add('no-scroll');
        });
    });

    // Закрытие по крестику
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Закрытие по клику вне окна
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Обработка отправки формы модального окна (пример)
    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Заявка успешно отправлена! Мы скоро свяжемся с вами.');
            closeModal();
        });
    }

    // Обработка формы на странице контактов
    if (pageFormSimple) {
        pageFormSimple.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Сообщение успешно отправлено! Мы скоро свяжемся с вами.');
            pageFormSimple.reset(); 
        });
    }

    
    /* ==================================== */
    /* 5. ЛОГИКА ТАБОВ УСЛУГ */
    /* ==================================== */

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            serviceContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });


    /* ==================================== */
    /* 6. ЛОГИКА СЛАЙДЕРА (ИМИТАЦИЯ) */
    /* ==================================== */
    
    const showSlide = (n) => {
        if (totalSlides === 0) return; 

        if (n > totalSlides) {
            n = 1;
        }
        if (n < 1) {
            n = totalSlides;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[n - 1].classList.add('active');
        dots[n - 1].classList.add('active');
        currentSlide = n;
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    if (totalSlides > 0) {
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = Array.from(dots).indexOf(dot) + 1;
                showSlide(index);
            });
        });

        showSlide(currentSlide);
    }
    
    
    /* ==================================== */
    /* 7. ЛОГИКА КНОПКИ НАВЕРХ (Scroll-to-Top) */
    /* ==================================== */
    
    const getScrollPercent = () => {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return (window.scrollY / scrollHeight) * 100;
    };

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (getScrollPercent() > 50) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});