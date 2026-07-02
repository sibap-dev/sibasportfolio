import { useState, useEffect } from 'react'
import { fetchDoc } from '../firebase'

const CACHE_KEY_PREFIX = 'newport_cache_'

function getCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setCache(key, value) {
  try {
    localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(value))
  } catch {
    // localStorage full or unavailable
  }
}

export function useFirebaseData(collectionName) {
  const [data, setData] = useState(getCache(collectionName))
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchDoc(collectionName).then((result) => {
      if (!cancelled) {
        if (result) {
          setCache(collectionName, result)
        }
        setData(result)
        setDone(true)
      }
    })
    return () => { cancelled = true }
  }, [collectionName])

  return { data, done }
}