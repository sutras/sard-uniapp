import {
  chainGet,
  isBoolean,
  isEmptyValue,
  isFunction,
  isNumber,
  isString,
  toArray,
} from '../utils'
import getUrlRegexp from './getUrlRegexp'

export interface ValidateMessages {
  default?: string
  required?: string
  enum?: string
  whitespace?: string
  date?: {
    format?: string
    parse?: string
    invalid?: string
  }
  types?: {
    string?: string
    function?: string
    array?: string
    object?: string
    number?: string
    date?: string
    boolean?: string
    integer?: string
    float?: string
    regexp?: string
    email?: string
    url?: string
    hex?: string
  }
  string?: {
    len?: string
    min?: string
    max?: string
    range?: string
  }
  number?: {
    len?: string
    min?: string
    max?: string
    range?: string
  }
  array?: {
    len?: string
    min?: string
    max?: string
    range?: string
  }
  pattern?: {
    mismatch?: string
  }
}

export interface Rule {
  validator?: (
    value: any,
    rule: Rule,
  ) => Promise<any> | boolean | string | undefined
  pattern?: RegExp
  message?: string | (() => string)
  trigger?: string | string[]
  transform?: (value: any) => any
  type?: keyof typeof typeStrategies
  enum?: (string | number)[]
  len?: number
  max?: number
  min?: number
  required?: boolean
  whitespace?: boolean
}

export interface ValidateOptions {
  validateFirst?: boolean
  value?: any
  name?: string | number | (string | number)[]
  label?: string
  trigger?: string | string[]
}

export type VdaliteFailResult = string[]

function getMessage(message: Rule['message']) {
  return isFunction(message) ? message() : message
}

function handleRange(len: number, type: string, rule: Rule) {
  if (isNumber(rule.len)) {
    return len !== rule.len ? `${type}.len` : true
  } else if (isNumber(rule.min) && isNumber(rule.max)) {
    return len < rule.min || len > rule.max ? `${type}.range` : true
  } else if (isNumber(rule.min)) {
    return len < rule.min ? `${type}.min` : true
  } else if (isNumber(rule.max)) {
    return len > rule.max ? `${type}.max` : true
  } else {
    return true
  }
}

const typeStrategies = {
  string(value: any, rule: Rule) {
    if (isString(value)) {
      return handleRange(value.length, 'string', rule)
    } else {
      return false
    }
  },
  number(value: any, rule: Rule) {
    if (isNumber(value)) {
      return handleRange(value, 'number', rule)
    } else {
      return false
    }
  },
  integer(value: any, rule: Rule) {
    if (Number.isInteger(value)) {
      return handleRange(value as number, 'number', rule)
    } else {
      return false
    }
  },
  float(value: any, rule: Rule) {
    if (Number.isFinite(value) && (value as number) % 1 !== 0) {
      return handleRange(value as number, 'number', rule)
    } else {
      return false
    }
  },
  boolean(value: any) {
    return isBoolean(value)
  },
  function(value: any) {
    return isFunction(value)
  },
  regexp(value: any) {
    if (isString(value)) {
      try {
        new RegExp(value)
        return true
      } catch {
        return false
      }
    } else {
      return value instanceof RegExp
    }
  },
  array(value: any, rule: Rule) {
    if (Array.isArray(value)) {
      return handleRange(value.length, 'number', rule)
    } else {
      return false
    }
  },
  object(value: any) {
    return value && typeof value === 'object' && !Array.isArray(value)
  },
  enum(value: any, rule: Rule) {
    return rule.enum?.includes(value) ? true : 'enum'
  },
  date(value: any) {
    return value instanceof Date
  },
  url(value: any) {
    return isString(value) && getUrlRegexp().test(value)
  },
  hex(value: any) {
    return isString(value) && /^#(?:[0-9A-F]{6}|[0-9A-F]{3})$/i.test(value)
  },
  email(value: any) {
    return (
      isString(value) &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value,
      )
    )
  },
}

export class Validator {
  protected validateMessages: ValidateMessages | undefined = undefined

  public setValidateMessages(validateMessages: ValidateMessages) {
    this.validateMessages = validateMessages
  }

  public getValidTriggerRules(rules: Rule[], trigger?: string | string[]) {
    let validRules = rules

    if (trigger) {
      const validTrigger = toArray(trigger)
      validRules = rules.filter(Boolean).filter((rule) => {
        let { trigger: ruleTrigger } = rule
        if (!ruleTrigger) {
          return true
        }
        ruleTrigger = toArray(ruleTrigger)
        return validTrigger.some((name) =>
          (ruleTrigger as string[]).includes(name),
        )
      })
    }

    return validRules
  }

  public validate(rules: Rule[], options: ValidateOptions = {}) {
    const { validateFirst, value } = options

    return new Promise<void>((resolve, reject) => {
      if (validateFirst) {
        Promise.all(
          rules.map((rule) => {
            return this.validateRule(value, rule)
          }),
        )
          .then(() => {
            resolve()
          })
          .catch(({ error, rule }) => {
            reject([this.replaceSymbol(error, rule, options)])
          })
      } else {
        Promise.allSettled(
          rules.map((rule) => {
            return this.validateRule(value, rule)
          }),
        ).then((values) => {
          const rejected = values.filter(({ status }) => {
            return status === 'rejected'
          }) as PromiseRejectedResult[]

          if (rejected.length === 0) {
            resolve()
          } else {
            reject(
              rejected.map((result) => {
                const { error, rule } = result.reason
                return this.replaceSymbol(error, rule, options)
              }),
            )
          }
        })
      }
    })
  }

  protected validateRule(value: any, rule: Rule) {
    if (rule.transform) {
      value = rule.transform(value)
    }

    return new Promise<void>((resolve, reject) => {
      const handleReject = (error: any) => {
        reject({
          error,
          rule,
        })
      }

      // empty
      const isEmpty = isEmptyValue(value, rule.whitespace)

      if (isEmpty && !rule.validator) {
        if (rule.required) {
          handleReject(
            getMessage(rule.message) ||
              chainGet(this.validateMessages, 'required'),
          )
        } else {
          resolve()
        }
        return
      }

      // validator
      if (rule.validator) {
        const result = rule.validator(value, rule)
        if (result instanceof Promise) {
          result
            .then(() => {
              resolve()
            })
            .catch((error) => {
              handleReject(error)
            })
        } else if (result === true) {
          resolve()
        } else if (isString(result)) {
          handleReject(result)
        } else {
          handleReject(getMessage(rule.message))
        }
        return
      }

      // pattern
      if (rule.pattern instanceof RegExp) {
        const result = rule.pattern.test(String(value))
        if (result) {
          resolve()
        } else {
          handleReject(
            getMessage(rule.message) ||
              chainGet(this.validateMessages, 'pattern.mismatch'),
          )
        }
        return
      }

      // internal type
      let ruleType = rule.type
      if (
        !ruleType &&
        (isNumber(rule.min) || isNumber(rule.max) || isNumber(rule.len))
      ) {
        ruleType = 'string'
      }
      if (ruleType && Object.keys(typeStrategies).includes(ruleType)) {
        this.validateInternal(ruleType, value, rule)
          .then(() => {
            resolve()
          })
          .catch((err) => {
            handleReject(getMessage(rule.message) || err)
          })
        return
      }

      resolve()
    })
  }

  protected validateInternal(
    type: keyof typeof typeStrategies,
    value: any,
    rule: Rule,
  ) {
    return new Promise<void>((resolve, reject) => {
      const result = typeStrategies[type]?.(value, rule)
      if (result === true) {
        resolve()
      } else {
        reject(
          chainGet(
            this.validateMessages,
            isString(result) ? result : `types.${type}`,
          ),
        )
      }
    })
  }

  protected replaceSymbol(
    string: string | Error,
    rule: Rule,
    options: ValidateOptions = {},
  ) {
    if (string instanceof Error) {
      string = string.message
    }

    if (!isString(string)) {
      string = String(string)
    }

    const label = isString(options.label) ? options.label : String(options.name)

    const matches = {
      '${min}': rule.min,
      '${max}': rule.max,
      '${len}': rule.len,
      '${enum}': rule.enum,
      '${label}': label,
      '${value}': options.value,
      '${type}': rule.type,
      '${pattern}': rule.pattern?.toString(),
    }

    const regexp = /\$\{(?:min|max|len|enum|label|value|type|pattern)\}/g
    return string.replace(regexp, (m) => {
      return matches[m as keyof typeof matches] ?? ''
    })
  }
}
