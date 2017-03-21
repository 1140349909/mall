import Vue from 'vue';
import store from '../../store';
import {updateTker, UPDATE_TKER_SUCCESS} from '../../store/tker/action';
import {geQrCodeUrl} from '../../util/url';
import {TKER_TYPE} from '../../config/constants';
import VueImg from '../../component/vue-img';
const TKER_TYPE_TKER = TKER_TYPE.TKER;
import './index.less';

// 我要集客
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        VueImg
    },
    store: store,
    vuex: {
        getters: {
            operation: ({operation}) => operation,
            info: ({member}) => member.info.data,
            qrcode: ({tker}) => geQrCodeUrl(400, 400, tker.tasks[TKER_TYPE_TKER].url),
        },
        actions: {
            updateTker,
        }
    },
    watch: {
        operation: {
            handler: function (action) {
                switch (action.type) {
                    case UPDATE_TKER_SUCCESS:
                        this.$root.hidePageLoading();
                        break;
                }
            },
            deep: true
        },

    },
    created(){
        this.$root.showTopBar({
            backGo: 'tker'
        });

        this.updateTker({
            type: TKER_TYPE_TKER,
            productDesc: {}
        });

        this.$root.showPageLoading();
    }
});
