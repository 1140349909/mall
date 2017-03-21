<div class="opinion-item">
    {{{ item.headImg | media 'opinion-item-headimg' 'avatar3'}}}
    <div class="opinion-item-box">
        <div class="opinion-item-title">{{item.name}}</div>
        <div class="opinion-item-text">{{item.content}}</div>
        <div class="opinion-item-date">{{item.createdDate | dateFormat}}</div>
    </div>
</div>