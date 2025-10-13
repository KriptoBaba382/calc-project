const title = document.getElementsByTagName("h1")[0];
const buttons = document.querySelector(".handler_btn"); // Исправлено
const screen = document.querySelector(".screen-btn");
const otherPer = document.querySelectorAll(".other-items.percent");
const otherNum = document.querySelectorAll(".other-items.number");
const rangeInput = document.querySelector('.rollback input[type="range"]');
const rangeSpan = document.querySelector(".rollback span.range-value");
const totalInput = document.getElementsByClassName("total-input");
const inputText = document.querySelectorAll('input[type=text]')
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
    init:() => {
        appData.addRollback();
        appData.addTitle();
        rangeInput.addEventListener("input", appData.addRollback.bind(this));
        buttons.addEventListener("click", appData.start.bind(appData));
        screen.addEventListener("click", appData.addScreenBlock.bind(appData));
    },
    inputDisable: () => {
        for (let i = 0; i<inputText.length; i++ ) {
            console.log(inputText[i])
        }
    },
    addTitle:() => {
        document.title = title.textContent;
    },

    start:() => {
        appData.addScreens();
        if (this.screenPrice === 0) {
            alert("Введите значение");
            return;
        }
        appData.addServices();
       appData.allServicePrices = appData.getAllServicePrices(); // Исправлено
        appData.addPrice();
        console.log(this);
    },

    addScreens: () => {
        let blockScreen = document.querySelectorAll(".screen");
        this.screens = []; // Очищаем перед добавлением
        blockScreen.forEach((screen, index) => {
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

    addRollback: () => {
        rangeSpan.textContent = rangeInput.value + "%";
        this.rollback = rangeInput.value;
    },

    addPrice: () => {
        const input = document.querySelector("input[type=text]");
        appData.fullPrice = appData.getFullPrice();
        totalInput[4].value = appData.fullPrice;
        totalInput[1].value = input.value
    },

    addServices: () => {
        this.servicesPercent = {};
        this.servicesNumber = {};

        otherPer.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherNum.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            console.log(input);

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    getAllServicePrices: () => {
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

    addScreenBlock: () => {
        const cloneScreen = blockScreen[0].cloneNode(true);
        blockScreen[blockScreen.length - 1].after(cloneScreen);
        blockScreen = document.querySelectorAll(".screen"); // Обновляем ссылку
    },

    get screenPrice() {
        return this.screens.reduce((acc, screen) => {
            return acc + screen.price;
        }, 0);
    },

    getFullPrice:() => {
        console.log(appData.screenPrice);
        return appData.screenPrice + appData.getAllServicePrices();
    }
};
appData.init();
appData.inputDisable();
