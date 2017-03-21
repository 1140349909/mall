import Vue from 'vue';
import { getMediaUrl } from '../../util/url';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {

    },

    props: {
        data: Object,
        info: Object,
    },

    computed: {
        bg() {
            if (this.data.style.bgRadio == 'img') {
                return 'background-image:url(' + getMediaUrl(this.data.style.bgImg) + ')';
            } else {
                return 'background-color:' + this.data.style.bgColor;
            }
        },

        fontColor() {
            return 'color:' + this.data.style.fontColor;
        }
    },
});
