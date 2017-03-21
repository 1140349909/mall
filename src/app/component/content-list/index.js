import Vue from 'vue';
import './index.less';
import VueImg from '../vue-img';
import {getIlokaContentUrl} from '../../util/url';
import _ from 'lodash';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        VueImg
    },

    props: {
        list: Array,
        type: {
            type: String,
            default: 'listCoverLeft',
        },
        uin: String,
    },

    methods: {
        onLink(item){

            const param = {
                openChannel: 'vsite',
                channelUin: 'linkin',
                resType: item.resType,
                pubId: item.pubId || '',
                id: item.resId,
                uin: this.uin,
            };

            if (item.resType == 'h5') {
                location.href = getIlokaContentUrl(param);
            } else {
                this.$router.go({
                    name: 'content-show',
                    params: {
                        id: item.id,
                    },
                    query: param,
                });
            }
        },

        getPv(item){
            return _.has(item, 'opdata.pv') ? item.opdata.pv : 0;
        }
    },

    computed: {
        layoutc: function () {

            let layoutc = '';

            switch (this.type) {

                // 图左列表式
                case 'listCoverLeft':
                    layoutc = 'content-list-coverleft';
                    break;

                // 图右列表式
                case 'listCoverRight':
                    layoutc = 'content-list-coverright';
                    break;

                // 卡片式
                case 'cardCoverCenter':
                    layoutc = 'content-list-cardcover';
                    break;
            }

            return layoutc;
        },
    }
});
