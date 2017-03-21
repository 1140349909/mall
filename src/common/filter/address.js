// 地址name转换对应vlaue
export function name2value(name, list) {
    let value = null;

    list.map(item => {
        if (name === item.name) {
            value = item.value;
            return false;
        }
    });
    return value;
}

// 地址value转换对应name
export function value2name(value, list) {
    let name;

    list.map(item => {
        if (value === item.value) {
            name = item.name;
            return false;
        }
    });
    return name;
}
