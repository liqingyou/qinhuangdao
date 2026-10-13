// 山海关区景点建模：山海关、天下第一关城楼、老龙头
import { C, pine, stoneLion, paifang, chineseHall, lamp, bench, railing, paving } from './common.js'

// 长城城墙段落
function wallSegment(b, x0, x1, z, y0, h, battlementH = 1.5) {
  const w = 8 // 城墙宽度
  b.box(x0, y0, z - w / 2, x1, y0 + h, z + w / 2, C.greyBrick, 'brick')
  // 女墙垛口
  for (let x = x0 + 1; x < x1 - 0.5; x += 2) {
    b.box(x, y0 + h, z - w / 2 - 0.3, x + 1, y0 + h + battlementH, z - w / 2 + 0.3, C.greyBrick, { mat: 'brick', solid: false })
    b.box(x, y0 + h, z + w / 2 - 0.3, x + 1, y0 + h + battlementH, z + w / 2 + 0.3, C.greyBrick, { mat: 'brick', solid: false })
  }
  // 走道
  b.box(x0 + 0.5, y0 + h, z - w / 2 + 0.5, x1 - 0.5, y0 + h + 0.15, z + w / 2 - 0.5, C.stone, { mat: 'stone', solid: false })
}

// 城楼（歇山顶）
function gateTower(b, cx, cz, y0, w, d, floors, opt = {}) {
  const fh = 4
  let y = y0
  // 城台
  b.box(cx - w / 2 - 2, y0 - 8, cz - d / 2 - 2, cx + w / 2 + 2, y0, cz + d / 2 + 2, C.greyBrick, 'brick')
  // 门洞
  b.box(cx - 2.5, y0 - 8, cz - d / 2 - 3, cx + 2.5, y0 - 2, cz + d / 2 + 3, 0x2a2420, { solid: false })
  
  for (let f = 0; f < floors; f++) {
    const fw = w - f * 2, fd = d - f * 1.5
    const isTop = f === floors - 1
    // 柱网
    const cols = []
    for (let i = -2; i <= 2; i++) cols.push(cx + i * (fw / 5))
    for (let j = -1; j <= 1; j++) {
      for (const x of cols) {
        b.boxC(x, y, cz + j * (fd / 3), 0.6, fh, 0.6, C.darkRed)
      }
    }
    // 斗拱/梁枋
    b.box(cx - fw / 2 - 0.5, y + fh - 1, cz - fd / 2 - 0.5, cx + fw / 2 + 0.5, y + fh, cz + fd / 2 + 0.5, C.darkRed, { solid: false })
    // 围廊
    if (f > 0) {
      railing(b, cx - fw / 2, cz - fd / 2, cx + fw / 2, cz - fd / 2, y, 1, C.white, 1.2)
      railing(b, cx - fw / 2, cz + fd / 2, cx + fw / 2, cz + fd / 2, y, 1, C.white, 1.2)
      railing(b, cx - fw / 2, cz - fd / 2, cx - fw / 2, cz + fd / 2, y, 1, C.white, 1.2)
      railing(b, cx + fw / 2, cz - fd / 2, cx + fw / 2, cz + fd / 2, y, 1, C.white, 1.2)
    }
    y += fh
  }
  // 歇山顶
  const roofY = y
  const roofH = d * 0.4
  b.hipRoof(cx, cz, w + 2, d + 2, roofY, roofH, opt.roofColor || C.glazedGreen, { over: 1.5, minW: w * 0.3, minD: 1 })
  // 屋脊装饰
  b.box(cx - w / 2 + 1, roofY + roofH, cz - 0.4, cx + w / 2 - 1, roofY + roofH + 0.8, cz + 0.4, C.glazedGreen, { solid: false })
  // 鸱吻
  for (const dx of [-w / 2 + 1.5, w / 2 - 1.5]) {
    b.boxC(cx + dx, roofY + roofH + 0.8, cz, 1, 1.2, 0.8, C.glazedGreen, { solid: false })
  }
  return roofY + roofH + 2
}

// "天下第一关"匾额
function firstPassPlaque(b, cx, y, cz) {
  // 匾额底板
  b.box(cx - 4, y, cz - 0.3, cx + 4, y + 2, cz + 0.3, C.black, { solid: false })
  // 金色边框
  b.box(cx - 4.1, y - 0.1, cz - 0.35, cx + 4.1, y, cz + 0.35, C.gold, { solid: false })
  b.box(cx - 4.1, y + 2, cz - 0.35, cx + 4.1, y + 2.1, cz + 0.35, C.gold, { solid: false })
  // 文字
  b.sign('天下第一关', cx, y + 1, cz + 0.35, 1.8, 0, { bg: 'transparent', fg: '#ffd76a', px: 72 })
}

export function buildShanhaiguan(b, ctx) {
  const cx = 0, cz = 0
  // 城墙主体
  wallSegment(b, cx - 60, cx + 60, cz, 0, 12)
  // 主城楼
  const towerH = gateTower(b, cx, cz - 4, 12, 18, 14, 2, { roofColor: C.glazedGreen })
  // 天下第一关匾额
  firstPassPlaque(b, cx, 16, cz + 11)
  // 城门
  b.box(cx - 3, 0, cz - 10, cx + 3, 10, cz - 4, 0x3a2a1a, { mat: 'wood' })
  // 石狮
  stoneLion(b, cx - 8, 0, cz + 14, 1)
  stoneLion(b, cx + 8, 0, cz + 14, 1)
  // 旗杆
  b.boxC(cx - 12, 12, cz - 4, 0.3, 8, 0.3, C.darkRed, { solid: false })
  b.box(cx - 12.5, 19, cz - 4.5, cx - 11.5, 23, cz - 0.5, 0xc8282a, { solid: false })
  b.boxC(cx + 12, 12, cz - 4, 0.3, 8, 0.3, C.darkRed, { solid: false })
  b.box(cx + 11.5, 19, cz - 4.5, cx + 12.5, 23, cz - 0.5, 0xc8282a, { solid: false })
  // 广场
  paving(b, cx - 30, cz + 12, cx + 30, cz + 50, 0, C.pave)
  // 游客服务设施
  bench(b, cx - 20, 0, cz + 25, 'x')
  bench(b, cx + 20, 0, cz + 25, 'x')
  lamp(b, cx - 25, 0, cz + 30, 5, 'old')
  lamp(b, cx + 25, 0, cz + 30, 5, 'old')
  // 周边树木
  for (let i = 0; i < 8; i++) {
    pine(b, cx - 45 + i * 12, 0, cz + 45, 1.2)
  }
  // 交互点
  ctx.interact({ x: cx, z: cz + 15, r: 6, type: 'view', label: '观赏：天下第一关', id: 'firstpass_view', landmark: 'shanhaiguan' })
  ctx.interact({ x: cx, z: cz - 15, r: 5, type: 'info', label: '登城楼', text: '山海关城楼始建于明洪武十四年（1381年），是明长城东端起点。城楼上悬挂"天下第一关"匾额，每字高1.6米。' })
}

export function shanhaiguanLOD(b) {
  // 远景简化模型
  b.box(-60, 0, -4, 60, 12, 4, C.greyBrick, { solid: false })
  b.box(-10, 12, -8, 10, 28, 6, C.greyBrick, { solid: false })
  b.hipRoof(0, -1, 22, 16, 28, 6, C.glazedGreen, { over: 1.5, solid: false })
}

export function buildFirstPass(b, ctx) {
  // 天下第一关城楼独立建模
  const cx = 0, cz = 0
  // 城台
  b.box(cx - 12, 0, cz - 10, cx + 12, 8, cz + 10, C.greyBrick, 'brick')
  // 城楼
  gateTower(b, cx, cz, 8, 16, 12, 2, { roofColor: C.glazedGreen })
  // 匾额
  firstPassPlaque(b, cx, 14, cz + 12)
  // 瓮城
  b.box(cx - 18, 0, cz + 10, cx - 12, 6, cz + 25, C.greyBrick, 'brick')
  b.box(cx + 12, 0, cz + 10, cx + 18, 6, cz + 25, C.greyBrick, 'brick')
  b.box(cx - 18, 0, cz + 25, cx + 18, 6, cz + 28, C.greyBrick, 'brick')
  // 内部展览
  ctx.interact({ x: cx, z: cz, r: 5, type: 'culture', id: 'greatwall', label: '了解长城历史' })
}

export function buildLaolongtou(b, ctx) {
  // 老龙头：长城入海处
  const cx = 0, cz = 0
  // 入海城墙
  for (let i = 0; i < 6; i++) {
    const z = cz - i * 12
    const y = i < 3 ? 0 : -2
    wallSegment(b, cx - 4, cx + 60, z, y, 8 - i * 0.5)
  }
  // 龙头造型（简化）
  b.box(cx - 8, -2, cz - 70, cx + 8, 4, cz - 60, C.greyBrick, 'brick')
  b.box(cx - 6, 4, cz - 68, cx + 6, 8, cz - 62, C.greyBrick, 'brick')
  // 澄海楼
  chineseHall(b, cx + 30, cz - 20, 12, 10, 8, { hip: true, roof: C.glazedGreen, wall: C.greyBrick })
  b.sign('澄海楼', cx + 30, 10, cz - 14, 1.2, 0, { bg: '#2a1a0a', fg: '#ffd76a' })
  // 海边栈道
  paving(b, cx - 20, cz + 10, cx + 60, cz + 20, 0, C.stone)
  railing(b, cx - 20, cz + 20, cx + 60, cz + 20, 0, 1, C.stone)
  // 海浪礁石（装饰）
  for (let i = 0; i < 5; i++) {
    b.boxC(cx - 15 + i * 8, -1, cz - 75 + i * 3, 3 + Math.random() * 2, 2, 3 + Math.random() * 2, 0x6a6a60, { solid: false })
  }
  // 观景台
  ctx.interact({ x: cx + 35, z: cz - 25, r: 5, type: 'view', label: '观赏：海上日出', id: 'sunrise_view', landmark: 'laolongtou' })
  ctx.interact({ x: cx, z: cz - 65, r: 6, type: 'info', label: '龙头入海处', text: '老龙头是万里长城唯一入海处，长城从这里蜿蜒入海，宛如巨龙饮水。此处为明代戚继光所修建，是观赏海上日出的绝佳地点。' })
}

export function laolongtouLOD(b) {
  // 远景简化
  b.box(-4, 0, -70, 60, 8, 0, C.greyBrick, { solid: false })
  b.box(-8, -2, -70, 8, 6, -60, C.greyBrick, { solid: false })
}
