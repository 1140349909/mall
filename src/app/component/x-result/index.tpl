<div class="x-result" :class="'x-result-'+position">
    <div class="x-result-icon">
        <i class="iconfont" :class="icon"></i>
    </div>
    <h6 class="x-result-title" v-if="title">{{title}}</h6>
    <div class="x-result-content">
        <slot></slot>
    </div>
    <div class="x-result-button" v-if="buttonText&&buttonType">
        <x-button :type="buttonType" @click="$emit('on-button-click')">{{buttonText}}</x-button>
    </div>
</div>
