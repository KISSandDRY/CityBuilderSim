import { createContext, useContext, useReducer } from 'react'
import {
  INITIAL_MAP,
  INITIAL_MATERIALS,
  WORKER_NAMES,
  BUILD_TYPES,
  UPGRADE_CONFIG,
  getBaseType,
  getLevel,
} from '../data/constants'

const initialState = {
  budget:          250000,
  budgetSpent:     0,
  population:      1240,
  happiness:       87,
  objects:         18,
  day:             1,
  cityMap:         [...INITIAL_MAP],
  selectedMapIdx:  null,
  materials:       structuredClone(INITIAL_MATERIALS),
  workers: {
    total:  20,
    active: 0,
    names:  [...WORKER_NAMES],
  },
  constructions: [],
  buildLog: [
    { day: 1, msg: '🏘️ City founded' },
  ],
}

function countActiveWorkers(constructions) {
  return constructions.reduce((sum, c) => sum + c.workers, 0)
}

function calcDailyIncome(cityMap) {
  const incomeByType = { house: 500, house_lv2: 900, house_lv3: 1400, biz: 1200, biz_lv2: 2200, biz_lv3: 3500, factory: 2000, factory_lv2: 3800 }
  return cityMap.reduce((sum, cell) => sum + (incomeByType[cell] ?? 0), 0)
}

function cityReducer(state, action) {
  switch (action.type) {

    case 'SELECT_MAP_CELL': {
      return { ...state, selectedMapIdx: action.payload }
    }

    case 'BUILD_OBJECT': {
      const { buildType, name, workers, days } = action.payload
      const cost = buildType.cost + workers * days * 500 + Math.round(buildType.cost * 0.4)

      const newMaterials = structuredClone(state.materials)
      for (const [key, needed] of Object.entries(buildType.req)) {
        if (newMaterials[key]) newMaterials[key].amount -= needed
      }

      const newMap = [...state.cityMap]
      const targetIdx = (state.selectedMapIdx !== null && (newMap[state.selectedMapIdx] === 'grass' || newMap[state.selectedMapIdx] === 'empty'))
        ? state.selectedMapIdx
        : newMap.findIndex(t => t === 'empty' || t === 'grass')

      if (targetIdx !== -1) newMap[targetIdx] = 'construction'

      const newConstruction = {
        id:         Date.now(),
        name,
        type:       buildType.type,
        icon:       buildType.icon,
        mapIdx:     targetIdx,
        workers,
        daysLeft:   days,
        daysTotal:  days,
        popBonus:   buildType.popBonus   ?? 0,
        happyBonus: buildType.happyBonus ?? 0,
      }

      const newConstructions = [...state.constructions, newConstruction]

      return {
        ...state,
        budget:          state.budget - cost,
        budgetSpent:     state.budgetSpent + cost,
        selectedMapIdx:  null,
        cityMap:         newMap,
        materials:       newMaterials,
        constructions:   newConstructions,
        workers: {
          ...state.workers,
          active: countActiveWorkers(newConstructions),
        },
        buildLog: [
          { day: state.day, msg: `${buildType.icon} "${name}" — construction started (${days} days)` },
          ...state.buildLog,
        ],
      }
    }

    case 'NEXT_DAY': {
      const newDay   = state.day + 1
      const newMap   = [...state.cityMap]
      const newLog   = []
      let popBonus      = 0
      let happyBonus    = 0
      let finishedCount = 0

      const updatedConstructions = []
      for (const c of state.constructions) {
        const daysLeft = c.daysLeft - 1
        if (daysLeft <= 0) {
          newMap[c.mapIdx] = c.type
          popBonus      += c.popBonus
          happyBonus    += c.happyBonus
          finishedCount++
          newLog.push({ day: newDay, msg: `✅ "${c.name}" completed! Workers (${c.workers}) released.` })
        } else {
          updatedConstructions.push({ ...c, daysLeft })
        }
      }

      const dailyIncome       = calcDailyIncome(newMap)
      const workerWages        = countActiveWorkers(updatedConstructions) * 500
      const dailyNet           = dailyIncome - workerWages

      if (newLog.length === 0) {
        newLog.push({ day: newDay, msg: `📅 Day ${newDay} — income +${dailyIncome.toLocaleString()} ₴, wages -${workerWages.toLocaleString()} ₴` })
      } else {
        newLog.push({ day: newDay, msg: `💰 Daily income: +${dailyIncome.toLocaleString()} ₴` })
      }

      return {
        ...state,
        day:           newDay,
        budget:        state.budget + dailyNet,
        cityMap:       newMap,
        objects:       state.objects + finishedCount,
        population:    state.population + popBonus,
        happiness:     Math.min(100, state.happiness + happyBonus),
        constructions: updatedConstructions,
        workers: {
          ...state.workers,
          active: countActiveWorkers(updatedConstructions),
        },
        buildLog: [
          ...newLog,
          ...state.buildLog,
        ],
      }
    }

    case 'DEMOLISH': {
      const { mapIdx } = action.payload
      const type       = state.cityMap[mapIdx]
      const baseType   = getBaseType(type)

      const demolishable = ['house', 'biz', 'factory', 'park']
      if (!demolishable.includes(baseType)) return state

      const newMap = [...state.cityMap]
      newMap[mapIdx] = 'grass'

      const bt           = BUILD_TYPES.find(b => b.type === baseType)
      const newMaterials = structuredClone(state.materials)
      if (bt) {
        for (const [key, amount] of Object.entries(bt.req)) {
          if (newMaterials[key]) {
            newMaterials[key].amount = Math.min(
              newMaterials[key].max,
              newMaterials[key].amount + Math.floor(amount * 0.5)
            )
          }
        }
      }

      return {
        ...state,
        cityMap:   newMap,
        materials: newMaterials,
        objects:   state.objects - 1,
        buildLog: [
          { day: state.day, msg: `🔨 ${CELL_LABELS[type] ?? 'Building'} demolished. 50% materials returned.` },
          ...state.buildLog,
        ],
      }
    }

    case 'HIRE_WORKER': {
      const cost = 10000
      return {
        ...state,
        budget:      state.budget - cost,
        budgetSpent: state.budgetSpent + cost,
        workers: {
          ...state.workers,
          total: state.workers.total + 1,
          names: [...state.workers.names, `Worker ${state.workers.total + 1}`],
        },
        buildLog: [
          { day: state.day, msg: '👷 New worker hired for 10,000 ₴' },
          ...state.buildLog,
        ],
      }
    }

    case 'FIRE_WORKER': {
      const newNames = [...state.workers.names]
      newNames.pop()
      return {
        ...state,
        workers: {
          ...state.workers,
          total: state.workers.total - 1,
          names: newNames,
        },
      }
    }

    case 'UPGRADE_OBJECT': {
      const { mapIdx }  = action.payload
      const currentType = state.cityMap[mapIdx]
      const baseType    = getBaseType(currentType)
      const currentLvl  = getLevel(currentType)
      const cfg         = UPGRADE_CONFIG[baseType]

      if (!cfg) return state
      if (currentLvl >= cfg.levels.length - 1) return state

      const nextLevel = cfg.levels[currentLvl + 1]

      if (state.budget < cfg.upgradeCost) return state
      const newMaterials = structuredClone(state.materials)
      for (const [key, needed] of Object.entries(cfg.upgradeReq)) {
        if (!newMaterials[key] || newMaterials[key].amount < needed) return state
        newMaterials[key].amount -= needed
      }

      const newMap = [...state.cityMap]
      newMap[mapIdx] = nextLevel.type

      return {
        ...state,
        budget:      state.budget - cfg.upgradeCost,
        budgetSpent: state.budgetSpent + cfg.upgradeCost,
        happiness:   Math.min(100, state.happiness + (cfg.happyBonus ?? 0)),
        cityMap:     newMap,
        materials:   newMaterials,
        buildLog: [
          { day: state.day, msg: `⬆️ Building upgraded to ${nextLevel.label}! -${cfg.upgradeCost.toLocaleString()} ₴` },
          ...state.buildLog,
        ],
      }
    }

    case 'ADD_MATERIAL': {
      const { key, name, icon, unit, amount, max } = action.payload
      if (state.materials[key]) return state
      return {
        ...state,
        materials: {
          ...state.materials,
          [key]: { name, icon, unit, amount, max },
        },
      }
    }

    default:
      return state
  }
}

const CELL_LABELS = {
  house: 'House', house_lv2: 'House Lv.2', house_lv3: 'House Lv.3',
  biz: 'Business', biz_lv2: 'Business Lv.2', biz_lv3: 'Business Lv.3',
  factory: 'Factory', factory_lv2: 'Factory Lv.2',
  park: 'Park', park_lv2: 'Park Lv.2',
}

const CityContext = createContext(null)

export function CityProvider({ children }) {
  const [state, dispatch] = useReducer(cityReducer, initialState)
  return (
    <CityContext.Provider value={{ state, dispatch }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  const ctx = useContext(CityContext)
  if (!ctx) throw new Error('useCity must be used inside CityProvider')
  return ctx
}
