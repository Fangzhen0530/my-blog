import Mock from 'mockjs'

// mock是用来拦截请求的，再浏览器端。第一个参数是拦截的规则
// Mock.mock("/api/banner","get",{
//     "code" : 0,
//     "msg" : "出错了",
//     "data" : [
//         {
//           id: "1",
//           midImg: "http://mdrs.yuanjin.tech/img/20201031141507.jpg",
//           bigImg: "http://mdrs.yuanjin.tech/img/20201031141350.jpg",
//           title: "东风快递，使命必达",
//           description: `东风-21弹道导弹(代号:DF-21),是中国人民解放军火箭军装备的一型陆基机动式中程弹道导弹,是中国第二代中程地对地战略导弹,也是中国第一代固体燃料弹道导弹。`,
//         },
//         {
//           id: "2",
//           midImg: "http://mdrs.yuanjin.tech/img/20201031205550.jpg",
//           bigImg: "http://mdrs.yuanjin.tech/img/20201031205551.jpg",
//           title: "大威天龙",
//           description: "歼-20（英文：Chengdu J-20，代号：威龙 [21]  ）是中航工业成都飞机设计研究所研制的一款具备高隐身性、高态势感知、高机动性等能力的隐形第五代制空战斗机，解放军研制的最新一代（欧美旧标准为第四代，俄罗斯新标准为第五代）双发重型隐形战斗机，用于接替歼10、歼11等第三代空中优势/多用途歼击机的未来重型歼击机型号，该机将担负中国空军未来对空、对海的主权维护任务。",
//         },
//         {
//           id: "3",
//           midImg: "http://mdrs.yuanjin.tech/img/20201031204401.jpg",
//           bigImg: "http://mdrs.yuanjin.tech/img/20201031204403.jpg",
//           title: "福建舰",
//           description: "中国人民解放军海军福建舰（舷号：18，简称福建舰），是中国完全自主设计建造的首艘弹射型航空母舰，采用平直通长飞行甲板，配置电磁弹射和阻拦装置，满载排水量8万余吨。",
//         },
//       ]
// })