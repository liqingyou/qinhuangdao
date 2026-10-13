// 外围景点建模：祖山、碣石山
import { C, pine, roundTree, lamp, bench, railing, paving, chineseHall, paifang } from './common.js'
import { mulberry32 } from '../util.js'

// 山峰
function peak(b, cx, cz, y0, h, r, color = 0x6a7a60) {
  b.prism(cx, cz, y0, y0 + h, r, r * 0.9, 6, color, { rx1: 0.1, rz1: 0.1, mat: 'stone' })
}

// 瀑布
function waterfall(b, x, y0, z, h, w = 3) {
  // 水流
  for (let y = y0; y > y0 - h; y -= 2) {
    b.box(x - w / 2, y - 2, z - 0.5, x + w / 2, y, z + 0.5, 0x8ad0f0, { mat: 'glass', solid: false })
  }
  // 岩石
  b.box(x - w / 2 - 1, y0 - h - 2, z - 2, x + w / 2 + 1, y0 - h, z + 2, 0x7a7a70, { solid: false })
  // 水潭
  b.prism(x, z + 3, y0 - h - 2, y0 - h - 1.5, w + 2, w + 3, 8, 0x5a9ad0, { solid: false })
}

// 寺庙
function temple(b, cx, y, cz, name) {
  // 山门
  paifang(b, cx, cz + 25, 10, 7, name, C.granite, C.glazedGreen)
  // 大殿
  chineseHall(b, cx, cz, 16, 12, 8, { hip: true, roof: C.glazedGreen, wall: C.greyBrick, col: C.darkRed })
  // 钟楼鼓楼
  for (const dx of [-15, 15]) {
    b.box(cx + dx - 4, y, cz - 5, cx + dx + 4, y + 8, cz + 5, C.greyBrick, 'brick')
    b.hipRoof(cx + dx, cz, 10, 10, y + 8, 4, C.glazedGreen, { over: 0.8, solid: false })
  }
  // 院墙
  b.box(cx - 25, y, cz - 20, cx - 24, y + 3, cz + 30, C.greyBrick, { mat: 'brick', solid: false })
  b.box(cx + 24, y, cz - 20, cx + 25, y + 3, cz + 30, C.greyBrick, { mat: 'brick', solid: false })
  b.box(cx - 25, y, cz - 20, cx + 25, y + 3, cz - 19, C.greyBrick, { mat: 'brick', solid: false })
}

export function buildZushan(b, ctx) {
  const cx = 0, cz = 0
  // 主峰 - 天女峰
  peak(b, cx, cz - 20, 0, 80, 35, 0x5a7a50)
  peak(b, cx + 25, cz + 10, 0, 65, 28, 0x6a8a5a)
  peak(b, cx - 30, cz + 15, 0, 55, 25, 0x5a7a4a)
  // 次峰群
  for (let i = 0; i < 6; i++) {
    const r = mulberry32(i + 100)
    const x = cx - 50 + r() * 100, z = cz - 30 + r() * 80
    const h = 30 + r() * 30, rad = 15 + r() * 15
    if (Math.hypot(x - cx, z - cz + 20) > 40) {
      peak(b, x, z, 0, h, rad, 0x5a7a50)
    }
  }
  // 云海效果（简化用白色方块表示）
  b.box(cx - 60, 25, cz - 50, cx + 60, 28, cz + 50, 0xffffff, { mat: 'glass', solid: false })
  // 瀑布
  waterfall(b, cx + 35, 50, cz - 5, 35)
  // 天女峰顶观景台
  paving(b, cx - 8, cz - 25, cx + 8, cz - 15, 78, C.stone)
  railing(b, cx - 8, cz - 15, cx + 8, cz - 15, 78, 1, C.stone)
  // 松林
  for (let i = 0; i < 30; i++) {
    const r = mulberry32(i + 50)
    const a = r() * Math.PI * 2
    const d = 40 + r() * 40
    const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d
    const baseH = Math.max(0, 20 - Math.hypot(x - cx, z - cz + 20) * 0.3)
    pine(b, x, baseH, z, 0.8 + r() * 0.5)
  }
  // 索道（简化）
  b.beam(cx - 60, 5, cz + 40, cx - 10, 70, cz - 30, 0.15, 0x333333)
  for (let t = 0.1; t < 1; t += 0.2) {
    const x = cx - 60 + t * 50, y = 5 + t * 65, z = cz + 40 - t * 70
    b.box(x - 1, y - 2.5, z - 1, x + 1, y - 0.5, z + 1, 0xd83030, { solid: false })
  }
  // 交互点
  ctx.interact({ x: cx, z: cz - 20, r: 10, type: 'view', label: '登顶：天女峰', id: 'zushan_peak', landmark: 'zushan' })
  ctx.interact({ x: cx + 35, z: cz, r: 5, type: 'info', label: '观赏瀑布', text: '祖山有多处瀑布飞流直下，其中响水瀑布落差60余米，声如雷鸣，气势磅礴。' })
}

export function zushanLOD(b) {
  // 远景简化
  peak(b, 0, -20, 0, 80, 35, 0x5a7a50)
  peak(b, 25, 10, 0, 65, 28, 0x6a8a5a)
  peak(b, -30, 15, 0, 55, 25, 0x5a7a4a)
}

export function buildJieshi(b, ctx) {
  const cx = 0, cz = 0
  // 碣石山主峰 - 仙台顶
  peak(b, cx, cz - 15, 0, 60, 30, 0x7a7a70)
  peak(b, cx + 20, cz + 5, 0, 45, 22, 0x8a8a80)
  peak(b, cx - 25, cz + 10, 0, 40, 20, 0x7a7a70)
  // 仙台顶观海亭
  const ay = 58
  b.prism(cx, cz - 15, ay, ay + 0.4, 5, 5, 6, C.granite)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    b.boxC(cx + Math.cos(a) * 3, ay + 0.4, cz - 15 + Math.sin(a) * 3, 0.35, 3, 0.35, C.darkRed)
  }
  b.prism(cx, cz - 15, ay + 3.4, ay + 6, 5.5, 5.5, 6, C.glazedGreen, { rx1: 0.15, rz1: 0.15, solid: false })
  b.sign('仙台顶', cx, ay + 2.5, cz - 11, 0.7, 0, { bg: '#2a1a0a', fg: '#ffd76a' })
  // 曹操观海处石碑
  b.box(cx - 20, 0, cz + 30, cx - 16, 4, cz + 32, C.granite)
  b.sign('东临碣石', cx - 18, 3, cz + 32.1, 0.6, 0, { bg: '#4a4a4a', fg: '#ffd76a' })
  b.sign('以观沧海', cx - 18, 2, cz + 32.1, 0.6, 0, { bg: '#4a4a4a', fg: '#ffd76a' })
  // 水岩寺
  temple(b, cx + 30, 0, cz + 20, '水岩寺')
  // 登山步道
  for (let i = 0; i < 15; i++) {
    const t = i / 15
    const x = cx - 15 + t * 15, z = cz + 35 - t * 50
    const y = t * 55
    b.box(x - 1.5, y, z - 1.5, x + 1.5, y + 0.3, z + 1.5, C.stone, { mat: 'stone', solid: false })
  }
  // 松柏
  for (let i = 0; i < 20; i++) {
    const r = mulberry32(i + 80)
    const x = cx - 40 + r() * 80, z = cz - 10 + r() * 50
    const baseH = Math.max(0, 15 - Math.hypot(x - cx, z - cz + 15) * 0.2)
    if (Math.hypot(x - cx, z - cz + 15) > 20) {
      pine(b, x, baseH, z, 0.7 + r() * 0.4)
    }
  }
  // 葡萄园（昌黎特产）
  b.box(cx - 50, 0, cz + 40, cx - 30, 0.3, cz + 55, 0x6a9a4a, { mat: 'grass', solid: false })
  for (let x = cx - 48; x < cx - 32; x += 4) {
    b.boxC(x, 0.3, cz + 47, 0.1, 1.8, 0.1, C.trunk, { solid: false })
    b.box(x - 1.5, 1.8, cz + 44, x + 1.5, 2.2, cz + 50, 0x4a8a3a, { mat: 'leaf', solid: false })
  }
  b.sign('昌黎葡萄', cx - 40, 1, cz + 56, 0.5, 0, { bg: '#6a3a6a', fg: '#ffffff' })
  // 交互点
  ctx.interact({ x: cx, z: cz - 12, r: 6, type: 'view', label: '登顶：仙台顶', id: 'jieshi_peak', landmark: 'jieshi' })
  ctx.interact({ x: cx - 18, z: cz + 33, r: 4, type: 'culture', id: 'caocaopoem', label: '《观沧海》碣石山' })
  ctx.interact({ x: cx + 30, z: cz + 25, r: 5, type: 'culture', id: 'shuiyansi', label: '水岩寺' })
}
