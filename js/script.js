const title = document.getElementsByTagName("h1")[0];
const buttons = document.getElementsByClassName("handler_btn")[0];
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
  init: function () {
    this.addRollback();
    appData.addTitle();
    rangeInput.addEventListener("input", this.addRollback);
    buttons.addEventListener("click", appData.start);
    screen.addEventListener("click", appData.addScreenBlock);
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

    console.log(appData.screens);
    appData.addServices();
    this.allServicePrices = appData.getAllServicePrices();
    // this.fullPrice = this.getFullPrice();
    // this.logger();
    console.log(appData);
  },
  asking: function () {},
  addScreens: function () {
    let blockScreen = document.querySelectorAll(".screen");
    blockScreen.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
  },
  addRollback: function () {
    rangeSpan.textContent = rangeInput.value + "%";
    this.rollback = rangeInput.value;
  },

  addServices: function () {
    otherPer.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    console.log(appData);
    otherNum.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  getAllServicePrices() {
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
    return sum;
  },
  addScreenBlock: function () {
    const cloneScreen = blockScreen[0].cloneNode(true);

    blockScreen[blockScreen.length - 1].after(cloneScreen);
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

  getRollbackMessage: function () {
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
