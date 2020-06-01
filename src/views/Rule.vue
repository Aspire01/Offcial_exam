<!--
 * @Date         : 2020-05-13 14:25:09
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-13 14:29:18
 * @FilePath     : \kaoshi\src\views\Rule.vue
 * @Description  : 奖励细则
 -->
 <style lang="scss" scoped>
           main{
          margin: .25rem;
          background-color: #fff;
          border-radius: .3rem;
          padding: .25rem;
        }
        .head{
          font-size: .36rem;
          text-align: center;
          margin: 0 auto;
        }
        .content{
          font-size: .3rem;
        }
        footer{
          height: 1.8rem;
          margin: 0 auto;
          width: calc( 100% - .5rem );
          background: url('../assets/img/text.png') no-repeat;
          background-size: 100% 100%;
          /* background-size: cover; */
          border-radius: .2rem;
        }
        .title1{
          font-size: .3rem;
          margin: .35rem 0 .2rem 0;
        }
        .p1, .p2{
          font-size: .25rem;
          line-height: .43rem;
          color: #666;
          margin-top: .15rem;
        }
        .p2{
          color:red;
          margin-bottom: .5rem;
        }
 </style>
 <template>
  <div>
    <BackBar>奖励细则</BackBar>
    <main>
      <div class="head">护考三级奖励统计说明</div>
      <div class="content">
        <div class="title1">一 推荐添加奖励星星</div>
        <div class="p1">1.推荐好友添加关注后，每添加一人奖励一颗星星（一个人关注只奖励一次，防止关注后取消再给推荐，再关注）</div>
        <div
          class="p1"
        >2.奖励统计到三级总人数，例如A直接推荐并添加了50人为一级记为B1-B50，而B1-B50每个人各推荐并添加了50人，这2500人为二级记为B1C1-50---B50C1-50，这2500人又各自推荐添加了50人，那这125000人D1B1C1-C50----D50B50C50就是三级…以此类推，E是B的第三级，F是C的第三级也以此类推…</div>
        <div class="p1">3.星星可以兑换考试答题次数，每10个星星答题一次，设定为个人确定兑换申请后，系统自动兑换</div>
        <div
          class="p2"
        >示例：假如你推荐了50A,这五十个A又每人推荐了50个B，每个B都推荐了50个C，那么你的奖励是A50+b50*50+C2500*50=50+2500+125000=127550 所以，你推荐的A不是最重要，你看不见的B和C才是你看不见的惊喜！！！！</div>
        <div class="title1">二 推荐添加并会员缴费后奖励钻石</div>
        <div
          class="p1"
        >1.推荐好友添加关注并缴费注册会员后（包括高级和普通），每缴费注册一人奖励一颗钻石（可能存在一个人接收到几个人发来的推荐码的情况，按当事者使用的推荐码为准）</div>
        <div
          class="p1"
        >2.奖励统计到三级总人数，例如A直接推荐并添加了50人为一级记为B1-B50，而B1-B50每个人各推荐并添加了50人，这2500人为二级记为B1C1-50---B50C1-50，这2500人又各自推荐添加了50人，那这125000人D1B1C1-C50----D50B50C50就是三级…以此类推，E是B的第三级，F是C的第三级也以此类推…</div>
        <div class="p1">3.钻石可以兑换考试答题次数，每1个钻石可换答题一次，设定为个人确定兑换申请后，系统自动兑换；</div>
        <div
          class="p1"
        >4.钻石也可以申请兑换现金，每个钻石可兑换5元人民币，但需要本人选择申请兑换，并发送兑换申请，由人工在后台人工进行支付兑换，（后台人员兑换过程中要查看此人钻石的奖励列表，可以单独实力一个兑换管理者账号，并给预留退换的腾讯余额）</div>
        <div
          class="p2"
        >示例：假如你推荐了50A,这五十个A又每人推荐了50个B，每个B都推荐了50个C，那么你的奖励是A50+b50*50+C2500*50=50+2500+125000=127550个宝石*5元=637750人民币！！ 所以，你推荐的A不是最重要，你看不见的B和C才是你看不见的惊喜！！！！</div>
      </div>
    </main>
    <footer></footer>
  </div>
</template>
