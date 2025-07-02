export class Persist {
  name: string
  prefix: string
  cache: Record<string, { ttl: number; value: any }> = {}

  constructor(name: string) {
    this.name = name
    this.prefix = name + '#'
    this.cache = this.getCache()
  }

  private getCache() {
    const cache: Record<string, { ttl: number; value: any }> = {}

    const res = uni.getStorageInfoSync()

    for (let i = 0; i < res.keys.length; i++) {
      const key = res.keys[i]
      if (key && key.startsWith(this.prefix)) {
        const value = uni.getStorageSync(key)
        if (value) {
          try {
            const result = JSON.parse(value)
            if (
              result &&
              typeof result === 'object' &&
              !Array.isArray(result)
            ) {
              cache[key] = result
            }
          } catch {
            void 0
          }
        }
      }
    }

    return cache
  }

  private save(fullKey?: string) {
    if (fullKey) {
      if (fullKey in this.cache) {
        uni.setStorageSync(fullKey, JSON.stringify(this.cache[fullKey]))
      } else {
        uni.removeStorageSync(fullKey)
      }
    } else {
      const res = uni.getStorageInfoSync()

      for (let i = 0; i < res.keys.length; i++) {
        const key = res.keys[i]
        if (key && key.startsWith(this.prefix)) {
          if (!(key in this.cache)) {
            uni.removeStorageSync(key)
            i--
          }
        }
      }

      Object.keys(this.cache).forEach((key) => {
        uni.setStorageSync(key, JSON.stringify(this.cache[key]))
      })
    }
  }

  get(key: string): any {
    const item = this.cache[this.prefix + key]
    if (item) {
      if (item.ttl > 0 && item.ttl < Date.now()) {
        this.remove(key)
      } else {
        return item.value
      }
    }
  }

  set(key: string, value: any, ttl = 0) {
    const fullKey = this.prefix + key
    this.cache[fullKey] = {
      ttl: ttl > 0 ? ttl * 1000 + Date.now() : 0,
      value,
    }
    this.save(fullKey)
  }

  remove(key: string) {
    const fullKey = this.prefix + key
    if (fullKey in this.cache) {
      delete this.cache[fullKey]
      this.save(fullKey)
    }
  }

  clear() {
    this.cache = {}
    this.save()
  }
}
