<div class="page">
    <section class="content">

        <div>
            <top-bar
                cur-text="非微信端顶部栏">
                </top-bar>

            <div style="height:50px"></div>
            <!--<x-result title="验证成功" icon="icon-alipay" center-show="centered"
                      show-btn="true" @on-execute="onExecute"
                      type= '2'>所有已提交内容已经过验证
            </x-result>-->
            <divider>共用操作</divider>
            <x-result title= "支付成功"   icon="icon-alipay"
                      button-type = "primary"
                      button-text = "重新加载"
                      @on-button-click="testResult"
                      >您支付了$23.00
            </x-result>

            <box gap="10px 10px">
                <x-button mini plain @click="alertTest">alert</x-button>
                <x-button mini plain @click="confirmTest">confirm</x-button>
                <x-button mini plain @click="toastTest('text')">text</x-button>
                <x-button mini plain @click="toastTest('success')">success</x-button>
                <x-button mini plain @click="toastTest('cancel')">cancel</x-button>
                <x-button mini plain @click="toastTest('warn')">warn</x-button>
                <x-button mini plain @click="loadingTest">loadingTest</x-button>
            </box>

            <divider>default</divider>
            <box gap="10px 10px">
                <x-button>submit</x-button>
                <x-button type="primary">primary</x-button>
                <x-button type="warn">Delete</x-button>

                <divider>mini</divider>
                <x-button mini>submit</x-button>
                <x-button mini type="primary">primary</x-button>
                <x-button mini type="warn">Delete</x-button>
                <x-button mini disabled type="warn">Delete</x-button>
                <br>
                <x-button mini plain>submit</x-button>
                <x-button mini plain disabled>submit</x-button>
                <x-button mini plain type="primary">primary</x-button>
                <x-button mini plain disabled type="primary">primary</x-button>

                <divider>plain</divider>
                <x-button plain disabled>submit</x-button>
                <x-button plain type="primary">primary</x-button>

                <divider>disabled</divider>
                <x-button disabled>disable submit</x-button>
                <x-button type="primary" disabled>disable primary</x-button>
                <x-button type="warn" disabled>disable Delete</x-button>

                <divider>use :text and :disabled</divider>
                <x-button :text="submit001" :disabled="disable001" type="primary"></x-button>

                <divider>combined with flexbox</divider>
                <flexbox>
                    <flexbox-item>
                        <x-button type="primary">primary</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button type="warn">Delete</x-button>
                    </flexbox-item>
                </flexbox>
                <divider>combined with flexbox</divider>
                <flexbox>
                    <flexbox-item>
                        <x-button type="default">default</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button type="primary">primary</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button type="warn">Delete</x-button>
                    </flexbox-item>
                </flexbox>

            </box>

        </div>


        <div class="issue">
            <div class="issue-content">
                <figure class="issue-figure">
                    <img src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/5754e5280f93d514c9fb4dc8"/>
                </figure>
                <div class="issue-aside">
                    <h6 class="issue-name"><span class="label label-primary">第100期</span> 美的电冰箱</h6>
                    <div class="issue-detail">
                        <p>中奖编号:0019283</p>
                        <p>参与次数:0019283</p>
                        <!--<p>揭晓时间:2016-07-01 10:00</p>-->
                    </div>
                    <div class="issue-fixed">参与次数:<span class="text-primary">100</span></div>
                </div>
                <div class="issue-extra"></div>
            </div>
            <div class="issue-footer">
                <div class="issue-ticket">
                    <h6>游戏编码</h6>
                    <ul>
                        <li>32042304</li>
                        <li>32042304</li>
                        <li>32042304</li>
                        <li>32042304</li>
                        <li>32042304</li>
                        <li>32042304</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="product-wrap">
            <ul class="product-list">
                <!--v-for-start-->
                <!--
               图片
               标题
               标签 + 售价

               价格 | 佣金
               已售 | 已售+分享 | 售价+已售
               按钮
               状态
               -->
                <li class="product-item" data-id="57ad9ef00f93d52cfb069aee" style="height: 300px;">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ad9bfd0f93d52cfb069999">
                        </figure>
                        <h6 class="product-item-name">万事达哈哈哈</h6>


                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="labels labels-integralCash labels-normal">
                                    积分优惠
                                </div>
                            </div>
                            <div class="product-item-money">
                                <span>￥1.00</span>
                                +
                                <i class="iconfont icon-coins"></i><span>10000</span>
                            </div>
                        </div>


                        <!--已售-->
                        <div class="product-item-filed">
                            <span class="product-item-default">已售50</span>
                        </div>

                        <!--价格-->
                        <div class="product-item-filed">
                            <span class="product-item-primary">￥20.00</span>
                        </div>
                        <!--佣金-->
                        <div class="product-item-filed">
                            <span class="product-item-primary">佣金￥3.50</span>
                        </div>

                        <!--售价+已售-->
                        <div class="product-item-filed">
                            <div class="product-item-filed-l">
                                <span class="product-item-default">售价￥20.00</span>
                            </div>
                            <div class="product-item-filed-r">
                                <span class="product-item-default">已售50</span>
                            </div>
                        </div>

                        <!--已售+分享-->
                        <div class="product-item-filed">
                            <div class="product-item-filed-l">
                                <span class="product-item-default">已售50</span>
                            </div>
                            <div class="product-item-filed-r">
                                <i class="product-item-share iconfont icon-share"></i>
                            </div>
                        </div>

                        <div class="product-item-actions">
                            <x-button type="primary" plain>我要分销</x-button>
                        </div>
                        <div class="product-status product-status-soldout"></div>
                        <div class="product-status product-status-selling"></div>
                        <div class="product-status product-status-finished"></div>
                    </div>
                </li>
                <li class="product-item" data-id="57ad9e820f93d52cfb069abb" style="height: 300px;">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ad9b900f93d52cfb06997c"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">动车</h6>

                        <!-- 显示现金 -->
                        <!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-coupon product-label-normal">
                                    优惠券
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span class="product-item-primary">￥10000.00</span>
                            </div>
                        </div><!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售2</span>
                        </div>
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ad9ce20f93d52cfb0699e2">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ad9c790f93d52cfb0699c3"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">变脸</h6>

                        <!-- 显示现金 -->
                        <!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-coupon product-label-normal">
                                    优惠券
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span class="product-item-primary">￥2000.00</span>
                            </div>
                        </div><!--v-if-->

                        <!--已售+分享-->
                        <div class="product-item-filed">
                            <div class="product-item-filed-l">
                                <span class="product-item-default">已售50</span>
                            </div>
                            <div class="product-item-filed-r">
                                <i class="product-item-share iconfont icon-share"></i>
                            </div>
                        </div>
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ad9bb00f93d52cfb06998a">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ad9b620f93d52cfb06996e"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">动起来！！！</h6>

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->
                        <div class="product-item-sp"></div>
                        <!--佣金-->
                        <div class="product-item-filed">
                            <span class="product-item-primary">佣金￥3.50</span>
                        </div>

                        <!--售价+已售-->
                        <div class="product-item-filed">
                            <div class="product-item-filed-l">
                                <span class="product-item-default">售价￥20.00</span>
                            </div>
                            <div class="product-item-filed-r">
                                <span class="product-item-default">已售50</span>
                            </div>
                        </div>

                        <div class="product-item-actions">
                            <x-button type="primary" plain>我要分销</x-button>
                        </div>
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ad9b290f93d52cfb06993f">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ad9adb0f93d52cfb069929"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">葛优躺</h6>

                        <!-- 显示现金 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-case product-label-normal">
                                    爆款
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span>￥500.00</span>
                            </div>
                        </div><!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售0</span>
                        </div>
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ad81510f93d52cfb069402">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ad329e0f93d52cfb082773"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">佳能 EOS 7DMarkII</h6>

                        <!-- 显示现金 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-case product-label-normal">
                                    爆款
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span>￥10000.00</span>
                            </div>
                        </div><!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售0</span>
                        </div>
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ad615b0f93d52cfbaf6afa">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ac75710f93d502b870dfc4"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">simon</h6>

                        <!-- 显示现金 -->
                        <!--v-if-->

                        <!-- 显示积分 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-integral product-label-normal">
                                    积分兑换
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <i class="iconfont icon-coins"></i><span>10000</span>
                            </div>
                        </div><!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售4</span>
                        </div>
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ac7f550f93d502b8694aca">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ac7ef80f93d502b8694a88"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">iphone10</h6>

                        <!-- 显示现金 -->
                        <!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-offset product-label-normal">
                                    积分抵现
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span class="product-item-primary">￥8.00</span>
                            </div>
                        </div><!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售10</span>
                        </div>
                        <!--v-start-->
                        <div class="product-status product-status-selling"></div><!--v-if--><!--v-end-->
                        <!--v-component-->
                        <!--v-start-->
                        <div class="product-status product-status-soldout"></div><!--v-if--><!--v-end-->
                        <!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ac7de30f93d502b86949b4">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ac7d500f93d502b8694980"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">iphone7</h6>

                        <!-- 显示现金 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-case product-label-normal">
                                    爆款
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span>￥10.00</span>
                            </div>
                        </div><!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售10</span>
                        </div>
                        <!--v-start-->
                        <div class="product-status product-status-selling"></div><!--v-if--><!--v-end-->
                        <!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ac7c220f93d502b8694916">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ac7b7c0f93d502b8694894"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">iphone8</h6>

                        <!-- 显示现金 -->
                        <!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-offset product-label-normal">
                                    积分抵现
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span class="product-item-primary">￥20.00</span>
                            </div>
                        </div><!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售10</span>
                        </div>
                        <!--v-start-->
                        <div class="product-status product-status-selling"></div><!--v-if--><!--v-end-->
                        <!--v-component-->
                        <!--v-start-->
                        <div class="product-status product-status-soldout"></div><!--v-if--><!--v-end-->
                        <!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ac72560f93d56c4ae831b0">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ac6a290f93d56c4ae82571"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">三星note7</h6>

                        <!-- 显示现金 -->
                        <!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-offset product-label-normal">
                                    积分抵现
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span class="product-item-primary">￥9.90</span>
                            </div>
                        </div><!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售2</span>
                        </div>
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ac66080f93d56c4ae8195d">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/575287980f93d51d0f8e6be6"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">现金测试</h6>

                        <!-- 显示现金 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-case product-label-normal">
                                    爆款
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span>￥2.00</span>
                            </div>
                        </div><!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售1</span>
                        </div>
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                        <!--v-start-->
                        <div class="product-status product-status-soldout"></div><!--v-if--><!--v-end-->
                        <!--v-component-->
                    </div>
                </li>
                <li class="product-item" data-id="57ac65b90f93d56c4ae818f3">
                    <div class="product-item-i">
                        <figure class="product-item-figure">
                            <img
                                    src="http://api.sit.vveshow.com/buy/api/v1/w1/linkin/media/image/57ac51b70f93d56c4a7e7e72"
                                    class="/"><!--v-html-->
                        </figure>
                        <h6 class="product-item-name">Canon/佳能 EOS M3微单反</h6>

                        <!-- 显示现金 -->
                        <!--v-if-->

                        <!-- 显示积分 -->
                        <!--v-if-->

                        <!-- 显示组合 -->
                        <div class="product-item-integral">
                            <div class="product-item-labels">
                                <div class="product-label product-label-integralCash product-label-normal">
                                    积分优惠
                                </div><!--v-component-->
                            </div>
                            <div class="product-item-money">
                                <span>￥1000.00</span>
                                +
                                <i class="iconfont icon-coins"></i><span>50</span>
                            </div>
                        </div><!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <!-- 显示现金抵积分 -->
                        <!--v-if-->

                        <div class="product-item-filed">
                            <span class="product-item-default">已售2</span>
                        </div>
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                        <!--v-start--><!--v-if--><!--v-end--><!--v-component-->
                    </div>
                </li><!--v-for-end-->
            </ul>
        </div>
    </section>
</div>
