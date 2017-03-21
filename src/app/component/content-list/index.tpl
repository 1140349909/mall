<div class="content-list" :class="layoutc">
	<div class="content-box">
		<div class="content-item" v-for="item in list" @click="onLink(item)">
			<div class="content-item-img">
				<vue-img width="101" height="101" :enable-auto-size="true" :src="{imgId: item.vsite.imgId, imgUrl: item.vsite.imgUrl}"></vue-img>
			</div>
			<div class="content-item-container">
				<div class="content-item-title">{{item.vsite.title}}</div>
				<div class="content-item-digest">{{item.vsite.desc}}</div>
				<div class="content-item-info">
					<div class="content-item-date">{{item.publishedDate | dateFormat}}</div>
					<div class="content-item-author">{{item.vsite.author}}</div>
					<div class="content-item-traffic">
						<i class="iconfont icon-pv"></i>
						<div class="content-item-pv">{{getPv(item)}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
