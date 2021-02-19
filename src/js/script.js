//modules

import { products } from './products.js'
import Swiper from 'swiper/bundle'

window.addEventListener('DOMContentLoaded', function () {


    //--------------------------------swiper----------------------

    const galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 20,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: 'vertical',
    });
    const swiper = new Swiper('.gallery-top', {
        direction: 'vertical',
        loop: false,
        thumbs: {
            swiper: galleryThumbs
        }
    });

    //---------------------Change color buttons-----------------------

    const orangeBtn = document.querySelectorAll('.js-button--orange'),
        blueBtn = document.querySelectorAll('.js-button--blue'),
        greenBtn = document.querySelectorAll('.js-button--green'),
        carusel = document.querySelectorAll('.js-gallery-top img'),
        thumbs = document.querySelectorAll('.js-gallery-thumbs img'),
        addBtn = document.querySelector('.js-button--add');
    let chosenVariant;

    const changeColor = (arr, btn) => {
        arr.forEach((product, index) => {
            if (btn.getAttribute('data-id') === product.variantID) {
                product.imgSrc.forEach((p, i) => {
                    thumbs[i].src = `./img/${p}`
                    carusel[i].src = `./img/${p}`
                })
                product.quantity = 1
                chosenVariant = product
            }
        })
    };
    changeColor(products, orangeBtn[0])

    orangeBtn.forEach(btn => {
        btn.addEventListener('click', () => changeColor(products, btn))
    })
    blueBtn.forEach(btn => {
        btn.addEventListener('click', () => changeColor(products, btn))
    })
    greenBtn.forEach(btn => {
        btn.addEventListener('click', () => changeColor(products, btn))
    })

    const addProduct = async (title) => {

        let response = await fetch('http://localhost:3004/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(title)
        });

        let result = await response.json();
        console.log(result)

    }

    addBtn.addEventListener('click', () => {
        addProduct(chosenVariant)
    })

});