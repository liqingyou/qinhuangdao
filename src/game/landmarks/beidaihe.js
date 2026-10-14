// 北戴河区景点建模：北戴河海滨、鸽子窝公园、联峰山公园、南戴河
import { C, pine, roundTree, palm, lamp, bench, railing, paving, paifang, chineseHall } from './common.js'
import { mulberry32 } from '../util.js'

// 沙滩
function beach(b, x0, x1, z0, z1, y = 0) {
  b.box(x0, y - 0.5, z0, x1, y, z1, C.sand, { mat: 'stone', solid: false })
  // 波浪线装饰
  for (let x = x0 + 2; x < x1; x += 8) {
    b.box(x, y, z1 - 2, x + 4, y + 0.1, z1, 0x8ab8d0, { solid: false })
  }
}

// 海滨浴场设施
function beachFacilities(b, cx, cz) {
  // 遮阳伞
  for (let i = 0; i < 5; i++) {
    const x = cx - 20 + i * 10, z = cz + 5
    b.boxC(x, 0, z, 0.15, 2.5, 0.15, C.trunk, { solid: false })
    b.prism(x, z, 2.5, 2.8, 2.5, 2.5, 8, [0xf04040, 0x4080f0, 0xf0f040, 0x40f080, 0xf080f0][i % 5], { solid: false })
  }
  // 躺椅
  for (let i = 0; i < 4; i++) {
    const x = cx - 15 + i * 10, z = cz + 8
    b.box(x - 0.8, 0, z - 0.3, x + 0.8, 0.4, z + 1.5, C.wood, { mat: 'wood', solid: false })
    b.box(x - 0.8, 0.4, z + 1.2, x + 0.8, 0.9, z + 1.5, C.wood, { mat: 'wood', solid: false })
  }
  // 更衣室
  b.box(cx + 30, 0, cz + 15, cx + 38, 3, cz + 22, 0x5a9ab0, { mat: 'window' })
  b.sign('更衣室', cx + 34, 2.5, cz + 22.1, 0.6, 0, { bg: '#3a6a8a', fg: '#ffffff' })
  // 救生塔
  b.boxC(cx - 30, 0, cz + 10, 1.5, 0.5, 1.5, C.concrete)
  b.boxC(cx - 30, 0.5, cz + 10, 0.3, 4, 0.3, 0xe04040, { solid: false })
  b.box(cx - 32, 4, cz + 8, cx - 28, 6, cz + 12, 0xe04040, { solid: false })
  b.box(cx - 31.5, 4.5, cz + 8.5, cx - 28.5, 5.5, cz + 11.5, 0x9fc6e0, { mat: 'window', solid: false })
}

// 鹰角亭
function eagleRockPavilion(b, cx, y, cz) {
  // 亭子基座
  b.prism(cx, cz, y, y + 0.5, 5, 5, 6, C.granite)
  // 柱子
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    b.boxC(cx + Math.cos(a) * 3.5, y + 0.5, cz + Math.sin(a) * 3.5, 0.4, 3.5, 0.4, C.darkRed)
  }
  // 斗拱
  b.prism(cx, cz, y + 4, y + 4.3, 5, 5, 6, C.darkRed, { solid: false })
  // 六角攒尖顶
  b.prism(cx, cz, y + 4.3, y + 7, 5.5, 5.5, 6, C.glazedGreen, { rx1: 0.1, rz1: 0.1, solid: false })
  // 宝顶
  b.boxC(cx, y + 7, cz, 0.4, 1, 0.4, C.gold, { solid: false })
  // 栏杆
  for (let i = 0; i < 6; i++) {
    const a1 = (i / 6) * Math.PI * 2, a2 = ((i + 1) / 6) * Math.PI * 2
    const x1 = cx + Math.cos(a1) * 4, z1 = cz + Math.sin(a1) * 4
    const x2 = cx + Math.cos(a2) * 4, z2 = cz + Math.sin(a2) * 4
    railing(b, x1, z1, x2, z2, y + 0.5, 1, C.white, 1)
  }
  b.sign('鹰角亭', cx, y + 3, cz + 4.5, 0.8, 0, { bg: '#2a1a0a', fg: '#ffd76a' })
}

export function buildBeidaiheBeach(b, ctx) {
  const cx = 0, cz = 0
  // 海滩
  beach(b, cx - 80, cx + 80, cz - 20, cz + 60, 0)
  // 海滨大道
  paving(b, cx - 80, cz - 25, cx + 80, cz - 20, 0.3, C.pave)
  // 栏杆
  railing(b, cx - 80, cz - 20, cx + 80, cz - 20, 0.3, 1, 0x8a8a8a)
  // 浴场设施
  beachFacilities(b, cx, cz)
  // 路灯
  for (let x = cx - 70; x <= cx + 70; x += 20) {
    lamp(b, x, 0.3, cz - 23, 5, 'modern')
  }
  // 椰子树（热带风情）
  for (let i = 0; i < 6; i++) {
    palm(b, cx - 60 + i * 25, 0, cz - 28, 1.1)
  }
  // 长椅
  for (let i = 0; i < 4; i++) {
    bench(b, cx - 45 + i * 30, 0.3, cz - 22, 'x')
  }
  // 景区入口牌坊
  paifang(b, cx, cz - 35, 12, 8, '北戴河海滨', C.granite, C.glazedGreen)
  // 交互点
  ctx.interact({ x: cx, z: cz + 20, r: 8, type: 'view', label: '观赏：金色沙滩', id: 'beach_view', landmark: 'beidaihe' })
  ctx.interact({ x: cx - 30, z: cz + 12, r: 4, type: 'info', label: '海滨浴场', text: '北戴河海滨浴场是中国著名的海水浴场，沙质细腻，海水清澈，夏季水温适宜，是避暑度假的理想之地。' })
}

export function beidaiheLOD(b) {
  // 远景简化
  b.box(-80, 0, -20, 80, 0.3, 60, C.sand, { solid: false })
  b.box(-80, 0.3, -25, 80, 0.6, -20, C.pave, { solid: false })
}

export function buildGeziwo(b, ctx) {
  const cx = 0, cz = 0
  // 礁石区
  for (let i = 0; i < 8; i++) {
    const r = mulberry32(i + 1)
    const x = cx - 30 + r() * 60, z = cz + 20 + r() * 25
    const h = 2 + r() * 4, w = 3 + r() * 3
    b.boxC(x, 0, z, w, h, w * 0.8, 0x7a7a70, { solid: false })
  }
  // 主礁石（鸽子窝形）
  b.boxC(cx, 0, cz + 35, 8, 6, 6, 0x8a8a80)
  b.boxC(cx + 2, 6, cz + 35, 4, 3, 4, 0x9a9a90, { solid: false })
  // 鹰角亭
  eagleRockPavilion(b, cx + 25, 8, cz - 10)
  // 观景平台
  b.box(cx + 15, 6, cz - 20, cx + 35, 8, cz - 5, C.stone, { mat: 'stone' })
  paving(b, cx + 16, cz - 19, cx + 34, cz - 6, 8, C.pave)
  railing(b, cx + 15, cz - 5, cx + 35, cz - 5, 8, 1, C.stone)
  railing(b, cx + 15, cz - 20, cx + 15, cz - 5, 8, 1, C.stone)
  railing(b, cx + 35, cz - 20, cx + 35, cz - 5, 8, 1, C.stone)
  // 上山步道
  for (let i = 0; i < 5; i++) {
    const y = i * 1.6
    b.box(cx + 10 - i * 3, y, cz - 25 + i * 4, cx + 18 - i * 3, y + 0.3, cz - 20 + i * 4, C.stone, { mat: 'stone', solid: false })
  }
  // 松树
  for (let i = 0; i < 6; i++) {
    pine(b, cx - 25 + i * 10, 0, cz - 30, 1.0)
  }
  // 毛泽东诗碑
  b.box(cx - 15, 0, cz - 10, cx - 12, 3, cz - 8, C.granite)
  b.sign('浪淘沙·北戴河', cx - 13.5, 2, cz - 7.9, 0.5, 0, { bg: '#4a4a4a', fg: '#ffd76a' })
  // 交互点
  ctx.interact({ x: cx + 25, z: cz - 12, r: 5, type: 'view', label: '观赏：鸽子窝日出', id: 'geziwo_sunrise', landmark: 'geziwo' })
  ctx.interact({ x: cx - 13, z: cz - 8, r: 3, type: 'culture', id: 'maopoem', label: '《浪淘沙·北戴河》' })
}

export function buildLianfengshan(b, ctx) {
  const cx = 0, cz = 0
  // 山体基座
  b.prism(cx, cz, 0, 45, 50, 45, 8, 0x5a8a4a, { mat: 'grass' })
  // 山顶平台
  b.prism(cx, cz, 40, 48, 20, 18, 6, 0x4a7a3a, { mat: 'grass', solid: false })
  // 望海亭
  const ay = 48
  b.prism(cx, cz, ay, ay + 0.4, 6, 6, 4, C.granite)
  for (const [dx, dz] of [[-2.5, -2.5], [2.5, -2.5], [-2.5, 2.5], [2.5, 2.5]]) {
    b.boxC(cx + dx, ay + 0.4, cz + dz, 0.4, 4, 0.4, C.darkRed)
  }
  b.prism(cx, cz, ay + 4.4, ay + 4.7, 6.5, 6.5, 4, C.darkRed, { solid: false })
  b.prism(cx, cz, ay + 4.7, ay + 7, 7, 7, 4, C.glazedGreen, { rx1: 0.15, rz1: 0.15, solid: false })
  b.boxC(cx, ay + 7, cz, 0.3, 0.8, 0.3, C.gold, { solid: false })
  b.sign('望海亭', cx, ay + 3.5, cz + 3.5, 0.6, 0, { bg: '#2a1a0a', fg: '#ffd76a' })
  // 登山步道
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 1.5
    const r = 35 - i * 1.2
    const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r
    const y = i * 2.2
    b.box(x - 1.5, y, z - 1.5, x + 1.5, y + 0.2, z + 1.5, C.stone, { mat: 'stone', solid: false })
  }
  // 松林
  for (let i = 0; i < 15; i++) {
    const r = mulberry32(i + 10)
    const a = r() * Math.PI * 2
    const d = 20 + r() * 20
    const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d
    const h = 15 + r() * 25
    pine(b, x, h, z, 0.8 + r() * 0.4)
  }
  // 交互点
  ctx.interact({ x: cx, z: cz, r: 6, type: 'view', label: '登顶：望海亭', id: 'peak', landmark: 'lianfengshan' })
}

export function buildNandaihe(b, ctx) {
  const cx = 0, cz = 0
  // 黄金海岸沙滩
  beach(b, cx - 70, cx + 70, cz - 15, cz + 50, 0)
  // 滑沙场
  // 高沙丘
  b.prism(cx - 30, cz + 20, 0, 30, 25, 20, 4, C.sand, { mat: 'stone' })
  b.prism(cx - 30, cz + 25, 25, 35, 15, 12, 4, C.sand, { mat: 'stone', solid: false })
  // 滑道
  b.box(cx - 35, 0, cz + 40, cx - 25, 0.5, cz + 60, C.sand, { solid: false })
  b.sign('国际滑沙中心', cx - 30, 32, cz + 18, 1.0, 0, { bg: '#d9a628', fg: '#2a1a0a' })
  // 海滨设施
  for (let i = 0; i < 4; i++) {
    const x = cx + 10 + i * 15, z = cz + 5
    b.boxC(x, 0, z, 0.15, 2.5, 0.15, C.trunk, { solid: false })
    b.prism(x, z, 2.5, 2.8, 2.5, 2.5, 8, [0xf04040, 0x4080f0, 0xf0f040, 0x40f080][i % 4], { solid: false })
  }
  // 度假酒店群（远景）
  for (let i = 0; i < 3; i++) {
    const x = cx + 40 + i * 20
    b.box(x - 8, 0, cz - 30, x + 8, 25 + i * 5, cz - 15, 0xe8e4dc, { mat: 'window' })
  }
  // 交互点
  ctx.interact({ x: cx - 30, z: cz + 30, r: 6, type: 'info', label: '体验滑沙', text: '南戴河国际滑沙中心是中国最大的滑沙场，从60米高的沙丘滑下直入海中，惊险刺激。' })
  ctx.interact({ x: cx + 30, z: cz + 20, r: 6, type: 'view', label: '观赏：黄金海岸', id: 'nandaihe_view', landmark: 'nandaihe' })
  // 跨海索道登乘点（岸边）
  ctx.interact({ x: cx + 60, z: cz + 45, r: 5, type: 'seacable', dir: 1, label: '🚡 跨海索道 → 仙螺岛' })
}

// 仙螺岛 - 海上人工岛
export function buildXianluodao(b, ctx) {
  const cx = 0, cz = 0
  
  // 岛屿基座（海上礁石）
  b.prism(cx, cz, -2, 1, 35, 30, 8, 0x6a7a80, { mat: 'stone' })
  b.prism(cx, cz, 1, 2.5, 32, 28, 8, 0x7a8a90, { mat: 'stone' })
  
  // 环岛栈道
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const r = 28
    const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r
    b.box(x - 2, 2, z - 2, x + 2, 2.5, z + 2, 0x8a7a6a, { mat: 'wood', solid: false })
  }
  railing(b, cx - 30, cz, cx + 30, cz, 2.5, 1, 0x666666, 3)
  
  // 仙螺阁 - 螺旋形观光塔
  const towerX = cx, towerZ = cz - 5
  // 塔基
  b.prism(towerX, towerZ, 2, 5, 10, 10, 8, C.granite)
  // 螺旋塔身（层层缩小，螺旋上升）
  for (let i = 0; i < 7; i++) {
    const y = 5 + i * 6
    const r = 8 - i * 0.8
    const rot = i * 0.3
    b.prism(towerX + Math.cos(rot) * 0.5, towerZ + Math.sin(rot) * 0.5, y, y + 5, r, r, 8, 0xf0e8dc, { mat: 'window' })
    // 外挑观景平台
    const px = towerX + Math.cos(rot + Math.PI/2) * (r + 2)
    const pz = towerZ + Math.sin(rot + Math.PI/2) * (r + 2)
    b.box(px - 3, y + 2, pz - 3, px + 3, y + 2.5, pz + 3, 0xe8e0d0, { solid: false })
    railing(b, px - 3, pz - 3, px + 3, pz + 3, y + 2.5, 1, 0x8a8a8a)
  }
  // 塔顶（海螺形）
  b.prism(towerX, towerZ, 47, 55, 5, 5, 8, C.glazedGreen, { rx1: 0.1, rz1: 0.1, solid: false })
  b.boxC(towerX, 55, towerZ, 0.5, 3, 0.5, C.gold, { solid: false })
  b.sign('仙螺阁', towerX, 48, towerZ + 6, 1.0, 0, { bg: '#1a3a5a', fg: '#7ad0ff', glow: true })
  
  // 海上娱乐设施
  // 蹦极台
  b.box(cx + 18, 2, cz + 8, cx + 24, 35, cz + 14, 0xd04040, { mat: 'metal' })
  b.box(cx + 18, 35, cz + 6, cx + 24, 37, cz + 16, 0xe8e8e8)
  b.sign('海上蹦极', cx + 21, 32, cz + 14.1, 0.7, 0, { bg: '#c03030', fg: '#ffffff' })
  
  // 观海平台
  b.box(cx - 22, 2, cz + 5, cx - 12, 4, cz + 15, 0x8a7a6a, { mat: 'wood' })
  railing(b, cx - 22, cz + 5, cx - 12, cz + 15, 4, 1, 0x666666, 2)
  for (let i = 0; i < 3; i++) {
    bench(b, cx - 20 + i * 4, 4, cz + 10, 'z')
  }
  
  // 海鲜餐厅
  b.box(cx - 15, 2, cz - 20, cx + 5, 8, cz - 10, 0x9fc6e0, { mat: 'window' })
  b.prism(cx - 5, cz - 15, 8, 11, 12, 7, 4, C.glazedGreen, { solid: false })
  b.sign('海鲜餐厅', cx - 5, 6, cz - 9.9, 0.6, 0, { bg: '#2a5a8a', fg: '#ffffff' })
  
  // 索道站（岛上）
  b.box(cx + 25, 2, cz - 8, cx + 35, 10, cz + 2, 0xe8e4dc, { mat: 'window' })
  b.prism(cx + 30, cz - 3, 10, 13, 7, 7, 4, 0x4080c0, { solid: false })
  b.sign('跨海索道', cx + 30, 8, cz + 2.1, 0.7, 0, { bg: '#3060a0', fg: '#ffffff' })
  // 索道支架
  b.boxC(cx + 30, 2, cz - 3, 1.5, 18, 1.5, 0x8a8a8a)
  b.box(cx + 27, 20, cz - 6, cx + 33, 21, cz, 0x6a6a6a)
  
  // 灯塔
  b.boxC(cx - 28, 2, cz - 15, 2, 20, 2, 0xfafafa)
  b.prism(cx - 28, cz - 15, 22, 25, 3, 3, 8, 0xf0e050, { solid: false })
  
  // 礁石装饰
  for (let i = 0; i < 6; i++) {
    const r = mulberry32(i + 100)
    const a = r() * Math.PI * 2
    const d = 33 + r() * 8
    const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d
    b.boxC(x, -1, z, 2 + r() * 2, 3 + r() * 2, 2 + r() * 2, 0x5a6a70, { solid: false })
  }
  
  // 交互点
  ctx.interact({ x: towerX, z: towerZ, r: 6, type: 'view', label: '登塔：仙螺阁', id: 'xianluoge', landmark: 'xianluodao' })
  ctx.interact({ x: cx + 21, z: cz + 11, r: 4, type: 'info', label: '海上蹦极', text: '仙螺岛海上蹦极高度达55米，是国内著名的海上蹦极项目，勇敢者的挑战！' })
  ctx.interact({ x: cx - 5, z: cz - 12, r: 5, type: 'shop', shop: 'xianluodao_seafood' })
  // 索道返回点
  ctx.interact({ x: cx + 30, z: cz - 3, r: 5, type: 'seacable', dir: -1, label: '🚡 跨海索道 → 南戴河' })
}

export function xianluodaoLOD(b) {
  // 远景简化 - 只显示螺旋塔轮廓
  b.prism(0, -5, -2, 2, 30, 25, 8, 0x7a8a90, { solid: false })
  b.prism(0, -5, 2, 50, 8, 8, 8, 0xf0e8dc, { solid: false })
}
