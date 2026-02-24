export const INITIAL_MAP = [
  'grass','house','house','road','biz','biz','road','house','house','park','road','house','grass','water',
  'grass','house','house','road','biz','biz','road','house','house','park','road','house','grass','water',
  'road','road','road','road','road','road','road','road','road','road','road','road','road','water',
  'grass','park','park','road','house','house','road','factory','factory','grass','road','biz','biz','water',
  'grass','park','park','road','house','house','road','factory','factory','grass','road','biz','biz','water',
  'road','road','road','road','road','road','road','road','road','road','road','road','road','water',
  'grass','house','biz','road','park','house','road','house','house','biz','road','park','grass','water',
  'grass','house','biz','road','park','house','road','house','house','biz','road','park','grass','water',
  'grass','grass','grass','road','grass','grass','road','grass','grass','grass','road','grass','grass','water',
  'grass','grass','grass','road','grass','grass','road','grass','grass','grass','road','grass','grass','water',
]

export const MAP_COLS = 14
export const MAP_ROWS = 10

export const CELL_CONFIG = {
  empty:        { icon: '',   label: 'Empty plot',        bg: '#0a1422' },
  grass:        { icon: '',   label: 'Grass',             bg: '#0c1e0c' },
  water:        { icon: '💧', label: 'Water',             bg: '#091525' },
  road:         { icon: '',   label: 'Road',              bg: '#181818' },
  house:        { icon: '🏠', label: 'Residential House', bg: '#101c30' },
  house_lv2:    { icon: '🏡', label: 'House (Level 2)',   bg: '#152040' },
  house_lv3:    { icon: '🏰', label: 'House (Level 3)',   bg: '#1a2850' },
  biz:          { icon: '🏢', label: 'Business',          bg: '#1a1008' },
  biz_lv2:      { icon: '🏬', label: 'Business (Level 2)', bg: '#251508' },
  biz_lv3:      { icon: '🏦', label: 'Business (Level 3)', bg: '#301a08' },
  park:         { icon: '🌳', label: 'Park',              bg: '#0d1f0d' },
  park_lv2:     { icon: '🌲', label: 'Park (Level 2)',    bg: '#102510' },
  factory:      { icon: '🏭', label: 'Factory',           bg: '#1a120a' },
  factory_lv2:  { icon: '⚙️', label: 'Factory (Level 2)', bg: '#201808' },
  construction: { icon: '🏗️', label: 'Under construction', bg: '#1a1500' },
}

export const MAP_LEGEND = [
  { type: 'house',        label: '🏠 House',         color: '#101c30' },
  { type: 'road',         label: '🛣️ Road',          color: '#181818' },
  { type: 'biz',          label: '🏢 Business',       color: '#1a1008' },
  { type: 'park',         label: '🌳 Park',           color: '#0d1f0d' },
  { type: 'water',        label: '💧 Water',          color: '#091525' },
  { type: 'factory',      label: '🏭 Factory',        color: '#1a120a' },
  { type: 'construction', label: '🏗️ Building',      color: '#1a1500' },
]

export const CATEGORIES = [
  { id: 'all',         label: 'All'            },
  { id: 'residential', label: '🏠 Residential' },
  { id: 'commercial',  label: '🏢 Commercial'  },
  { id: 'industrial',  label: '🏭 Industrial'  },
  { id: 'green',       label: '🌳 Green'       },
]

export const BUILD_TYPES = [
  {
    type: 'house',
    category: 'residential',
    icon: '🏠',
    name: 'Residential House',
    cost: 50000,
    req: { cement: 80, brick: 120, wood: 40 },
    workers: 4,
    days: 30,
    popBonus: 80,
    happyBonus: 0,
    incomePerDay: 500,
  },
  {
    type: 'biz',
    category: 'commercial',
    icon: '🏢',
    name: 'Business',
    cost: 80000,
    req: { cement: 100, steel: 80, glass: 60 },
    workers: 6,
    days: 45,
    popBonus: 0,
    happyBonus: 0,
    incomePerDay: 1200,
  },
  {
    type: 'factory',
    category: 'industrial',
    icon: '🏭',
    name: 'Factory',
    cost: 120000,
    req: { cement: 150, steel: 200, brick: 80 },
    workers: 10,
    days: 60,
    popBonus: 0,
    happyBonus: -1,
    incomePerDay: 2000,
  },
  {
    type: 'park',
    category: 'green',
    icon: '🌳',
    name: 'Park',
    cost: 15000,
    req: { wood: 30, sand: 20 },
    workers: 2,
    days: 10,
    popBonus: 0,
    happyBonus: 3,
    incomePerDay: 0,
  },
  {
    type: 'road',
    category: 'industrial',
    icon: '🛣️',
    name: 'Road',
    cost: 20000,
    req: { cement: 60, sand: 80 },
    workers: 3,
    days: 14,
    popBonus: 0,
    happyBonus: 0,
    incomePerDay: 0,
  },
]

export const UPGRADE_CONFIG = {
  house: {
    levels: [
      { type: 'house',     icon: '🏠', label: 'Level 1', popBonus: 80,  incomePerDay: 500  },
      { type: 'house_lv2', icon: '🏡', label: 'Level 2', popBonus: 160, incomePerDay: 900  },
      { type: 'house_lv3', icon: '🏰', label: 'Level 3', popBonus: 280, incomePerDay: 1400 },
    ],
    upgradeCost: 30000,
    upgradeReq:  { cement: 40, brick: 60, wood: 20 },
    happyBonus:  1,
  },
  biz: {
    levels: [
      { type: 'biz',     icon: '🏢', label: 'Level 1', incomePerDay: 1200 },
      { type: 'biz_lv2', icon: '🏬', label: 'Level 2', incomePerDay: 2200 },
      { type: 'biz_lv3', icon: '🏦', label: 'Level 3', incomePerDay: 3500 },
    ],
    upgradeCost: 50000,
    upgradeReq:  { cement: 60, steel: 40, glass: 30 },
    happyBonus:  0,
  },
  park: {
    levels: [
      { type: 'park',     icon: '🌳', label: 'Level 1', happyBonus: 3 },
      { type: 'park_lv2', icon: '🌲', label: 'Level 2', happyBonus: 7 },
    ],
    upgradeCost: 10000,
    upgradeReq:  { wood: 20, sand: 10 },
    happyBonus:  4,
  },
  factory: {
    levels: [
      { type: 'factory',     icon: '🏭', label: 'Level 1', incomePerDay: 2000 },
      { type: 'factory_lv2', icon: '⚙️', label: 'Level 2', incomePerDay: 3800 },
    ],
    upgradeCost: 70000,
    upgradeReq:  { steel: 120, cement: 80 },
    happyBonus:  -1,
  },
}

export function getBaseType(type) {
  if (type.includes('_lv')) return type.split('_lv')[0]
  return type
}

export function getLevel(type) {
  if (type.includes('_lv')) return parseInt(type.split('_lv')[1]) - 1
  return 0
}

export const INITIAL_MATERIALS = {
  cement: { name: 'Cement', icon: '🏗️', amount: 500, max: 1000 },
  brick:  { name: 'Brick',  icon: '🧱', amount: 800, max: 1000 },
  steel:  { name: 'Steel',  icon: '⚙️', amount: 350, max: 600  },
  wood:   { name: 'Wood',   icon: '🌲', amount: 200, max: 400  },
  glass:  { name: 'Glass',  icon: '🪟', amount: 120, max: 300  },
  sand:   { name: 'Sand',   icon: '🏜️', amount: 900, max: 1000 },
}

export const WORKER_NAMES = [
  'John Smith',     'Peter Miller',    'Alex Johnson',
  'William Brown',  'Nicholas Taylor', 'Andrew Wilson',
  'Steven Clark',   'Daniel Lewis',    'Oliver Harris',
  'Thomas Martin',  'George Thompson', 'Robert Garcia',
  'Max Anderson',   'Arthur White',    'Russell Moore',
  'Eugene Jackson', 'Victor Davis',    'Paul Martinez',
  'Brandon Lee',    'Nathan King',
]

export const FINANCE_ROWS = [
  { label: '📈 Business income',  type: 'income',  amount: 15000 },
  { label: '🏠 Rent revenue',     type: 'income',  amount: 8500  },
  { label: '🏭 Factory output',   type: 'income',  amount: 12000 },
  { label: '🛣️ Road maintenance', type: 'expense', amount: 2000  },
  { label: '💡 Utilities',        type: 'expense', amount: 3500  },
]
