

document.addEventListener("DOMContentLoaded", function () {
    Fancybox.bind("[data-fancybox]", {

    });


    //------ Слайдеры ------ //

    function heroSlider() {
        // Инициализация Swiper
        const hero__slider = new Swiper('.hero__slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: false,
            loop: false,
            // autoplay: {
            //     delay: 3500,
            //     disableOnInteraction: false,
            //     pauseOnMouseEnter: true
            // },


            // Навигация
            navigation: {
                nextEl: '.videos__arr.arr-r',
                prevEl: '.videos__arr.arr-l',
            },

            // Пагинация
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }

        });
    }

    heroSlider();


    function casesSlider() {
        // Инициализация Swiper
        const cases__slider = new Swiper('.cases__slider', {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: true,
            loop: false,
            initialSlide: 1, 
            // autoplay: {
            //     delay: 3500,
            //     disableOnInteraction: false,
            //     pauseOnMouseEnter: true
            // },


            // Навигация
            navigation: {
                nextEl: '.cases__arr.arr-r',
                prevEl: '.cases__arr.arr-l',
            },

            // Пагинация
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }

        });
    }

    casesSlider();

    function reviewsSlider() {
        
    
    const reviewsSlider = new Swiper('.reviews__slider', {
        direction: 'vertical', // вертикальный
        
        slidesPerView: 3, // показываем 3 слайда одновременно
        spaceBetween: 20,
        // autoplay: true,
        
        // Центрируем активный слайд
        centeredSlides: true,
        
        loop: true,
        
        // Высота контейнера должна быть фиксированной!
        // Добавь в CSS:
        // .reviews__slider { height: 600px; }
        
        navigation: {
            nextEl: '.cases__arr.arr-r',
            prevEl: '.cases__arr.arr-l',
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Плавная прокрутка
        mousewheel: {
            sensitivity: 1,
        },
    });
}

reviewsSlider();


    function caseSlider() {
        document.querySelectorAll('.case__inner-slider').forEach(slider => {
            const case__slider = new Swiper(slider, {
                slidesPerView: 1,
                spaceBetween: 0,
                centeredSlides: false,
                loop: false,
                // autoplay: {
                //     delay: 3500,
                //     disableOnInteraction: false,
                //     pauseOnMouseEnter: true
                // },


                // Навигация
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // Пагинация
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            })
        })
    }

    caseSlider()

    function serviceTabs() {
        const tabs = document.querySelectorAll('.services__tab');
        const headerHeight = 100; // Высота вашей шапки в пикселях

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                const targetElement = document.querySelector(`.sevices__item[data-tab="${tabName}"]`);

                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    serviceTabs()

    function mobMenu() {
        const burger = document.querySelector('.burger');
        const headerMobmenu = document.querySelector('.header__mobmenu ');
        const menu = document.querySelector('.mob__menu');

        burger.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события, чтобы клик по бургеру не закрывал меню
            headerMobmenu.classList.toggle('active');
        });

        headerMobmenu.addEventListener('click', () => {
            headerMobmenu.classList.remove('active');
        });

        document.addEventListener('click', (e) => {
            headerMobmenu.classList.remove('active');
        })

        // Дополнительно: предотвращаем закрытие меню при клике внутри самого меню
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });


    }

    //  mobMenu()



    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Функция для изменения цвета header
    function initHeaderColorChange() {
        const header = document.querySelector('.header');
        const main = document.querySelector('main');
        const scrollDistance = 100; // Дистанция скролла в пикселях

        gsap.to(header, {
            scrollTrigger: {
                trigger: document.body, // Можно указать конкретный элемент
                start: 'top top', // Начинаем отслеживать с верха страницы
                end: `+=${scrollDistance}`, // Дистанция срабатывания
                scrub: true, // Плавное изменение
                onEnter: () => {
                    // При скролле вниз
                    // header.style.backgroundColor = '#2c3e50'; // Новый цвет
                    // header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                    header.classList.add('header__fixed');
                    main.classList.add('header__fixed');
                },
                onLeaveBack: () => {
                    // При возврате к верху страницы
                    // header.style.backgroundColor = 'transparent'; // Исходный цвет
                    // header.style.boxShadow = 'none';
                    header.classList.remove('header__fixed');
                    main.classList.remove('header__fixed');
                }
            }
        });
    }

    // Инициализация при загрузке страницы
    initHeaderColorChange();



    const tl_header_decor = gsap.timeline({
        scrollTrigger: {
            trigger: 'body',
        }
    })

    tl_header_decor.from('.hero__decor_1', 2, {
        width: '0%',
        ease: "Expo.easeInOut"
    })


    tl_header_decor.to('.hero__decor_1', 4, {
        width: '90%',
        ease: "Expo.easeInOut"
    })

    const tl_header_btn = gsap.timeline({
        scrollTrigger: {
            trigger: 'body'
        }
    })

    tl_header_btn.from('.hero__btn', 1, {
        height: '0px',
        ease: "Expo.easeInOut",
        delay: 0.2
    })


    tl_header_btn.to('.hero__btn', 2, {
        height: '50px',
        ease: "Expo.easeInOut"
    })
    
    const tl_review_decor = gsap.timeline({
        scrollTrigger: {
            trigger: '.reviews__title-decor',
        }
    });

    tl_review_decor.from('.reviews__title-decor', 1, {
        width: '0px',
        ease: "Expo.easeInOut",
        delay: 0.2
    });

    const tl_review_text = gsap.timeline({
        scrollTrigger: {
            trigger: '.reviews__text',
        }
    });

    tl_review_text.from('.reviews__text', 1, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        delay: 0.2
    });



    // Create timeline for reviews with stagger effect
    const tl_reviews = gsap.timeline({
        scrollTrigger: {
            trigger: '.reviews__slider',
            start: 'top 80%', // Animation starts when slider enters viewport
            toggleActions: 'play none none none'
        }
    });

    // Animate each review slide with stagger
    tl_reviews.from('.review__slide', {
        duration: 1,
        opacity: 0,
        y: 100,
        stagger: {
            amount: 0.5, // Total stagger time (0.5 seconds between all animations)
            from: "start", // Can be "start", "center", "end", or "edges"
            ease: "power2.out"
        },
        ease: "power2.out"
    });




    document.querySelectorAll('.header__decor_1').forEach((element, index) => {
    // Создаем уникальную timeline для каждого элемента
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "top 80%", // можно настроить триггер
        }
    });
    
    // Анимация для самого элемента
    tl.from(element, 0.5, {
        y: '30px',
        opacity: 0,
        ease: "Expo.easeInOut"
    })
    .to(element, 0, {
        y: '0px',
        opacity: 1,
        ease: "Expo.easeInOut"
    })
    .from(element, 0.5, {
        width: '10%',
        ease: "Expo.easeInOut"
    })
    .to(element, 0, {
        width: '60%',
        ease: "Expo.easeInOut"
    });
    
    // Анимация для связанного заголовка
    // Предполагаем, что заголовок находится рядом или имеет data-атрибут
    const heading = document.querySelector(`#services-heading-${index + 1}`) || 
                   element.nextElementSibling;
    
    if (heading) {
        tl.from(heading, 0.5, {
            opacity: 0,
            ease: "Expo.easeInOut"
        }, "-=0.3") // начинаем чуть раньше
        .to(heading, 0, {
            opacity: 1,
            ease: "Expo.easeInOut"
        });
    }
});



    document.querySelectorAll('.services__item h3').forEach((header, index) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header
            }
        });
        const decor = header.closest('.services__item').querySelector('.serv__decor');
        tl.from(decor, 1.5, {
            width: '0%',
            ease: "expo.inOut"
        })
            .to(decor, 0, {
                width: '50%',
                ease: "expo.inOut"
            });
    });

    function numUp() {
            const advantages = document.querySelectorAll('.advantages__num span');
    
            advantages.forEach(advantage => {
                const finalText = advantage.innerText;
                const finalNumber = parseInt(finalText.replace(/[^0-9]/g, ''));
                const suffix = finalText.replace(/[0-9]/g, '');
                
                // Объект для анимации числа
                const obj = { val: 0 };
                
                advantage.innerText = '0' + suffix;
                
                gsap.to(obj, {
                    scrollTrigger: {
                        trigger: advantage,
                        start: 'top 80%',
                        once: true
                    },
                    val: finalNumber,
                    duration: 3,
                    onUpdate: function() {
                        advantage.innerText = Math.floor(obj.val) + suffix;
                    },
                    ease: 'power2.in'
                });
            });
    }

    numUp()


    function serviceSpoilers() {
        const serviceContents = document.querySelectorAll('.services__item');
        const serviceShowMore = document.querySelectorAll('.service__show-more');

        serviceShowMore.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                const serviceContent = document.querySelector(`.services__item[data-tab="${tabName}"]`);

                const isOpened = serviceContent.classList.contains('opened');

                serviceContents.forEach(el => {
                    el.classList.remove('opened');
                });

                serviceShowMore.forEach(otherBtn => {
                    otherBtn.querySelector('span').textContent = 'Показать больше';
                });

                if (!isOpened) {
                    serviceContent.classList.add('opened');
                    btn.querySelector('span').textContent = 'Свернуть';
                } 

                setTimeout(() => {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const elementPosition = serviceContent.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerHeight - 20; 
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            });
        });
    }

    serviceSpoilers()

    // Единая функция для прокрутки к любому элементу
    function scrollToTarget(targetId, options = {}) {
        const {
            offset = 100,              // отступ сверху
            openService = true,         // открывать ли сервис (если это services__item)
            duration = 1000             // длительность подсветки
        } = options;

        // Ищем элемент по ID или data-tab
        let targetElement = document.getElementById(targetId);

        // Если не нашли по ID, пробуем найти по data-tab
        if (!targetElement) {
            targetElement = document.querySelector(`.services__item[data-tab="${targetId}"]`);
        }

        if (!targetElement) {
            console.warn(`Элемент с id/data-tab "${targetId}" не найден`);
            return false;
        }

        // Если это сервис и нужно его открыть
        if (openService && targetElement.classList.contains('services__item')) {
            // Закрываем все сервисы
            document.querySelectorAll('.services__item').forEach(el => {
                el.classList.remove('opened');
            });

            // Сбрасываем текст на всех кнопках
            document.querySelectorAll('.service__show-more span').forEach(span => {
                span.textContent = 'Показать больше';
            });

            // Открываем нужный сервис
            targetElement.classList.add('opened');

            // Меняем текст кнопки
            const showMoreBtn = targetElement.querySelector('.service__show-more span');
            if (showMoreBtn) {
                showMoreBtn.textContent = 'Свернуть';
            }
        }

        // Плавная прокрутка с отступом
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });



        return true;
    }

    // Обработчик кликов по табам
    document.querySelectorAll('.services__tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = tab.dataset.tab;
            scrollToTarget(tabName, {
                offset: 100,
                highlight: true,
                openService: true
            });
        });
    });

        // Обрабатываем клики по любым элементам с data-scroll
        document.body.addEventListener('click', function (e) {
            const target = e.target.closest('[data-scroll]');
            if (!target) return;

            e.preventDefault();

            const targetId = target.dataset.scroll;

            // Можно добавить свои опции для конкретных ссылок
            const options = {
                offset: parseInt(target.dataset.offset) || 100,
                highlight: target.dataset.highlight !== 'false',
                openService: target.dataset.openService !== 'false'
            };

            scrollToTarget(targetId, options);
        });
    

    // Для обратной совместимости со старым кодом
    function smoothScrollTo(element) {
        if (typeof element === 'string') {
            scrollToTarget(element);
        } else if (element && element.id) {
            scrollToTarget(element.id);
        } else if (element && element.dataset && element.dataset.tab) {
            scrollToTarget(element.dataset.tab);
        }
    }

});
