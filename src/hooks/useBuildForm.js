import { useState, useMemo } from 'react'
import { useCity } from '../context/CityContext'
import { BUILD_TYPES } from '../data/constants'

export function useBuildForm() {
  const { state, dispatch } = useCity()

  const [selectedType, setSelectedType] = useState(null)
  const [form, setForm]   = useState({ name: '', workers: '', days: '' })
  const [notif, setNotif] = useState(null)

  const buildType = useMemo(
    () => BUILD_TYPES.find(b => b.type === selectedType) ?? null,
    [selectedType]
  )

  const cost = useMemo(() => {
    if (!buildType) return 0
    const w = parseInt(form.workers) || buildType.workers
    const d = parseInt(form.days)    || buildType.days
    return buildType.cost + w * d * 500 + Math.round(buildType.cost * 0.4)
  }, [buildType, form.workers, form.days])

  function handleSelectType(type) {
    setSelectedType(type)
    const bt = BUILD_TYPES.find(b => b.type === type)
    if (bt) {
      setForm(f => ({ ...f, workers: String(bt.workers), days: String(bt.days) }))
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function showNotif(msg, type) {
    setNotif({ msg, type })
    setTimeout(() => setNotif(null), 4000)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.name.trim()) { showNotif('❌ Enter object name!', 'error'); return }
    if (!selectedType)     { showNotif('❌ Select object type!', 'error'); return }

    const workers = parseInt(form.workers) || 0
    const days    = parseInt(form.days)    || 0

    if (workers <= 0) { showNotif('❌ Specify number of workers!', 'error'); return }
    if (days <= 0)    { showNotif('❌ Specify number of days!', 'error');    return }

    const freeWorkers = state.workers.total - state.workers.active
    if (workers > freeWorkers) {
      showNotif(`❌ Only ${freeWorkers} workers available`, 'error')
      return
    }

    if (state.budget < cost) {
      showNotif(`❌ Insufficient budget! Required: ${cost.toLocaleString()} ₴`, 'error')
      return
    }

    for (const [key, needed] of Object.entries(buildType.req)) {
      const mat = state.materials[key]
      if (mat && mat.amount < needed) {
        showNotif(`❌ Not enough: ${mat.name}!`, 'error')
        return
      }
    }

    dispatch({ type: 'BUILD_OBJECT', payload: { buildType, name: form.name.trim(), workers, days } })
    showNotif(`✅ "${form.name.trim()}" — construction started! Finishes in ${days} days.`, 'success')

    setForm({ name: '', workers: '', days: '' })
    setSelectedType(null)
  }

  function handleReset() {
    setForm({ name: '', workers: '', days: '' })
    setSelectedType(null)
    setNotif(null)
  }

  return {
    form, handleChange,
    selectedType, handleSelectType,
    buildType, cost,
    notif,
    handleSubmit, handleReset,
  }
}
