import Vue from 'vue';
import store from '../../store';
import {getMemberEmployeeInfoDetail} from  '../../store/employee/action';
import {updateTker}from'../../store/tker/action';
import {TKER_TYPE} from '../../config/constants';
const TKER_TYPE_SITE = TKER_TYPE.SITE;
import {geQrCodeUrl} from '../../util/url';
import VueImg from '../../component/vue-img';
import './index.less';

Vue.filter('qrcodeSrc', function (value) {
    return value !== '' ? geQrCodeUrl(800, 800, value) : '';
});

export default Vue.extend({

    template: __inline('./index.tpl'),

    components: {
        VueImg
    },

    data: function () {
        return {
            user: {
                jobNo: '',
                name: '',
                logo: '',
            },
            qrCode: {
                value: 'www.baidu.com',
                fgColor: '#e84028',
            },
            src: '',
            
        };
    },

    store,

    vuex: {
        getters: {
            users: ({employee}) => employee.users,
            tkerUrl: ({tker}) => {
                const task = tker.tasks[TKER_TYPE_SITE];
                return task ? task.url : '';
            },
            status: ({employee}) => employee.status,
        },

        actions: {
            getMemberEmployeeInfoDetail: getMemberEmployeeInfoDetail,
            updateTker: updateTker,
        }
    },

    methods: {},

    watch: {
        status(val) {
            switch (val) {
                case 'detail':
                    this.user = this.users;
                    break;

                case 'tker':
                    this.src = this.tkerUrl;
                    break;
            }
        },
    },

    created() {
        this.updateTker({
            type: TKER_TYPE_SITE
        });
        this.getMemberEmployeeInfoDetail();
    },
});
