<div class="address-item">
    <div class="address-item-wrap">
        <div class="address-item-title" @click="onLink">
            {{item.name}}
            <span class="address-item-mobile">
                {{item.mobile}}
            </span>
        </div>
        <div class="address-item-detail">
            {{item.prov}}{{item.city}}{{item.region}}{{item.street}}
        </div>

        <div class="address-item-control">
            <div class="address-item-radio"
                :class="{'address-item-radio-checked': checked == true}"
                @click='onSetAddress'>
                <span class="address-item-radio-icon">
                    <i class="iconfont"></i>
                </span>
                <span class="address-item-radio-text">
                    默认地址
                </span>
            </div>
            <div class="address-item-btns">
                <div class="address-item-btn" @click="onEdit"><i class="iconfont icon-edit"></i>编辑</div>
                <div class="address-item-btn" @click="onDelete"><i class="iconfont icon-delete"></i>删除</div>
            </div>
        </div>
    </div>
</div>
