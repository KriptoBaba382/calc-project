let title = document.getElementsByTagName('h1')[0];
let buttons = document.getElementsByClassName('handler_btn')[0];
let screen = document.querySelector('.screen-btn');
let other = document.querySelectorAll('.other-items.percent');
let num = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback input[type="range"]');
let rangeSpan = document.querySelector('.rollback span.range-value');
let totalInput = document.getElementsByClassName('total-input');
let blockScreen = document.querySelectorAll('.screen');

const appData = {
    title: "",
    screens: [],
    adaptive: true,
    allServicePrices: 0,
    services: {},
    rollback: 15,
    fullPrice: 0,
    ServicePercentPrice: 0,
    init: function () {
        appData.addTitle()
        buttons.addEventListener('click', appData.start)
    },
    addTitle: function () {
        document.title = title.textContent
    },
    start: function () {
        appData.addScreens()
        // this.asking();
        // this.allServicePrices = this.getAllServicePrices();
        // this.fullPrice = this.getFullPrice();
        // this.logger();
    },
    asking: function () {
        this.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        this.askScreens();
        this.adaptive = confirm("Нужен ли адаптив на сайте?");
        this.askServicePrices();
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    addScreens: function () {
        blockScreen.forEach(function (screen) {
            console.log(screen);
        })
    },
    getAllServicePrices() {
        let sum = 0;
        for (const key in this.services) {
            sum += this.services[key];
        }
        return sum;
    },
    askScreens() {
        for (let i = 0; i < 2; i++) {
            const name = this.stringValidatePrompt(
                "Какие типы экранов надо разработать?",
                "простые, сложные, невозможные"
            );
            const price = +this.numberValidatePrompt("Сколько это будет стоить?");
            this.screens.push({
                id: i,
                name,
                price,
            });
        }
    },
    askServicePrices() {
        for (let i = 0; i < 2; i++) {
            const name = this.stringValidatePrompt(
                "Какой дополнительный тип услуги нужен?"
            );

            this.services[`${name}__${i}`] = +this.numberValidatePrompt(
                "Сколько это будет стоить?"
            );
        }
    },

    numberValidatePrompt(text, ansDefault = "") {
        return this.validatePromt(text, this.isNumber, ansDefault);
    },
    stringValidatePrompt(text, ansDefault = "") {
        return this.validatePromt(
            text,
            (val) => typeof val === "string" && !this.isNumber(val),
            ansDefault
        );
    },

    validatePromt(text, validateFn, ansDefault = "") {
        let val = prompt(text, ansDefault);
        while (!validateFn(val)) {
            alert("Значение не верно! Введите верное значение");
            val = prompt(text);
        }
        return val;
    },

    getRollbackMessage:
        function (/* Эта функция принимает входной параметр - цена (price) */) {
            if (this.fullPrice >= 30000) {
                return "Даем скидку в 10%";
            }
            if (this.fullPrice >= 15000 && this.fullPrice < 30000) {
                return "Даем скидку в 5%";
            }
            if (this.fullPrice < 1500 && this.fullPrice > 0) {
                return "Скидка не предусмотрена";
            }
            if (this.fullPrice <= 0) {
                return "Скидка не предусмотрена";
            }
        },

    get screenPrice() {
        return this.screens.reduce((acc, screen) => {
            acc += screen.price;
            return acc;
        }, 0);
    },
    getFullPrice() {
        console.log(this.screenPrice);
        return this.screenPrice + this.allServicePrices;
    },
    getTitle() {
        return this.title.charAt(0).toUpperCase() + this.title.slice(1);
    },
    getServicePercentPrices() {
        return this.fullPrice - this.fullPrice * (this.rollback / 100);
    },

    logger: function () {
        console.log(this.services);
        console.log(this.screens);
        console.log(this.allServicePrices);
        console.log(this.fullPrice);
    },
};
appData.init();

