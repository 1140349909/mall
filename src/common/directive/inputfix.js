const doc = document.documentElement;
// 修复input聚焦后,把键盘撑上来的bug
export default {
    bind(){
        this.el.addEventListener('focus', this._onFocus, true);
        this.el.addEventListener('blur', this._onBlur, true);
    },
    unbind(){
        this.el.removeEventListener('focus', this._onFocus, true);
        this.el.removeEventListener('blur', this._onBlur, true);
    },
    _onFocus() {
        doc.className += ' app-input-fix';
    },
    _onBlur(){
        doc.className = doc.className.replace(/app-input-fix/g, '');
    }
};
