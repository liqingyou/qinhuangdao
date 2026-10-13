// 景点注册表：真实经纬度、等级、图鉴介绍、建模函数
// 秦皇岛景点
import { buildShanhaiguan, buildFirstPass, buildLaolongtou, shanhaiguanLOD, laolongtouLOD } from './shanhaiguan.js'
import { buildBeidaiheBeach, buildGeziwo, buildLianfengshan, buildNandaihe, beidaiheLOD } from './beidaihe.js'
import { buildQinhuangdaoPort, buildOlympicPark, buildWildZoo, buildLedaoOceanPark } from './haigang.js'
import { buildZushan, buildJieshi, zushanLOD } from './outer.js'
import { C, railing, lamp } from './common.js'

function buildBeidaihePier(b, ctx) {
  // 北戴河码头
  b.box(-10, 0, -6, 10, 5, 0, 0xe0e4e8, 'window')
  b.box(-11, 5, -7, 11, 5.6, 1, 0xf0f0f0)
  b.sign('北戴河码头', 0, 4, 0.05, 0.9, 0, { bg: '#0a2a4a', fg: '#7ad0ff', glow: true })
  ctx.landOverride(-3, 0, 3, 26)
  ctx.landOverride(-9, 22, 9, 28)
  b.box(-3, 0.1, 0, 3, 0.4, 22, 0x8a7a6a, { mat: 'wood', solid: false })
  railing(b, -3, 0, -3, 22, 0.4, 1, 0x666666, 2)
  railing(b, 3, 0, 3, 22, 0.4, 1, 0x666666, 2)
  b.box(-9, -0.6, 22, 9, 0.4, 28, 0x5a5a5a, { solid: false })
  for (let x = -8; x <= 8; x += 8) lamp(b, x, 0.4, 27, 3.5)
  ctx.interact({ x: 0, z: 24, r: 5, label: '登船：渤海游船', type: 'cruise', pier: 'beidaihe' })
}

// grade: S 高度还原 / A 主要建筑 / B 区域氛围
// excl: 城市程序化建筑避让半径；rect: [半宽, 半深]
export const LANDMARKS = [
  // ---------- 山海关区 ----------
  { id: 'shanhaiguan', name: '山海关', alias: '天下第一关', district: 'shanhaiguan', grade: 'S', lat: 40.00, lon: 119.77, rect: [60, 50], focusY: 20, photoR: 1600, lod: shanhaiguanLOD, lodAlways: true, loadR: 900, build: buildShanhaiguan,
    desc: '山海关始建于明洪武十四年（1381年），是明长城东端起点，因依山傍海而得名。城楼上悬挂"天下第一关"匾额，为明代书法家萧显所书。', tip: '登上城楼远眺渤海与燕山，感受"两京锁钥无双地，万里长城第一关"的雄伟气势。' },
  { id: 'firstpass', name: '天下第一关城楼', district: 'shanhaiguan', grade: 'S', lat: 40.00, lon: 119.765, rect: [35, 35], focusY: 18, build: buildFirstPass,
    desc: '天下第一关城楼高13.7米，上悬"天下第一关"匾额，每字高1.6米，笔力雄浑。城楼为砖木结构，三层歇山顶，是明代长城沿线保存最完整的城楼之一。' },
  { id: 'laolongtou', name: '老龙头', district: 'shanhaiguan', grade: 'S', lat: 39.99, lon: 119.83, rect: [80, 60], focusY: 12, photoR: 1200, lod: laolongtouLOD, lodAlways: true, build: buildLaolongtou,
    desc: '老龙头是万里长城唯一入海处，长城从这里蜿蜒入海，宛如巨龙饮水。澄海楼矗立海边，是观赏日出和海上长城的绝佳地点。', tip: '清晨来此观看海上日出，感受"长城入海"的壮观景象。' },
  
  // ---------- 北戴河区 ----------
  { id: 'beidaihe', name: '北戴河海滨', alias: '避暑胜地', district: 'beidaihe', grade: 'S', lat: 39.83, lon: 119.49, rect: [100, 80], focusY: 4, photoR: 1000, lod: beidaiheLOD, lodAlways: true, build: buildBeidaiheBeach,
    desc: '北戴河是中国著名的海滨度假胜地，自1893年清朝开辟为"各国人士避暑地"以来，以清凉宜人的气候和优美的海滨风光闻名。金色沙滩绵延数公里，海水清澈湛蓝。', tip: '漫步海滨浴场，体验阳光沙滩与海浪。' },
  { id: 'geziwo', name: '鸽子窝公园', district: 'beidaihe', grade: 'A', lat: 39.85, lon: 119.53, rect: [50, 45], focusY: 15, build: buildGeziwo,
    desc: '鸽子窝公园因礁石似鸽子形状得名，是观赏北戴河日出的最佳地点。毛泽东曾在此写下著名诗篇《浪淘沙·北戴河》。鹰角亭伫立礁石之上，可远眺渤海。' },
  { id: 'lianfengshan', name: '联峰山公园', district: 'beidaihe', grade: 'A', lat: 39.82, lon: 119.48, rect: [70, 60], focusY: 45, build: buildLianfengshan, foundation: true,
    desc: '联峰山是北戴河最高峰，海拔153米，山上松柏苍翠，百鸟争鸣。山顶望海亭可俯瞰整个北戴河海滨和渤海湾，是登高望远的好去处。' },
  { id: 'nandaihe', name: '南戴河', alias: '黄金海岸', district: 'beidaihe', grade: 'A', lat: 39.81, lon: 119.42, rect: [90, 70], focusY: 4, build: buildNandaihe,
    desc: '南戴河拥有国际滑沙中心和黄金海岸，沙质细腻金黄，海水洁净。滑沙项目从60米高的沙丘滑下直入海中，惊险刺激。' },
  { id: 'beidaihepier', name: '北戴河码头', hidden: true, district: 'beidaihe', grade: 'B', lat: 39.84, lon: 119.51, snap: 'north', snapOff: 0, rot: Math.PI, rect: [12, 10], focusY: 4, build: buildBeidaihePier },
  
  // ---------- 海港区 ----------
  { id: 'qinhuangdaoport', name: '秦皇岛港', district: 'haigang', grade: 'A', lat: 39.93, lon: 119.62, rect: [80, 60], focusY: 20, build: buildQinhuangdaoPort,
    desc: '秦皇岛港是中国北方著名的不冻良港，以煤炭运输闻名世界。港区码头壮观，巨型装船机和传送带构成独特的工业景观。' },
  { id: 'olympicpark', name: '奥林匹克公园', district: 'haigang', grade: 'B', lat: 39.92, lon: 119.58, rect: [55, 50], focusY: 10, build: buildOlympicPark,
    desc: '秦皇岛奥林匹克公园是2008年北京奥运会足球分赛场所在地，现已成为市民休闲运动的综合公园，公园绿树成荫，设施齐全。' },
  { id: 'wildzoo', name: '秦皇岛野生动物园', district: 'haigang', grade: 'A', lat: 39.90, lon: 119.56, rect: [100, 80], focusY: 6, build: buildWildZoo,
    desc: '秦皇岛野生动物园是中国城市中规划面积最大的野生动物园，采用大规模野生放养方式，可以近距离观赏东北虎、非洲狮、长颈鹿等动物。' },
  { id: 'ledao', name: '乐岛海洋公园', district: 'haigang', grade: 'A', lat: 39.95, lon: 119.68, rect: [85, 65], focusY: 8, build: buildLedaoOceanPark,
    desc: '乐岛海洋公园是以海洋为主题的综合性娱乐公园，有海豚表演、海洋动物展示、水上乐园等项目，是亲子游玩的好去处。' },
  
  // ---------- 外围景区 ----------
  { id: 'zushan', name: '祖山', alias: '塞北黄山', district: 'qinglong', grade: 'A', lat: 40.10, lon: 119.50, rect: [120, 100], focusY: 80, photoR: 1500, lod: zushanLOD, build: buildZushan, foundation: true,
    desc: '祖山位于青龙满族自治县境内，主峰天女峰海拔1424米，有"塞北黄山"之誉。山上奇峰怪石、飞瀑流泉，秋季红叶遍山，美不胜收。' },
  { id: 'jieshi', name: '碣石山', alias: '曹操观海处', district: 'changli', grade: 'A', lat: 39.75, lon: 119.22, rect: [90, 80], focusY: 60, build: buildJieshi, foundation: true,
    desc: '碣石山因曹操《观沧海》"东临碣石，以观沧海"而闻名。山上有仙台顶、水岩寺等景点，是中国最早有文字记载的名山之一。' }
]

export const GRADE_INFO = { S: '高度还原建筑', A: '主要建筑', B: '区域氛围' }
