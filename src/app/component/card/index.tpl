<div class="card" :style='bg'>
    <div class="card-hd">
    	<div class="card-hdimg">
            {{{info.headImg | media}}}
    	</div>
    	<div class="card-name" :style='fontColor'>
			{{info.name | nickname}}
    	</div>
    </div>
    <div class="card-ft">
    	<div class="card-title" :style='fontColor'>
    		{{data.title}}
    	</div>
    	<div v-if="false" class="card-number" :style='fontColor'>2089 1234 3213</div>
    </div>
</div>
