;'use strict';

import LazyLoad from 'vanilla-lazyload';
import Swiper from 'swiper';
import 'lightgallery.js';
import anime from 'animejs/lib/anime.es.js';
import 'waypoints/lib/noframework.waypoints.js';
import { 
  toggleScroll,
  hasClass,
  slideToggle,
  slideUp,
  slideDown
} from './functions.js';

// APP
let lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});

// Event DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Loader Page
  (function() {
    const loader = document.querySelector('.loader');

    loader.classList.add('loader_hide');

    setTimeout(() => {
      toggleScroll('show');
    }, 800);
  })();

  // Menu
  const btnMenu = document.querySelector('.btn-menu');
  if (btnMenu) {
    btnMenu.addEventListener('click', (event) => {
      event.preventDefault();
      const sidebarMenu = document.querySelector('.sidebar-menu');
      if ( !hasClass(btnMenu, 'btn-menu_active') ) {
        btnMenu.classList.add('btn-menu_active')
        sidebarMenu.classList.add('sidebar-menu_active');
        toggleScroll('hide');

        anime({
          targets: '.list-nav-sidebar__item, .sidebar-menu__city',
          easing: 'easeOutBack',
          opacity: [0,1],
          translateX: ['20px',0],
          rotateX: [90,0],
          duration: 800,
          delay: anime.stagger(100, {start: 300})
        });
      } else {
        btnMenu.classList.remove('btn-menu_active')
        sidebarMenu.classList.remove('sidebar-menu_active');
        toggleScroll('show');
      }
    }, false);
  }

  // Close sidebar
  const SidebarClose = document.querySelector('.sidebar-menu__close');
  if (SidebarClose) {
    SidebarClose.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('.btn-menu').classList.remove('btn-menu_active');
      document.querySelector('.sidebar-menu').classList.remove('sidebar-menu_active');
      toggleScroll('show');
    }, false);
  }
  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) {
      event.preventDefault();
      document.querySelector('.btn-menu').classList.remove('btn-menu_active');
      document.querySelector('.sidebar-menu').classList.remove('sidebar-menu_active');
      toggleScroll('show');
    }
  }, false);

  // Slider products
  var swiper = new Swiper('.slider-products', {
    initialSlide: 4,
    slidesPerView: 6,
    spaceBetween: 0,
    centeredSlides: true,
    centeredSlidesBounds: true,
    loop: true,
    grabCursor: true,
    on: {
      init: function () {
        lazyLoadInstance.update();
      },
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 4,
      }
    }
  });
  swiper.on('slideChange', function () {
    lazyLoadInstance.update();
  });

  // Tabs
  (function () {
    const tabs = document.querySelectorAll('.tab');
    if (tabs) {
      tabs.forEach(tab => {
        const dataTab = tab.querySelector('.tab__link_active').getAttribute('data-tab');
        const contentItems = tab.querySelectorAll('.tab__content-item');
        const tabLinks = tab.querySelectorAll('.tab__link');
        const dataTitle = tab.querySelector('.tab__link_active').getAttribute('data-title');

        // Init
        contentItems.forEach(block => {
          block.classList.remove('tab__content-item_active');
        }, false);
        tab.querySelector(dataTab).classList.add('tab__content-item_active');

        // Change tab
        tabLinks.forEach(link => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            const clickedLink = event.currentTarget;
            const clickedLinkData = clickedLink.getAttribute('data-tab');
            const clickedLinkDataTitle = clickedLink.getAttribute('data-title');

            tabLinks.forEach(link => {
              link.classList.remove('tab__link_active');
            }, false);
            clickedLink.classList.add('tab__link_active');

            contentItems.forEach(item => {
              item.classList.remove('tab__content-item_active');
            }, false);
            tab.querySelector(clickedLinkData).classList.add('tab__content-item_active');

          }, false);
        }, false);
      }, false);
    }
  })();

  // Animations
  (function () {
    const elemsAnimation = '.animation-products';
    const selectorAnimation = document.querySelector(elemsAnimation);

    anime({
      targets: elemsAnimation,
      opacity: 0,
      duration: 0
    });

    function doAnimate() {
      anime({
        targets: elemsAnimation,
        easing: 'easeOutBack',
        opacity: [0,1],
        rotateY: [90,0],
        duration: 1000,
        delay: anime.stagger(200, {start: 200})
      });
    }

    // Когда доскролили до елемента начать анимацию
    if ( selectorAnimation ) {
      const waypoint = new Waypoint({
        element: selectorAnimation,
        handler: function(direction) {
          if( direction === 'down' ) {
            doAnimate();
            // Animate once
            this.destroy();
          }
        },
        offset: '100%'
      });
    }
  })();

  // Animations
  (function () {
    const elemsAnimation = '.animation-features';
    const selectorAnimation = document.querySelector(elemsAnimation);

    anime({
      targets: elemsAnimation,
      opacity: 0,
      duration: 0
    });

    function doAnimate() {
      anime({
        targets: elemsAnimation,
        easing: 'easeInOutBack',
        opacity: [0,1],
        rotateY: [60,0],
        translateX: ['-50px',0],
        duration: 1000,
        delay: anime.stagger(200, {start: 200})
      });
    }

    // Когда доскролили до елемента начать анимацию
    if ( selectorAnimation ) {
      const waypoint = new Waypoint({
        element: selectorAnimation,
        handler: function(direction) {
          if( direction === 'down' ) {
            doAnimate();
            // Animate once
            this.destroy();
          }
        },
        offset: '100%'
      });
    }
  })();

});