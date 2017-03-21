<popup :show.sync="isVisible">
    <div class="yyg-purchase">
        <header class="yyg-purchase-header">
            <figure class="yyg-purchase-figure">
                {{{data.coverImgId | media}}}
            </figure>
            <div class="yyg-purchase-info">
                每次投币<span class="text-primary">{{data.bidStep}}</span>
                <br>1币=1元
            </div>
            <span class="vux-close" @click="onClose"></span>
        </header>
        <div class="yyg-purchase-content">
            <x-number title="选择参与次数" :min="step" :max="max" :step="step" :value.sync="amount"
                      :width="100"></x-number>
            <checker v-if="max>=checkerData[0]" :value.sync="amount" type="checkbox" default-item-class="yyg-purchase-checker"
                     selected-item-class="selected" disabled-item-class="disabled" on-change="change">
                <checker-item v-for="i in checkerData" :value="i" :disabled="i>max">{{i}}</checker-item>
            </checker>
        </div>
        <footer class="yyg-purchase-footer">
            <x-button type="primary" @click="onSubmit">马上参与</x-button>
        </footer>
    </div>
</popup>
