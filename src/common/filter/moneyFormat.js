/*
 format:￥
 digit: 位数 -1为自动位数,默认为2
 */
export default function (money, format, digit) {
    if (isNaN(money)) {
        money = 0;
    }

    if (isNaN(digit)) {
        digit = 2;
    }

    money = new Number(money / 100).toFixed(3);

    let moneyText;

    if (digit > 0) {
        moneyText = money.substring(0, money.lastIndexOf('.') + (digit + 1));
    } else if (digit == 0) {
        moneyText = money.substring(0, money.lastIndexOf('.'));
    } else {
        moneyText = money - 0;
    }

    if (format == '￥') {
        return '￥' + moneyText;
    } else {
        return '' + moneyText;
    }

}

