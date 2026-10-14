// 游戏数据：美食、文化、纪念品、商店、任务、NPC 对白
// 秦皇岛版本
export const FOODS = {
  pipixia: { name: '皮皮虾', icon: '🦐', price: 58, desc: '秦皇岛海鲜代表，又名虾爬子、濑尿虾。蒸熟后肉质鲜嫩，是当地人最爱的海鲜之一。' },
  pangxie: { name: '海蟹', icon: '🦀', price: 68, desc: '渤海湾特产飞蟹，膏肥肉美，清蒸最能保留原汁原味。北戴河海鲜市场是品蟹好去处。' },
  shanbie: { name: '扇贝', icon: '🐚', price: 35, desc: '秦皇岛扇贝以蒜蓉粉丝蒸制最为经典，贝肉鲜嫩，蒜香四溢。' },
  haican: { name: '海参', icon: '🥢', price: 88, desc: '渤海野生海参是珍贵的滋补食材，葱烧海参是当地名菜。' },
  kaolengmian: { name: '烤冷面', icon: '🍜', price: 12, desc: '东北特色小吃，在秦皇岛街头随处可见。冷面烤至焦香，卷上香肠、鸡蛋和酱料，酸甜可口。' },
  fengezi: { name: '粉鸽子', icon: '🍲', price: 28, desc: '秦皇岛地方特色面食，用绿豆面制成的粉条配上鸽子肉和香菇炖煮，鲜香滑嫩。' },
  guotie: { name: '长城锅贴', icon: '🥟', price: 18, desc: '山海关特色小吃，锅贴皮薄馅大，底部金黄酥脆，是游览长城后的美味选择。' },
  putao: { name: '昌黎葡萄', icon: '🍇', price: 25, desc: '昌黎是中国著名的葡萄产区，玫瑰香葡萄皮薄多汁，甜度极高，还可酿制葡萄酒。' },
  haixian: { name: '海鲜拼盘', icon: '🦞', price: 128, desc: '北戴河海鲜大排档的招牌，包含皮皮虾、螃蟹、扇贝、蛏子等时令海鲜。' },
  kaoyumi: { name: '烤玉米', icon: '🌽', price: 8, desc: '海边小吃摊的必备，炭火烤制的玉米香甜可口，是看海的好搭档。' }
}

export const CULTURE = {
  greatwall: { name: '长城文化', icon: '🏰', desc: '山海关是明长城东端起点，"天下第一关"匾额闻名天下。万里长城从这里蜿蜒入海，老龙头是长城唯一入海处，体现了中国古代防御工程的伟大智慧。' },
  qinshihuang: { name: '秦始皇求仙', icon: '👑', desc: '秦皇岛因秦始皇东巡求仙而得名。公元前215年，秦始皇派方士徐福率童男童女东渡求仙，秦皇岛由此成为中国历史上第一个以皇帝名号命名的城市。' },
  caocao: { name: '曹操观海', icon: '📜', desc: '"东临碣石，以观沧海。水何澹澹，山岛竦峙。"曹操《观沧海》是中国文学史上第一首完整的山水诗，碣石山因此名扬天下。' },
  beidaihe: { name: '避暑文化', icon: '🏖️', desc: '北戴河自1893年被辟为避暑胜地以来，以清凉宜人的气候闻名。毛泽东在此写下《浪淘沙·北戴河》，留下"大雨落幽燕，白浪滔天"的千古名句。' },
  manzu: { name: '满族风情', icon: '🏮', desc: '青龙满族自治县是河北省唯一的满族自治县，保留着独特的满族传统文化、服饰和饮食习惯。' },
  haibindu: { name: '海滨度假', icon: '🌊', desc: '秦皇岛是中国北方著名的海滨度假城市，拥有绵延百余公里的海岸线，金沙滩、蓝海水、清新的空气吸引着八方游客。' },
  gangkou: { name: '港口文化', icon: '⚓', desc: '秦皇岛港是中国北方著名的不冻良港，以煤炭运输闻名世界，是"北煤南运"的主要通道，见证了中国近现代工业的发展。' },
  changcheng: { name: '长城起点', icon: '🧱', desc: '"两京锁钥无双地，万里长城第一关"。山海关是万里长城的东端起点，依山傍海，地势险要，自古为兵家必争之地。' },
  niaolei: { name: '观鸟胜地', icon: '🦅', desc: '秦皇岛是东亚-澳大利西亚候鸟迁徙通道上的重要驿站，每年春秋两季有大量候鸟途经此地，鸽子窝公园是著名的观鸟点。' }
}

export const SOUVENIRS = {
  s_shanhaiguan: { name: '天下第一关模型', icon: '🏰', desc: '游览山海关后获得。' },
  s_laolongtou: { name: '老龙头纪念章', icon: '🐉', desc: '在老龙头观看海上日出获得。' },
  s_greatwall: { name: '长城砖纪念品', icon: '🧱', desc: '完成长城探索任务获得。' },
  s_shell: { name: '贝壳工艺品', icon: '🐚', desc: '在北戴河海滨购买或完成海滨任务获得。', price: 35 },
  s_putao: { name: '昌黎葡萄酒', icon: '🍷', desc: '在昌黎品尝葡萄后获得。', price: 68 },
  s_caocao: { name: '观沧海书法', icon: '📜', desc: '在碣石山欣赏曹操诗碑获得。' },
  s_sunrise: { name: '日出明信片套装', icon: '🌅', desc: '在鸽子窝观看日出获得。' },
  s_badge: { name: '秦皇岛旅行纪念章', icon: '🏅', desc: '完成新手旅行任务获得。' },
  s_maopoem: { name: '浪淘沙·北戴河', icon: '📖', desc: '在鸽子窝欣赏毛泽东诗碑获得。' },
  s_seafood: { name: '"渤海鲜味"金筷子', icon: '🥢', desc: '品尝6种秦皇岛海鲜。' },
  s_culture: { name: '长城文化达人证书', icon: '📕', desc: '解锁6项秦皇岛文化。' },
  s_haigang: { name: '海港区徽章', icon: '⚓', desc: '完成海港区探索任务。' },
  s_shanhaiguan_badge: { name: '山海关徽章', icon: '🏯', desc: '完成山海关区探索任务。' },
  s_beidaihe_badge: { name: '北戴河徽章', icon: '🏖️', desc: '完成北戴河区海滨度假任务。' },
  s_zushan: { name: '祖山登顶徽章', icon: '⛰️', desc: '登上祖山天女峰。' },
  s_jieshi: { name: '碣石山徽章', icon: '🏔️', desc: '游览碣石山仙台顶。' },
  s_tshirt: { name: '"我爱秦皇岛"T恤', icon: '👕', desc: '海滨商店有售。', price: 59 },
  s_postcard: { name: '秦皇岛明信片', icon: '🖼️', desc: '各景点纪念品店有售。', price: 15 },
  s_cable: { name: '联峰山索道纪念票', icon: '🚡', desc: '乘坐联峰山索道获得。' },
  s_seacable: { name: '跨海索道纪念票', icon: '🎟️', desc: '乘坐仙螺岛跨海索道获得。' },
  s_xianluodao: { name: '仙螺岛贝壳挂件', icon: '🐚', desc: '游览仙螺岛获得。', price: 25 },
  s_card: { name: '轨道交通纪念卡', icon: '🎫', desc: '乘坐轨道交通获得。' },
  s_cruise: { name: '渤海游船纪念票', icon: '🚢', desc: '乘坐渤海游船获得。' }
}

export const SHOPS = {
  seafood: { name: '海鲜大排档', greet: '老板，来点新鲜海鲜吧！刚打捞上来的！', items: ['pipixia', 'pangxie', 'shanbie'] },
  haixian: { name: '渔家海鲜馆', greet: '欢迎光临！我们的海参是渤海野生的！', items: ['haixian', 'haican'] },
  snack: { name: '小吃一条街', greet: '烤冷面、锅贴、烤玉米，样样美味！', items: ['kaolengmian', 'guotie', 'kaoyumi'] },
  fengezi: { name: '粉鸽子老店', greet: '正宗秦皇岛粉鸽子，吃过都说好！', items: ['fengezi'] },
  putao: { name: '昌黎葡萄园', greet: '尝尝我们的玫瑰香葡萄，特甜！', items: ['putao'] },
  souvenir: { name: '景区纪念品店', greet: '带点纪念品回家吧！', items: ['s_shell', 's_postcard'] },
  shanhaiguan: { name: '山海关纪念品店', greet: '欢迎来到天下第一关！', items: ['s_greatwall', 's_putao'] },
  mall: { name: '海滨商城', greet: '欢迎光临海滨商城！', items: ['s_tshirt', 'pipixia'] },
  xianluodao_seafood: { name: '仙螺岛海鲜餐厅', greet: '岛上的海鲜，鲜掉眉毛！', items: ['pipixia', 'pangxie', 'haican', 's_xianluodao'] }
}
SOUVENIRS.s_greatwall.price = 88

// ---------- 任务 ----------
export const NOVICE = [
  { id: 'n1', title: '拍摄山海关', desc: '前往山海关区，用相机（C键）拍下"天下第一关"。', cond: { type: 'photo', id: 'shanhaiguan' }, reward: { money: 100 } },
  { id: 'n2', title: '探访老龙头', desc: '前往老龙头，观看万里长城入海处。', cond: { type: 'discover', id: 'laolongtou' }, reward: { money: 100, item: 's_laolongtou' } },
  { id: 'n3', title: '品尝海鲜', desc: '到北戴河的海鲜大排档，品尝一份皮皮虾。', cond: { type: 'buy', id: 'pipixia' }, reward: { money: 80 } },
  { id: 'n4', title: '完成秦皇岛旅行', desc: '在鸽子窝公园观看日出，感受"大雨落幽燕"的意境。', cond: { type: 'view', id: 'geziwo_sunrise' }, reward: { money: 300, item: 's_badge' } }
]

export const QUESTS = [
  { id: 'q_shanhaiguan', district: 'shanhaiguan', title: '山海关·长城探索', desc: '拍摄山海关区3处长城景点', cond: { type: 'photoSet', ids: ['shanhaiguan', 'firstpass', 'laolongtou'], n: 3 }, reward: { money: 200, item: 's_shanhaiguan_badge' } },
  { id: 'q_beidaihe', district: 'beidaihe', title: '北戴河·海滨度假', desc: '拍摄北戴河海滨、鸽子窝、联峰山、南戴河', cond: { type: 'photoSet', ids: ['beidaihe', 'geziwo', 'lianfengshan', 'nandaihe'], n: 4 }, reward: { money: 200, item: 's_beidaihe_badge' } },
  { id: 'q_haigang', district: 'haigang', title: '海港·城市探索', desc: '拍摄秦皇岛港、奥林匹克公园、野生动物园、乐岛', cond: { type: 'photoSet', ids: ['qinhuangdaoport', 'olympicpark', 'wildzoo', 'ledao'], n: 4 }, reward: { money: 200, item: 's_haigang' } },
  { id: 'q_zushan', district: 'qinglong', title: '祖山·登高望远', desc: '登上祖山天女峰', cond: { type: 'view', id: 'zushan_peak' }, reward: { money: 200, item: 's_zushan' } },
  { id: 'q_jieshi', district: 'changli', title: '碣石·曹操观海', desc: '游览碣石山并欣赏《观沧海》诗碑', cond: { type: 'multi', parts: [{ type: 'view', id: 'jieshi_peak' }, { type: 'culture', id: 'caocaopoem' }] }, reward: { money: 250, item: 's_jieshi' } },
  { id: 'q_food', title: '渤海鲜味', desc: '品尝6种不同的秦皇岛美食', cond: { type: 'foodCount', n: 6 }, reward: { money: 150, item: 's_seafood' } },
  { id: 'q_culture', title: '长城文化达人', desc: '解锁6项秦皇岛文化图鉴', cond: { type: 'cultureCount', n: 6 }, reward: { money: 150, item: 's_culture' } }
]

export const DAILY_POOL = [
  { id: 'd_photo3', title: '今天拍摄3个景点', cond: { type: 'dailyPhotos', n: 3 }, reward: { money: 60 } },
  { id: 'd_npc5', title: '找到5个NPC聊天', cond: { type: 'dailyTalk', n: 5 }, reward: { money: 50 } },
  { id: 'd_district', title: '探索一个新区', cond: { type: 'dailyDistricts', n: 2 }, reward: { money: 60 } },
  { id: 'd_bus', title: '乘坐一次观光巴士', cond: { type: 'dailyCount', key: 'bus', n: 1 }, reward: { money: 40 } },
  { id: 'd_metro', title: '乘坐一次轨道交通', cond: { type: 'dailyCount', key: 'metro', n: 1 }, reward: { money: 40 } },
  { id: 'd_food2', title: '品尝2种美食', cond: { type: 'dailyCount', key: 'food', n: 2 }, reward: { money: 50 } },
  { id: 'd_sunrise', title: '观看一次日出', cond: { type: 'dailyCount', key: 'sunrise', n: 1 }, reward: { money: 50 } },
  { id: 'd_walk', title: '步行1000米', cond: { type: 'dailyCount', key: 'walk', n: 1000 }, reward: { money: 40 } },
  { id: 'd_culture', title: '体验一项文化', cond: { type: 'dailyCount', key: 'culture', n: 1 }, reward: { money: 50 } },
  { id: 'd_selfie', title: '拍一张自拍', cond: { type: 'dailyCount', key: 'selfie', n: 1 }, reward: { money: 30 } }
]

// ---------- NPC ----------
export const NPC_TYPES = {
  office: { name: '上班族', weight: 2 },
  student: { name: '学生', weight: 2 },
  elder: { name: '老人', weight: 2 },
  tourist: { name: '游客', weight: 4 },
  kid: { name: '小孩', weight: 1 },
  local: { name: '渔民', weight: 2 },
  fisherman: { name: '海边摊贩', weight: 2 }
}

export const SURNAMES = ['王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '马', '朱', '胡']
export const NICK = { office: ['先生', '女士', '经理'], student: ['同学'], elder: ['大爷', '奶奶', '叔叔', '阿姨'], tourist: ['游客'], kid: ['小朋友', '小妹妹'], local: ['大哥', '大姐'], fisherman: ['老板', '老板娘'] }

export const DIALOG = {
  office: ['秦皇岛空气真好，周末来度假太舒服了。', '海港这边工作还行，就是冬天有点冷。', '下班后去海边走走，看看夕阳，挺惬意的。', '你知道吗？秦皇岛港可是世界最大的煤炭输出港。', '北戴河真不愧是避暑胜地，夏天太凉快了。'],
  student: ['暑假来北戴河玩，海水好清凉！', '老师说曹操在碣石山写的《观沧海》，特别有名。', '我们学校组织来山海关研学，长城太壮观了！', '你去过祖山吗？听说那里有瀑布！', '海边的烤玉米超好吃！'],
  elder: ['我小时候这里还没这么多游客呢。', '北戴河以前是领导人避暑的地方，现在大家都能来了。', '山海关是万里长城起点，你一定要去看看。', '老龙头那边风景好，早上去能看日出。', '秦皇岛因为秦始皇得名的，知道不？', '以前赶海能捡到好多海鲜。'],
  tourist: ['第一次来秦皇岛，要去哪里玩？', '山海关"天下第一关"太震撼了！', '北戴河的沙滩真细腻，海水也干净。', '听说鸽子窝公园看日出最好？', '能帮我拍张照吗？谢谢～', '这边的海鲜好新鲜啊！', '南戴河的滑沙太刺激了！'],
  kid: ['我想吃皮皮虾！', '哥哥姐姐，你见过长城吗？好长好长！', '爸爸说明天带我去看海豚表演！', '沙滩城堡，我搭的！'],
  local: ['秦皇岛是个好地方，依山傍海，风水宝地。', '夏天来旅游的人可多了，冬天就冷清些。', '想吃新鲜海鲜？去北戴河渔码头！', '渤海的皮皮虾，个大肉肥。', '赶海的话早上去，能捞到不少好东西。'],
  fisherman: ['来来来，看看新鲜的海货！', '皮皮虾、螃蟹、扇贝，样样新鲜！', '这个季节的蟹最肥了！', '老板要点啥？给你便宜点！']
}

export const WEATHER_LINES = {
  rain: ['下雨了，海边风大，注意安全！', '雨天海边别玩水，浪大危险。', '下雨天在屋里吃海鲜也挺好的。'],
  typhoon: ['台风来了！大家快回酒店避风！', '海边禁止下水，注意安全！'],
  night: ['夜晚的海边好浪漫，听着海浪声。', '晚上去海边散步？小心脚下。', '夜里海风凉，多穿点。']
}

export const LANDMARK_LINES = {
  shanhaiguan: ['山海关是万里长城东端起点！', '"天下第一关"这五个大字，每个字都有一米多高。', '山海关古城保存得很完整，值得逛一逛。'],
  laolongtou: ['老龙头是长城唯一入海的地方！', '清晨来这看日出，绝了！', '澄海楼上看海，视野特别好。'],
  beidaihe: ['北戴河的沙滩是金色的，特别细。', '夏天来北戴河避暑，凉快！', '这里是中国最早的海滨度假地之一。'],
  geziwo: ['毛主席在这写过《浪淘沙·北戴河》！', '鸽子窝看日出是北戴河必打卡的。', '礁石像鸽子一样，所以叫鸽子窝。'],
  jieshi: ['东临碣石，以观沧海！曹操写的。', '碣石山是秦皇岛的文化名山。']
}
