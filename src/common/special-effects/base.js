import './index.less';

// 特效父元素
export function createWrapEle(cla) {
    let className = 'special-effects';
    if (cla) {
        className = className + ' ' + cla;
    }
    let ele = document.createElement('div');
    ele.setAttribute('class', className);
    return ele;
}
