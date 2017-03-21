/*
 钱超过一定值则转为小数显示
 money: [Number]
 如：
 12000 1.2万
 120000000 1.2亿
 */
export default function (money) {

    if (isNaN(money)) {
        money = 0;
    }

    if (money < 10000) {
        return money;

    } else if (money >= 10000) {
        return money / 10000 + '万';

    } else if (money >= 100000000) {
        return money / 100000000 + '亿';

    }
}
