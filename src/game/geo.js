// 地理数据：真实经纬度 → 游戏坐标（1km ≈ 200格，核心区外按比例压缩）
import { distToSeg, pointInPoly } from './util.js'

// 秦皇岛市中心坐标
export const ORIGIN = { lat: 39.93, lon: 119.60 }
export const UPK = 200 // units per km
const KX = 111.32 * Math.cos((ORIGIN.lat * Math.PI) / 180)
const KZ = 110.574
const CORE_R = 15
const COMPRESS = 0.35

export function compressFactor(lat, lon) {
  const ex = (lon - ORIGIN.lon) * KX, nz = (lat - ORIGIN.lat) * KZ
  const d = Math.hypot(ex, nz)
  return d > CORE_R ? COMPRESS : 1
}

export function project(lat, lon) {
  let ex = (lon - ORIGIN.lon) * KX
  let nz = (lat - ORIGIN.lat) * KZ
  const d = Math.hypot(ex, nz)
  if (d > CORE_R) {
    const f = (CORE_R + (d - CORE_R) * COMPRESS) / d
    ex *= f
    nz *= f
  }
  return { x: ex * UPK, z: -nz * UPK }
}

export function unproject(x, z) {
  let ex = x / UPK, nz = -z / UPK
  const d = Math.hypot(ex, nz)
  if (d > CORE_R) {
    const real = CORE_R + (d - CORE_R) / COMPRESS
    ex *= real / d
    nz *= real / d
  }
  return { lat: ORIGIN.lat + nz / KZ, lon: ORIGIN.lon + ex / KX }
}

const P = (lat, lon) => project(lat, lon)

// ---------------- 水系 ----------------
// 秦皇岛水系：渤海海岸线、戴河、汤河、石河
const RIVER_DATA = [
  {
    name: '渤海海岸线',
    pts: [
      [39.81, 119.35, 2.0], [39.82, 119.42, 1.8], [39.83, 119.49, 1.5], [39.85, 119.53, 1.2],
      [39.87, 119.58, 1.0], [39.90, 119.62, 0.8], [39.92, 119.68, 0.8], [39.95, 119.75, 1.0],
      [39.98, 119.80, 1.2], [39.99, 119.83, 1.5], [40.00, 119.88, 2.0]
    ]
  },
  {
    name: '戴河',
    pts: [[39.85, 119.49, 0.08], [39.86, 119.48, 0.06], [39.87, 119.46, 0.05], [39.88, 119.44, 0.04], [39.90, 119.42, 0.03]]
  },
  {
    name: '汤河',
    pts: [[39.93, 119.58, 0.06], [39.94, 119.56, 0.05], [39.96, 119.54, 0.04], [39.98, 119.52, 0.04], [40.00, 119.50, 0.03]]
  },
  {
    name: '石河',
    pts: [[39.98, 119.78, 0.05], [40.00, 119.76, 0.04], [40.02, 119.74, 0.04], [40.04, 119.72, 0.03]]
  },
  {
    name: '洋河',
    pts: [[39.72, 119.20, 0.08], [39.74, 119.22, 0.06], [39.76, 119.25, 0.05], [39.78, 119.28, 0.04]]
  }
]

export const RIVERS = RIVER_DATA.map((r) => ({
  name: r.name,
  pts: r.pts.map(([lat, lon, w]) => {
    const p = P(lat, lon)
    return { x: p.x, z: p.z, w: w * UPK * compressFactor(lat, lon) }
  })
}))

// ---------------- 道路 ----------------
const ROAD_DATA = [
  { name: '滨海大道', w: 14, pts: [[39.81, 119.38], [39.83, 119.46], [39.85, 119.52], [39.88, 119.58], [39.91, 119.64], [39.94, 119.70], [39.97, 119.78], [39.99, 119.82]] },
  { name: '北戴河大街', w: 12, pts: [[39.82, 119.46], [39.83, 119.48], [39.84, 119.50], [39.85, 119.52]] },
  { name: '秦皇大街', w: 14, pts: [[39.90, 119.55], [39.92, 119.58], [39.94, 119.61], [39.96, 119.64], [39.98, 119.67]] },
  { name: '河北大街', w: 12, pts: [[39.92, 119.56], [39.93, 119.60], [39.94, 119.64], [39.95, 119.68]] },
  { name: '文化路', w: 10, pts: [[39.91, 119.58], [39.93, 119.60], [39.95, 119.62]] },
  { name: '海阳路', w: 12, pts: [[39.940, 119.575], [39.9363, 119.5867], [39.9324, 119.5907], [39.9295, 119.600]] },
  { name: '山海关路', w: 12, pts: [[39.96, 119.70], [39.98, 119.74], [40.00, 119.77]] },
  { name: '长城旅游路', w: 10, pts: [[39.99, 119.77], [40.00, 119.80], [39.99, 119.83]] },
  { name: '联峰路', w: 8, pts: [[39.82, 119.47], [39.83, 119.48], [39.82, 119.49]] },
  { name: '鸽子窝路', w: 8, pts: [[39.84, 119.51], [39.85, 119.53], [39.86, 119.52]] },
  { name: '南戴河大道', w: 10, pts: [[39.80, 119.38], [39.81, 119.40], [39.82, 119.43]] },
  { name: '海滨路', w: 10, ped: true, pts: [[39.83, 119.49], [39.84, 119.51], [39.85, 119.53]] }
]

function offsetRiverRoad(name, riverName, fromX, toX, side, gap, w) {
  const r = RIVERS.find((v) => v.name === riverName)
  if (!r) return null
  const pts = []
  for (let i = 0; i < r.pts.length; i++) {
    const p = r.pts[i]
    if (p.x < fromX || p.x > toX) continue
    const a = r.pts[Math.max(0, i - 1)], b = r.pts[Math.min(r.pts.length - 1, i + 1)]
    let dx = b.x - a.x, dz = b.z - a.z
    const l = Math.hypot(dx, dz) || 1
    dx /= l
    dz /= l
    const nx = dz * side, nz = -dx * side
    const off = p.w / 2 + gap
    pts.push({ x: p.x + nx * off, z: p.z + nz * off })
  }
  return { name, w, pts }
}

export const ROADS = ROAD_DATA.map((r) => ({ name: r.name, w: r.w, ped: !!r.ped, pts: r.pts.map(([lat, lon]) => P(lat, lon)) }))

// ---------------- 分区 ----------------
export const DISTRICTS = {
  haigang: { name: '海港区', color: '#5b8fd9', theme: '城市中心' },
  shanhaiguan: { name: '山海关区', color: '#e8b04a', theme: '长城起点' },
  beidaihe: { name: '北戴河区', color: '#4fb3b8', theme: '海滨度假' },
  funing: { name: '抚宁区', color: '#5fae6b', theme: '田园风光' },
  changli: { name: '昌黎县', color: '#d9785b', theme: '葡萄之乡' },
  lulong: { name: '卢龙县', color: '#9b6bd1', theme: '古城文化' },
  qinglong: { name: '青龙县', color: '#8f9aa8', theme: '满族风情' }
}

const SEEDS = [
  ['haigang', 39.93, 119.60], ['haigang', 39.92, 119.62], ['haigang', 39.94, 119.58], ['haigang', 39.91, 119.64],
  ['shanhaiguan', 40.00, 119.77], ['shanhaiguan', 39.99, 119.80], ['shanhaiguan', 40.01, 119.75],
  ['beidaihe', 39.83, 119.49], ['beidaihe', 39.85, 119.52], ['beidaihe', 39.82, 119.46], ['beidaihe', 39.81, 119.42],
  ['funing', 39.88, 119.52], ['funing', 39.90, 119.50], ['funing', 39.92, 119.48],
  ['changli', 39.72, 119.20], ['changli', 39.75, 119.25], ['changli', 39.78, 119.30],
  ['lulong', 39.90, 119.18], ['lulong', 39.92, 119.22],
  ['qinglong', 40.10, 119.40], ['qinglong', 40.15, 119.45]
].map(([id, lat, lon]) => ({ id, ...P(lat, lon) }))

// 渤海海域多边形
const coast = RIVERS.find((r) => r.name === '渤海海岸线').pts
const BOHAI_POLY = []
for (const p of coast) BOHAI_POLY.push([p.x, p.z])
BOHAI_POLY.push([coast[coast.length - 1].x, coast[coast.length - 1].z + 3000])
BOHAI_POLY.push([coast[0].x, coast[0].z + 3000])

export function districtAt(x, z) {
  if (pointInPoly(x, z, BOHAI_POLY)) return 'beidaihe'
  let best = null, bd = Infinity
  for (const s of SEEDS) {
    const d = (s.x - x) ** 2 + (s.z - z) ** 2
    if (d < bd) { bd = d; best = s.id }
  }
  return best
}

// ---------------- 地形 ----------------
const HILLS = [
  // 联峰山（北戴河）
  [39.82, 119.48, 60, 120], [39.83, 119.47, 40, 90],
  // 鸽子窝附近
  [39.86, 119.54, 25, 60],
  // 山海关角山
  [40.02, 119.76, 80, 140], [40.04, 119.74, 60, 120],
  // 祖山
  [40.10, 119.50, 150, 200], [40.12, 119.48, 120, 180], [40.08, 119.52, 100, 160],
  // 老龙头附近
  [39.99, 119.84, 15, 40],
  // 碣石山（昌黎）
  [39.75, 119.22, 100, 150], [39.77, 119.20, 80, 130],
  // 青龙山区
  [40.15, 119.42, 180, 250], [40.18, 119.45, 200, 280]
].map(([lat, lon, h, r]) => ({ ...P(lat, lon), h, r }))

export function rawHeight(x, z) {
  let h = 0
  for (const k of HILLS) {
    const dx = x - k.x, dz = z - k.z
    const d2 = dx * dx + dz * dz
    const r2 = k.r * k.r
    if (d2 < r2 * 6) h += k.h * Math.exp(-d2 / (r2 * 0.6))
  }
  if (h > 1) {
    h += (Math.sin(x * 0.07) * Math.cos(z * 0.05) + Math.sin((x + z) * 0.031)) * Math.min(4, h * 0.08)
  }
  return h < 0.6 ? 0 : h
}

// 方块化地形高度（整数台阶）
export function terrainHeight(x, z) {
  let h = rawHeight(x, z)
  if (h > 0) {
    const r = roadAt(x, z, 18)
    if (r) h *= Math.min(1, Math.max(0, (r.d - r.hw + 18) / 18) ** 2)
  }
  return Math.floor(h)
}

// 绿地 / 公园 [lat, lon, 半径units]
export const PARKS = [
  [39.82, 119.48, 100], // 联峰山公园
  [39.85, 119.53, 80], // 鸽子窝公园
  [39.83, 119.50, 60], // 北戴河海滨公园
  [39.93, 119.60, 50], // 海港区公园
  [40.00, 119.77, 70], // 山海关公园
  [39.81, 119.41, 90], // 南戴河公园
  [40.10, 119.50, 200], // 祖山风景区
  [39.75, 119.22, 140] // 碣石山风景区
].map(([lat, lon, r]) => ({ ...P(lat, lon), r }))

export function isPark(x, z) {
  for (const p of PARKS) if ((p.x - x) ** 2 + (p.z - z) ** 2 < p.r * p.r) return true
  return false
}

// ---------------- 空间索引 ----------------
const GRID = 64
function buildSegGrid(lines, widthOf) {
  const grid = new Map()
  for (const line of lines) {
    for (let i = 1; i < line.pts.length; i++) {
      const a = line.pts[i - 1], b = line.pts[i]
      const w = Math.max(widthOf(line, a), widthOf(line, b)) / 2 + 20
      const seg = { ax: a.x, az: a.z, bx: b.x, bz: b.z, wa: widthOf(line, a), wb: widthOf(line, b), line }
      const x0 = Math.floor((Math.min(a.x, b.x) - w) / GRID), x1 = Math.floor((Math.max(a.x, b.x) + w) / GRID)
      const z0 = Math.floor((Math.min(a.z, b.z) - w) / GRID), z1 = Math.floor((Math.max(a.z, b.z) + w) / GRID)
      for (let gx = x0; gx <= x1; gx++)
        for (let gz = z0; gz <= z1; gz++) {
          const k = gx + ',' + gz
          let arr = grid.get(k)
          if (!arr) grid.set(k, (arr = []))
          arr.push(seg)
        }
    }
  }
  return grid
}

const riverGrid = buildSegGrid(RIVERS, (l, p) => p.w)
const roadGrid = buildSegGrid(ROADS, (l) => l.w)

function querySeg(grid, x, z, pad = 0) {
  const arr = grid.get(Math.floor(x / GRID) + ',' + Math.floor(z / GRID))
  if (!arr) return null
  let best = null
  for (const s of arr) {
    const { d, t } = distToSeg(x, z, s.ax, s.az, s.bx, s.bz)
    const hw = (s.wa + (s.wb - s.wa) * t) / 2 + pad
    if (d < hw && (!best || d - hw < best.m)) best = { seg: s, d, hw, m: d - hw, line: s.line }
  }
  return best
}

// 陆地覆盖（海滩、码头等）: 矩形 {x0,z0,x1,z1}
export const LAND_OVERRIDES = []
export function addLandOverride(x0, z0, x1, z1) {
  LAND_OVERRIDES.push({ x0: Math.min(x0, x1), z0: Math.min(z0, z1), x1: Math.max(x0, x1), z1: Math.max(z0, z1) })
}
function inLandOverride(x, z) {
  for (const r of LAND_OVERRIDES) if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1) return true
  return false
}

export function riverAt(x, z, pad = 0) {
  return querySeg(riverGrid, x, z, pad)
}
export function isWater(x, z) {
  return !!querySeg(riverGrid, x, z) && !inLandOverride(x, z)
}
export function roadAt(x, z, pad = 0) {
  return querySeg(roadGrid, x, z, pad)
}
export function isBridge(x, z) {
  return isWater(x, z) && !!querySeg(roadGrid, x, z)
}
// 玩家/NPC 是否可在此处站立（水面上只有桥可走）
export function walkableWater(x, z) {
  if (!isWater(x, z)) return true
  return !!querySeg(roadGrid, x, z, -0.5)
}

export const WATER_Y = -0.7
export const BRIDGE_Y = 0.35

// ---------------- 交通 ----------------
export const BUS_ROUTE = {
  name: '旅游观光巴士',
  pts: [
    [39.85, 119.53], [39.84, 119.51], [39.83, 119.49], [39.85, 119.52],
    [39.88, 119.58], [39.91, 119.62], [39.94, 119.68], [39.97, 119.74], [40.00, 119.77]
  ].map(([a, b]) => P(a, b)),
  stops: [
    { name: '鸽子窝公园', lat: 39.85, lon: 119.53 },
    { name: '北戴河海滨', lat: 39.83, lon: 119.49 },
    { name: '秦皇岛港', lat: 39.93, lon: 119.62 },
    { name: '山海关', lat: 40.00, lon: 119.77 }
  ].map((s) => ({ ...s, ...P(s.lat, s.lon) }))
}

export const METRO_STATIONS = [
  { id: 'beidaihe', name: '北戴河站', lines: ['滨海快线'], lat: 39.83, lon: 119.49 },
  { id: 'geziwo', name: '鸽子窝站', lines: ['滨海快线'], lat: 39.85, lon: 119.53 },
  { id: 'haigang', name: '海港站', lines: ['滨海快线', '1号线'], lat: 39.93, lon: 119.60 },
  { id: 'qinhuangdao', name: '秦皇岛站', lines: ['1号线'], lat: 39.94, lon: 119.62 },
  { id: 'donggang', name: '东港站', lines: ['1号线'], lat: 39.95, lon: 119.66 },
  { id: 'shanhaiguan', name: '山海关站', lines: ['1号线'], lat: 40.00, lon: 119.77 },
  { id: 'laolongtou', name: '老龙头站', lines: ['1号线'], lat: 39.99, lon: 119.82 },
  { id: 'nandaihe', name: '南戴河站', lines: ['滨海快线'], lat: 39.81, lon: 119.42 },
  { id: 'lianfeng', name: '联峰山站', lines: ['滨海快线'], lat: 39.82, lon: 119.48 },
  { id: 'zushan', name: '祖山站', lines: ['2号线'], lat: 40.08, lon: 119.52 },
  { id: 'jieshi', name: '碣石山站', lines: ['2号线'], lat: 39.76, lon: 119.23 }
].map((s) => ({ ...s, ...P(s.lat, s.lon) }))

// 渤海游船航线（沿海岸线）
export function cruiseRoute() {
  const pts = coast
  const out = []
  for (const p of pts) {
    out.push({ x: p.x, z: p.z })
  }
  return out
}

export const PIERS = [
  { id: 'beidaihe', name: '北戴河码头', lat: 39.84, lon: 119.51 },
  { id: 'qinhuangdao', name: '秦皇岛港码头', lat: 39.93, lon: 119.63 },
  { id: 'laolongtou', name: '老龙头码头', lat: 39.99, lon: 119.83 }
].map((s) => ({ ...s, ...P(s.lat, s.lon) }))

export function worldBounds() {
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity
  for (const s of SEEDS) {
    x0 = Math.min(x0, s.x); x1 = Math.max(x1, s.x); z0 = Math.min(z0, s.z); z1 = Math.max(z1, s.z)
  }
  return { x0: x0 - 600, x1: x1 + 600, z0: z0 - 600, z1: z1 + 600 }
}

export { BOHAI_POLY as HAIZHU_POLY }
