<div class="coupon-item" :class="typeClass">
	<div>

	</div>
	<div v-if="type == 'selected'" class="coupon-item-radio">
		<icon :type="radioType"></icon>
	</div>
	<div class="coupon-item-l">

		<div v-if="item.faceValue" class="coupon-item-face">
			<span class="coupon-item-money">￥</span>
			<span class="coupon-item-facevalue">{{item.actValue | moneyFormat '' -1}}</span>
		</div>

		<div v-if="!item.faceValue" class="coupon-item-face">
			<span class="coupon-item-facevalue coupon-item-facediscount">{{item.discount}}</span>
			<span class="coupon-item-discount">折</span>
		</div>

		<div class="coupon-item-tip">
			<template v-if="!item.faceValue">
				折扣券
			</template>
			<template v-else>
				现金抵用券
			</template>
		</div>
	</div>
	<div class="coupon-item-r">
		<div class="coupon-item-info">
			<p class="coupon-item-p" :class="{'coupon-item-px': !item.rule.give.charge.enable}">平台通用</p>
			<p v-if="item.rule.give.charge.enable" class="coupon-item-p">满￥{{item.rule.give.charge.min/100}}元可用</p>
		</div>
		<div class="coupon-item-border"></div>
		<div class="coupon-item-date">
			<p v-if="item.give.period.dynamic.enable" class="coupon-item-p">

			</p>
			<p v-else="item.give.period.dynamic.enable" class="coupon-item-p">
				{{item.startDate | dateFormat}}&nbsp;至&nbsp;{{item.endDate | dateFormat}}
			</p>
		</div>
	</div>
	<div class="coupon-item-icon"></div>
</div>
