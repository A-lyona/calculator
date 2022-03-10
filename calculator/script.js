var numbersBtnArray = document.querySelectorAll('.number');
var operationsBtnArray = document.querySelectorAll('.operator');
var decimalBtn = document.getElementById('decimal');
var sqrtBtn = document.getElementById('sqrt');
var negativeBtn = document.getElementById('negative');
var ceBtn = document.getElementById('ce');
var cBtn = document.getElementById('c');
var display = document.getElementById('display');
var numberInMemoryNow = 0;
var isItNewNumber = false;
var operationCache = '';
var memoryCache = '';

for (var i=0; i < numbersBtnArray.length; i++) {
    var currentNumber = numbersBtnArray[i];
    currentNumber.addEventListener('click', function (event) {
        pressNumber(event.target.textContent);
    });
}

for (var i=0; i < operationsBtnArray.length; i++) {
    var currentOperation = operationsBtnArray[i];
    currentOperation.addEventListener('click', function (event) {
        pressOperation(event.target.textContent);
    });
}

decimalBtn.addEventListener('click', pressDecimal);

sqrtBtn.addEventListener('click', pressSqrt);

negativeBtn.addEventListener('click', pressNegative);

ceBtn.addEventListener('click', pressCeBtn);

cBtn.addEventListener('click', pressCBtn);

function pressNumber (number) {
    if (isItNewNumber) {
        display.value = number;
        isItNewNumber = false;
    }
    else {
        if (display.value === '0') {
            display.value = number;
        }
        else {
            display.value += number;
        }
    }   
};

function StrToNum(a) {
    return (a - 0);
    }
    
function pressOperation (operation) {
    memoryCache = display.value;
    
    if (isItNewNumber && operationCache !== '=' && operationCache !== 'sqrt') {
    display.value = numberInMemoryNow;
    }
    else {
    isItNewNumber = true;
    if (operationCache === '+') {
    numberInMemoryNow = ((StrToNum(numberInMemoryNow) * 10000) + (StrToNum(memoryCache) * 10000)) / 10000;
    }
    else if (operationCache === '-') {
    numberInMemoryNow = ((StrToNum(numberInMemoryNow) * 10000) - (StrToNum(memoryCache) * 10000)) / 10000;
    }
    else if (operationCache === '*') {
    numberInMemoryNow = ((StrToNum(numberInMemoryNow) * 1000) * (StrToNum(memoryCache) * 1000)) / 1000000;
    }
    else if (operationCache === '/') {
        if (memoryCache !== '0') {
        numberInMemoryNow = ((StrToNum(numberInMemoryNow) * 1000) / (StrToNum(memoryCache) * 1000));
        }
        else {
        pressCBtn (c);
        alert ('Ошибка! Делить на ноль нельзя.');
        }
        }

    else if (operationCache === 'xn' || operationCache === 'n' || operationCache === 'x') {
    numberInMemoryNow = (StrToNum(numberInMemoryNow)) ** (StrToNum(memoryCache));
    }
    else {
    numberInMemoryNow = +memoryCache;
    }
    display.value = numberInMemoryNow;
    operationCache = operation;
    }
    };

function pressDecimal (decimal) {
    if (isItNewNumber) {
        display.value = '0.';
        isItNewNumber = false;
    }
    else {
        if (display.value.indexOf('.') === -1) {
        display.value += '.';
        };
    };
};

function pressSqrt (sqrt) {
    isItNewNumber = false;
    if (display.value >= 0) {
    display.value = Math.sqrt(display.value);
    pressOperation ('=');
    }
    else {
    pressCBtn (c);
    alert ('Ошибка! Извлечение квадратного корня из отрицательного числа невозможно.');
    }
};

function pressNegative (negative) {
    if (display.value.indexOf('-') === -1) {
        display.value = '-' + display.value;
    }
    else {
        display.value = display.value.slice(1, display.value.length);
    }
};

function pressCeBtn (ce) {
    display.value = '0';
    isItNewNumber = true;
};

function pressCBtn (c) {
    display.value = '0';
    isItNewNumber = true;
    numberInMemoryNow = 0;
    operationCache = '';
};
