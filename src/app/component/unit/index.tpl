<strong v-if="type=='money'" class="unit unit-money"><span v-if="unit" class="unit-prefix" v-text="unit"></span>{{text.content}}<span class="unit-suffix">{{text.suffix}}</span></strong>
<strong v-else class="unit unit-common">{{text.content}}<span v-if="unit" class="unit-suffix" v-text="unit"></span></strong>
