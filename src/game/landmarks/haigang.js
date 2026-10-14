// 海港区景点建模：秦皇岛港、奥林匹克公园、野生动物园、乐岛海洋公园、海阳路供电营业厅
import { C, roundTree, pine, lamp, bench, railing, paving, modernTower } from './common.js'
import { mulberry32 } from '../util.js'

// 港口起重机
function portCrane(b, x, y, z, h = 35) {
  // 塔身
  b.boxC(x, y, z, 3, h, 3, 0xe04040, { solid: false })
  // 吊臂
  b.box(x - 1.5, y + h - 3, z - 25, x + 1.5, y + h, z + 5, 0xe04040, { solid: false })
  // 配重
  b.box(x - 2, y + h - 5, z + 3, x + 2, y + h - 2, z + 8, 0x4a4a4a, { solid: false })
  // 驾驶室
  b.box(x - 2.5, y + h - 8, z - 2, x + 2.5, y + h - 3, z + 2, 0xf0f0f0, { mat: 'window', solid: false })
  // 钢缆
  b.boxC(x, y + h, z - 20, 0.1, 20, 0.1, 0x333333, { solid: false })
}

// 装船机
function shipLoader(b, x, y, z) {
  // 传送带支架
  b.box(x - 2, y, z - 40, x + 2, y + 20, z, 0x4a6a8a, { solid: false })
  // 传送带
  b.box(x - 3, y + 18, z - 50, x + 3, y + 22, z + 10, 0x333333, { solid: false })
  // 出料口
  b.box(x - 4, y + 15, z - 55, x + 4, y + 22, z - 50, 0x4a6a8a, { solid: false })
}

// 货轮
function cargoShip(b, x, y, z, len = 50) {
  const w = len * 0.15
  // 船体
  b.box(x - len / 2, y - 3, z - w, x + len / 2, y + 2, z + w, 0x2a3a4a, { solid: false })
  // 船头
  b.box(x + len / 2, y - 2, z - w * 0.6, x + len / 2 + 8, y + 1, z + w * 0.6, 0x2a3a4a, { solid: false })
  // 甲板
  b.box(x - len / 2 + 2, y + 2, z - w + 0.5, x + len / 2 - 2, y + 2.2, z + w - 0.5, 0x5a5a5a, { solid: false })
  // 舰桥
  b.box(x - len / 3, y + 2, z - 3, x - len / 3 + 8, y + 12, z + 3, 0xf0f0f0, { mat: 'window', solid: false })
  // 烟囱
  b.boxC(x - len / 3 + 4, y + 12, z, 2, 4, 2, 0xc8282a, { solid: false })
  // 货舱盖
  for (let i = 0; i < 3; i++) {
    b.box(x - len / 2 + 10 + i * 12, y + 2.2, z - 4, x - len / 2 + 18 + i * 12, y + 3.5, z + 4, 0x4a6a4a, { solid: false })
  }
}

export function buildQinhuangdaoPort(b, ctx) {
  const cx = 0, cz = 0
  // 码头
  paving(b, cx - 60, cz - 40, cx + 80, cz + 10, 0, C.concrete)
  // 煤炭堆场
  b.prism(cx - 50, cz - 25, 0, 8, 20, 15, 4, 0x2a2a2a, { solid: false })
  b.prism(cx - 20, cz - 25, 0, 10, 25, 18, 4, 0x2a2a2a, { solid: false })
  b.prism(cx + 15, cz - 25, 0, 6, 18, 12, 4, 0x2a2a2a, { solid: false })
  // 起重机
  portCrane(b, cx + 50, 0, cz - 10, 40)
  portCrane(b, cx + 70, 0, cz - 10, 40)
  // 装船机
  shipLoader(b, cx - 40, 0, cz + 30)
  shipLoader(b, cx, 0, cz + 30)
  // 货轮（停泊）
  cargoShip(b, cx + 30, -2, cz + 50, 60)
  // 港务大楼
  modernTower(b, cx - 50, cz - 60, 20, 15, 45, 0x8ab0c8, { mat: 'curtain' })
  b.sign('秦皇岛港', cx - 50, 50, cz - 52, 1.5, 0, { bg: '#2a5a8a', fg: '#ffffff' })
  // 围栏
  railing(b, cx - 60, cz + 10, cx + 80, cz + 10, 0, 1.5, 0x666666)
  // 交互点
  ctx.interact({ x: cx, z: cz - 20, r: 8, type: 'view', label: '观赏：港口作业', id: 'port_view', landmark: 'qinhuangdaoport' })
  ctx.interact({ x: cx - 50, z: cz - 55, r: 5, type: 'info', label: '港务大楼', text: '秦皇岛港是中国北方著名的不冻良港，以煤炭运输闻名世界，年吞吐量超过2亿吨。' })
}

export function buildOlympicPark(b, ctx) {
  const cx = 0, cz = 0
  // 体育场（椭圆形）
  for (let a = 0; a < Math.PI * 2; a += 0.15) {
    const x = cx + Math.cos(a) * 35, z = cz + Math.sin(a) * 28
    b.boxC(x, 0, z, 3, 15 + Math.sin(a * 2) * 3, 3, 0xe8e4dc, { solid: false })
  }
  // 看台顶棚
  b.box(cx - 38, 12, cz - 32, cx + 38, 18, cz + 32, 0xf8f8f8, { mat: 'glass', solid: false })
  // 草坪
  b.prism(cx, cz, 0, 0.5, 30, 24, 16, C.grass, { mat: 'grass', solid: false })
  // 跑道
  for (let i = 0; i < 6; i++) {
    const a1 = (i / 8) * Math.PI * 2, a2 = ((i + 1) / 8) * Math.PI * 2
    const r = 25
    b.box(cx + Math.cos(a1) * r - 1, 0, cz + Math.sin(a1) * r - 1, cx + Math.cos(a2) * r + 1, 0.2, cz + Math.sin(a2) * r + 1, 0xc84030, { solid: false })
  }
  // 广场
  paving(b, cx - 50, cz - 50, cx + 50, cz - 35, 0, C.pave)
  // 奥运五环雕塑
  b.boxC(cx, 0, cz - 45, 8, 0.5, 1, C.granite)
  b.sign('2008', cx, 3, cz - 44.5, 1.2, 0, { bg: 'transparent', fg: '#d9a628' })
  // 绿化
  for (let i = 0; i < 10; i++) {
    const r = mulberry32(i + 20)
    roundTree(b, cx - 45 + i * 10, 0, cz - 55, 0.9)
  }
  // 路灯
  for (let x = cx - 40; x <= cx + 40; x += 20) {
    lamp(b, x, 0, cz - 52, 6, 'modern')
  }
  // 交互点
  ctx.interact({ x: cx, z: cz, r: 10, type: 'view', label: '观赏：奥林匹克体育场', id: 'olympic_view', landmark: 'olympicpark' })
}

export function buildWildZoo(b, ctx) {
  const cx = 0, cz = 0
  // 入口大门
  b.box(cx - 15, 0, cz + 35, cx + 15, 8, cz + 40, 0x5a8a4a)
  b.box(cx - 3, 0, cz + 35, cx + 3, 6, cz + 45, 0x4a3a2a, { mat: 'wood' })
  b.sign('秦皇岛野生动物园', cx, 6, cz + 40.5, 1.2, 0, { bg: '#3a6a3a', fg: '#ffffff' })
  // 动物区域（简化表示）
  // 虎区
  b.box(cx - 50, 0, cz - 30, cx - 20, 0.3, cz + 10, 0x8a9a5a, { mat: 'grass', solid: false })
  b.box(cx - 50, 0.3, cz - 30, cx - 50, 3, cz + 10, 0x666666, { solid: false })
  b.box(cx - 20, 0.3, cz - 30, cx - 20, 3, cz + 10, 0x666666, { solid: false })
  b.sign('东北虎', cx - 35, 2, cz + 11, 0.8, 0, { bg: '#e8a020', fg: '#2a1a0a' })
  // 狮区
  b.box(cx + 20, 0, cz - 30, cx + 50, 0.3, cz + 10, 0x9a8a6a, { mat: 'grass', solid: false })
  b.box(cx + 20, 0.3, cz - 30, cx + 20, 3, cz + 10, 0x666666, { solid: false })
  b.box(cx + 50, 0.3, cz - 30, cx + 50, 3, cz + 10, 0x666666, { solid: false })
  b.sign('非洲狮', cx + 35, 2, cz + 11, 0.8, 0, { bg: '#d9a628', fg: '#2a1a0a' })
  // 长颈鹿区
  b.box(cx - 30, 0, cz - 60, cx + 30, 0.3, cz - 35, C.grass, { mat: 'grass', solid: false })
  b.sign('长颈鹿', cx, 2, cz - 34, 0.8, 0, { bg: '#8ab040', fg: '#2a1a0a' })
  // 游览车道
  paving(b, cx - 5, cz - 60, cx + 5, cz + 35, 0.3, C.asphalt)
  // 服务中心
  b.box(cx + 55, 0, cz + 20, cx + 70, 6, cz + 35, 0xe8e4dc, { mat: 'window' })
  // 树木
  for (let i = 0; i < 20; i++) {
    const r = mulberry32(i + 30)
    const x = cx - 60 + r() * 120, z = cz - 50 + r() * 80
    if (Math.abs(x - cx) > 8) roundTree(b, x, 0, z, 0.8 + r() * 0.4)
  }
  // 交互点
  ctx.interact({ x: cx, z: cz + 38, r: 5, type: 'info', label: '野生动物园入口', text: '秦皇岛野生动物园是中国城市中规划面积最大的野生动物园，采用大规模野生放养方式。' })
}

export function buildLedaoOceanPark(b, ctx) {
  const cx = 0, cz = 0
  // 主体建筑（海洋馆）
  b.prism(cx, cz, 0, 18, 30, 25, 8, 0x4a8ab0, { mat: 'window' })
  // 穹顶
  b.prism(cx, cz, 18, 25, 25, 20, 16, 0x9fc6e0, { rx1: 0.3, rz1: 0.3, mat: 'glass', solid: false })
  // 入口
  b.box(cx - 8, 0, cz + 25, cx + 8, 10, cz + 32, 0x4a8ab0)
  b.box(cx - 5, 0, cz + 32, cx + 5, 8, cz + 35, 0x2a5a8a, { mat: 'window' })
  b.sign('乐岛海洋公园', cx, 8, cz + 35.5, 1.0, 0, { bg: '#2a5a8a', fg: '#ffffff' })
  // 海豚雕塑
  b.prism(cx - 12, cz + 30, 0, 0.8, 2, 2, 4, C.granite)
  b.prism(cx - 12, cz + 30, 0.8, 4, 1.5, 2, 6, 0x4ab0d0, { rx1: 0.3, solid: false })
  b.prism(cx + 12, cz + 30, 0, 0.8, 2, 2, 4, C.granite)
  b.prism(cx + 12, cz + 30, 0.8, 4, 1.5, 2, 6, 0x4ab0d0, { rx1: 0.3, solid: false })
  // 水上乐园区域
  b.box(cx - 50, 0, cz - 40, cx - 20, 0.3, cz - 10, 0x5ab0d0, { solid: false })
  b.boxC(cx - 35, 0.3, cz - 25, 8, 15, 8, 0xf04040, { solid: false }) // 滑梯
  // 表演馆
  b.prism(cx + 35, cz - 25, 0, 8, 20, 18, 8, 0x4a8ab0, { mat: 'window' })
  b.sign('海豚表演馆', cx + 35, 6, cz - 6, 0.8, 0, { bg: '#2a5a8a', fg: '#ffffff' })
  // 广场
  paving(b, cx - 20, cz + 35, cx + 20, cz + 50, 0, C.pave)
  // 棕榈树
  for (let i = 0; i < 6; i++) {
    const x = cx - 18 + i * 7
    if (Math.abs(x - cx) > 6) palm(b, x, 0, cz + 42, 1.0)
  }
  // 交互点
  ctx.interact({ x: cx, z: cz + 38, r: 6, type: 'info', label: '乐岛海洋公园', text: '乐岛海洋公园是以海洋为主题的综合性娱乐公园，有海豚表演、海洋动物展示、水上乐园等项目。' })
  ctx.interact({ x: cx + 35, z: cz - 20, r: 5, type: 'culture', id: 'dolphinshow', label: '观看海豚表演' })
}

// 国网海阳路供电营业厅：海港区海阳路265号，原交警支队大楼一层
export function buildHaiyangGridHall(b, ctx) {
  const cx = 0, cz = 0
  const green = 0x0e8a4a
  // 门前广场与海阳路一侧人行道
  paving(b, cx - 26, cz + 14, cx + 26, cz + 30, 0, C.pave)
  paving(b, cx - 18, cz + 6, cx + 18, cz + 14, 0.12, 0xd8d4cc)
  // 主楼（原交警支队办公楼）
  b.box(cx - 16, 0, cz - 12, cx + 16, 20, cz + 8, 0xe7e3d8, { mat: 'window' })
  b.box(cx - 16, 20, cz - 12, cx + 16, 21, cz + 8, 0xc8c4ba, { solid: false })
  // 一层营业厅：绿色门头 + 玻璃幕墙
  b.box(cx - 16.2, 0, cz + 6, cx + 16.2, 5.2, cz + 12, green)
  b.box(cx - 14, 0.5, cz + 8.2, cx + 14, 4.4, cz + 11.6, 0xc5e6d4, { mat: 'glass', solid: false })
  b.box(cx - 18, 4.6, cz + 8, cx + 18, 5.4, cz + 16, green, { solid: false })
  b.sign('国家电网', cx, 6.6, cz + 12.2, 0.9, 0, { bg: '#0e8a4a', fg: '#ffffff' })
  b.sign('海阳路供电营业厅', cx, 3.1, cz + 12.15, 0.55, 0, { bg: '#0e8a4a', fg: '#ffffff' })
  // 自助服务终端
  for (let i = 0; i < 3; i++) {
    const x = cx - 8 + i * 6
    b.box(x - 0.7, 0.2, cz + 9, x + 0.7, 2.1, cz + 10.2, 0x2a2a2a, { solid: false })
    b.box(x - 0.5, 1.05, cz + 10.15, x + 0.5, 1.9, cz + 10.35, 0x7ad0ff, { mat: 'glass', solid: false })
  }
  // 台阶
  b.box(cx - 7, 0, cz + 12, cx + 7, 0.25, cz + 16, C.stone, { solid: false })
  b.box(cx - 6, 0.25, cz + 12.3, cx + 6, 0.5, cz + 15.4, C.stone, { solid: false })
  // 营业时间牌
  b.box(cx + 12, 0, cz + 13, cx + 13.4, 2.6, cz + 14.2, 0xf7f7f4)
  b.sign('营业时间', cx + 12.7, 1.9, cz + 14.3, 0.32, 0, { bg: '#0e8a4a', fg: '#ffffff' })
  // 国网绿柱
  b.boxC(cx - 20, 0, cz + 18, 0.8, 8, 0.8, green, { solid: false })
  b.boxC(cx - 20, 8, cz + 18, 1.6, 1.6, 0.3, green, { solid: false })
  // 行道树与路灯
  for (let i = 0; i < 4; i++) {
    roundTree(b, cx - 20 + i * 13, 0, cz + 24, 0.9)
    lamp(b, cx - 16 + i * 11, 0, cz + 20, 5, 'modern')
  }
  bench(b, cx - 10, 0.12, cz + 18, 'x')
  bench(b, cx + 8, 0.12, cz + 18, 'x')
  ctx.interact({
    x: cx, z: cz + 15, r: 6, type: 'info', label: '海阳路供电营业厅',
    text: '国网秦皇岛供电公司海阳路供电营业厅，位于海港区海阳路265号（原交警支队大楼一层）。电话 0335-3382734。营业时间：周一至周五 8:30–17:30，周六、周日及法定节假日 8:30–17:00。可办理用电报装、电费和充电桩报装等业务。'
  })
}
