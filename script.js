document.addEventListener('DOMContentLoaded', () => {

    /* ==================================== */
    /* 0. АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ ГОДА */
    /* ==================================== */
    const copyrightElement = document.getElementById('current-year-copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        // Находим текст и заменяем 2025 (или любой другой год) на текущий
        copyrightElement.textContent = copyrightElement.textContent.replace(/20\d{2}/, currentYear);
    }


    /* ==================================== */
    /* 1. ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ */
    /* ==================================== */
    
    // Общие
    const body = document.body;
    const headerElement = document.querySelector('.header');
    const THANK_YOU_PAGE_URL = 'thank-you.html'; 

    // Шапка и меню
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    const menuCloseBtn = document.querySelector('.menu-close-btn');

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
    /* 2. МАСКА ТЕЛЕФОНА И ВАЛИДАЦИЯ */
    /* ==================================== */
    
    if (typeof Inputmask !== 'undefined') {
        
        const phoneMask = {
            mask: "+375 (99) 999-99-99",
            placeholder: "+375 (XX) XXX-XX-XX",
            showMaskOnHover: false,
            showMaskOnFocus: true,
            clearIncomplete: true 
        };

        const phoneInputs = [
            document.getElementById('phone'),          
            document.getElementById('page_phone_simple')
        ].filter(el => el != null);

        phoneInputs.forEach(input => {
            Inputmask(phoneMask).mask(input);
        });
    } else {
        console.error("Библиотека Inputmask не найдена.");
    }
    
    
    /* ==================================== */
    /* 3. ФУНКЦИИ УТИЛИТ */
    /* ==================================== */
    
    const redirectToThankYou = () => {
        window.location.href = THANK_YOU_PAGE_URL;
    };
    
    // Функция открытия/закрытия меню
    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainMenu.classList.toggle('open');
        body.classList.toggle('no-scroll');
    };

    // Функция закрытия модального окна
    const closeModal = () => {
        if(modal) modal.style.display = 'none';
        body.classList.remove('no-scroll');
        if(callbackForm) callbackForm.reset();
    };

    // НОВАЯ ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА С АВТОЗАПОЛНЕНИЕМ
    const openModal = (e) => {
        e.preventDefault();
        
        if(modal) modal.style.display = 'block';
        body.classList.add('no-scroll');

        // --- ЛОГИКА АВТОЗАПОЛНЕНИЯ УСЛУГИ ---
        const serviceName = e.currentTarget.getAttribute('data-service-name');
        const serviceSelect = document.getElementById('service');
        
        if (serviceSelect && serviceName) {
            let optionExists = false;
            
            // Сначала удаляем временные опции, если они были
            Array.from(serviceSelect.options).forEach(option => {
                if (option.getAttribute('data-temp')) {
                    option.remove();
                }
            });

            // Проверяем, есть ли такой пункт в SELECT (по значению)
            Array.from(serviceSelect.options).forEach(option => {
                if (option.value === serviceName) {
                    optionExists = true;
                    option.selected = true; // Выбираем существующий пункт
                }
            });
            
            // Если такого пункта нет, добавляем его временно и выбираем
            if (!optionExists) {
                const newOption = document.createElement('option');
                newOption.value = serviceName;
                newOption.textContent = serviceName;
                newOption.selected = true;
                newOption.setAttribute('data-temp', 'true'); // Метка для удаления
                serviceSelect.appendChild(newOption);
            }
        }
    };


    /* ==================================== */
    /* 4. БУРГЕР МЕНЮ И СКРОЛЛ */
    /* ==================================== */

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', toggleMenu);
    }
    
    // Плавный скролл из меню
    mainMenu.querySelectorAll('li a[data-target-id]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const targetId = link.getAttribute('data-target-id');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = headerElement ? headerElement.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight + 1; 

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            if (mainMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    /* ==================================== */
    /* 5. ОБРАБОТКА ФОРМ */
    /* ==================================== */

    // Открытие модального окна (ИСПОЛЬЗУЕМ НОВУЮ ФУНКЦИЮ)
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Закрытие модального окна
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Обработка отправки формы модального окна
    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal();
            redirectToThankYou();
        });
    }

    // Обработка формы на странице контактов
    if (pageFormSimple) {
        pageFormSimple.addEventListener('submit', (e) => {
            e.preventDefault();
            pageFormSimple.reset(); 
            redirectToThankYou();
        });
    }

    
    /* ==================================== */
    /* 6. ЛОГИКА ТАБОВ УСЛУГ */
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
    /* 7. ЛОГИКА СЛАЙДЕРА (ИМИТАЦИЯ) */
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
    /* 8. ЛОГИКА КНОПКИ НАВЕРХ (Scroll-to-Top) */
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