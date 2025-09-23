const title = document.getElementsByTagName("h1")[0];
const buttons = document.querySelector(".handler_btn"); // Исправлено
const screen = document.querySelector(".screen-btn");
const otherPer = document.querySelectorAll(".other-items.percent");
const otherNum = document.querySelectorAll(".other-items.number");
const rangeInput = document.querySelector('.rollback input[type="range"]');
const rangeSpan = document.querySelector(".rollback span.range-value");
const totalInput = document.getElementsByClassName("total-input");

let blockScreen = document.querySelectorAll(".screen");

const appData = {
    title: "",
    screens: [],
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    rollback: 0,
    fullPrice: 0,
    ServicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    allServicePrices: 0, // Добавлено

    init: function () {
        this.addRollback();
        appData.addTitle();
        rangeInput.addEventListener("input", this.addRollback.bind(this));
        buttons.addEventListener("click", appData.start.bind(appData));
        screen.addEventListener("click", appData.addScreenBlock.bind(appData));
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        appData.addScreens();
        if (appData.screenPrice === 0) {
            alert("Введите значение");
            return;
        }
        appData.addServices();
        appData.allServicePrices = appData.getAllServicePrices(); // Исправлено
        appData.addPrice();
        console.log(appData);
    },

    addScreens: function () {
        let blockScreen = document.querySelectorAll(".screen");
        this.screens = []; // Очищаем перед добавлением
        blockScreen.forEach(function (screen, index) {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            const count = +input.value;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: count
            });
        });
    },

    addRollback: function () {
        rangeSpan.textContent = rangeInput.value + "%";
        this.rollback = rangeInput.value;
    },

    addPrice: function () {
        const input = document.querySelector("input[type=text]");
        this.fullPrice = this.getFullPrice();
        totalInput[4].value = this.fullPrice;
        totalInput[1].value = input.value
    },

    addServices: function () {
        this.servicesPercent = {};
        this.servicesNumber = {};

        otherPer.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherNum.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    getAllServicePrices: function () {
        let sum = 0;
        for (const key in this.servicesPercent) {
            sum += this.servicesPercent[key];
            this.servicePricesPercent = sum;
        }
        let sam = 0;
        for (const key in this.servicesNumber) {
            sam += this.servicesNumber[key];
            this.servicePricesNumber = sam;
        }
        return sum + sam; // Исправлено
    },

    addScreenBlock: function () {
        const cloneScreen = blockScreen[0].cloneNode(true);
        blockScreen[blockScreen.length - 1].after(cloneScreen);
        blockScreen = document.querySelectorAll(".screen"); // Обновляем ссылку
    },

    get screenPrice() {
        return this.screens.reduce((acc, screen) => {
            return acc + screen.price;
        }, 0);
    },

    getFullPrice: function () {
        console.log(this.screenPrice);
        return this.screenPrice + this.getAllServicePrices();
    }
};

appData.init();
