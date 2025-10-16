const title = document.getElementsByTagName("h1")[0];
const buttons = document.querySelector(".handler_btn");
const screen = document.querySelector(".screen-btn");
const otherPer = document.querySelectorAll(".other-items.percent");
const otherNum = document.querySelectorAll(".other-items.number");
const rangeInput = document.querySelector('.rollback input[type="range"]');
const rangeSpan = document.querySelector(".rollback span.range-value");
const totalInput = document.getElementsByClassName("total-input");
const inputText = document.querySelectorAll('input[type=text]');
const selectElement = document.querySelector('select');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
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
    allServicePrices: 0,
    dynamicElements: [],
    init: () => {
        appData.addRollback();
        appData.addTitle();
        rangeInput.addEventListener("input", appData.addRollback.bind(appData));
        buttons.addEventListener("click", appData.start.bind(appData));
        screen.addEventListener("click", appData.addScreenBlock.bind(appData));
        if (resetBtn) {
            resetBtn.addEventListener("click", appData.reset.bind(appData));
        }
    },

    addTitle: () => {
        document.title = title.textContent;
    },

    start: () => {
        appData.addScreens();
        if (appData.screenPrice === 0) {
            alert("Введите значение");
            return;
        }
        appData.addServices();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.addPrice();
        appData.disableInputs();
        appData.changeButtons();
        console.log(appData);
    },

    changeButtons: () => {
        if (startBtn && resetBtn) {
            startBtn.style.display = 'none';
            resetBtn.style.display = 'block';
        }
    },

    returnButtons: () => {
        if (startBtn && resetBtn) {
            startBtn.style.display = 'block';
            resetBtn.style.display = 'none';
        }
    },

    disableInputs: () => {
        for (let i = 0; i < inputText.length; i++) {
            inputText[i].disabled = true;
        }
        for (let i = 0; i < selectElement.length; i++) {
            selectElement[i].disabled = true;
        }
    },

    enableInputs: () => {
        for (let i = 0; i < inputText.length; i++) {
            inputText[i].disabled = false;
        }
        for (let i = 0; i < selectElement.length; i++) {
            selectElement[i].disabled = false;
        }
    },

    addScreens: () => {
        let blockScreen = document.querySelectorAll(".screen");
        appData.screens = []; // Исправлено: было addPrice.screens
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
        appData.rollback = rangeInput.value;
    },

    addPrice: () => {
        const input = document.querySelector("input[type=text]");
        appData.fullPrice = appData.getFullPrice();
        if (totalInput[4]) totalInput[4].value = appData.fullPrice;
        if (totalInput[1] && input) totalInput[1].value = input.value;
    },

    addServices: () => {
        appData.servicesPercent = {};
        appData.servicesNumber = {};

        otherPer.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherNum.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    getAllServicePrices: () => {
        let sum = 0;
        for (const key in appData.servicesPercent) {
            sum += appData.servicesPercent[key];
            appData.servicePricesPercent = sum;
        }
        let sam = 0;
        for (const key in appData.servicesNumber) {
            sam += appData.servicesNumber[key];
            appData.servicePricesNumber = sam;
        }
        return sum + sam;
    },

    reset: () => {
        appData.enableInputs();
        appData.returnButtons();
        for (let i = 0; i < appData.dynamicElements.length; i++) {
            const element = appData.dynamicElements[i];
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
        appData.dynamicElements = [];


        for (let i = 0; i < inputText.length; i++) {
            inputText[i].value = '';
        }

        selectElement.selectedIndex = 0;

        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }

        if (rangeInput) {
            rangeInput.value = 0;
            appData.addRollback();
        }

        for (let i = 0; i < totalInput.length; i++) {
            if (totalInput[i]) {
                totalInput[i].value = '';
            }
        }

        appData.screens = [];
        appData.servicesPercent = {};
        appData.servicesNumber = {};
        appData.fullPrice = 0;
        appData.allServicePrices = 0;

        console.log('Состояние сброшено');
    },

    addScreenBlock: () => {
        const cloneScreen = blockScreen[0].cloneNode(true);
        blockScreen[blockScreen.length - 1].after(cloneScreen);
        blockScreen = document.querySelectorAll(".screen");
        appData.dynamicElements.push(cloneScreen);
    },

    get screenPrice() {
        return this.screens.reduce((acc, screen) => {
            return acc + screen.price;
        }, 0);
    },

    getFullPrice: () => {
        console.log(appData.screenPrice);
        return appData.screenPrice + appData.allServicePrices;
    }
};

appData.init();

