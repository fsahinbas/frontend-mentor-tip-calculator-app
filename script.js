const bill = document.getElementById("bill");
const people = document.getElementById("people");
const custom = document.getElementById("custom");
const tip = document.getElementById("tip");
const total = document.getElementById("total");
const btnPercent = document.querySelector(".inputs");
const customPercent = document.querySelector(".inputs>input");
const btnReset = document.querySelector(".btn-reset");
const error = document.querySelector(".error");

let percent = 5;

const changePercent = (e) => {
  if (e.target.classList.contains("btn-percent")) {
    percent = e.target.value;
  }
  if (e.target.classList.contains("custom-percent")) {
    percent = e.target.value;
  }
};

const getValues = () => {
  return {
    total: bill.value,
    people: people.value,
    percent: percent,
  };
};

const clearActiveStates = () => {
  btnPercent.querySelectorAll(".btn-percent").forEach((btn) => {
    btn.classList.remove("active");
  });
};

const isValidPeople = () => {
  return people.value > 0;
};

const calc = () => {
  toggleError();
  if (isValidPeople()) {
    const values = getValues();
    const tipAmount = (values.total * (values.percent / 100)) / values.people;
    const total = tipAmount * values.people;
    return {
      tip: tipAmount.toFixed(2),
      total: total.toFixed(2),
    };
  }
};

const toggleError = () => {
  if (isValidPeople()) {
    error.classList.remove("error");
  } else {
    error.classList.add("error");
  }
};

const reset = () => {
  bill.value = 0;
  people.value = 0;
  percent = 5;
};

const print = (obj) => {
  if (obj) {
    tip.innerText = `$${obj.tip}`;
    total.innerText = `$${obj.total}`;
  }
};

people.addEventListener("input", () => {
  print(calc());
});

bill.addEventListener("input", () => {
  print(calc());
});

btnPercent.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-percent")) {
    changePercent(e);
    print(calc());
  }
  clearActiveStates();
  e.target.classList.add("active");
});

customPercent.addEventListener("keyup", (e) => {
  changePercent(e);
  print(calc());
});

btnReset.addEventListener("click", () => {
  reset();
  clearActiveStates();
  print(calc());
  btnPercent.querySelector(".btn-percent").classList.add("active");
});
