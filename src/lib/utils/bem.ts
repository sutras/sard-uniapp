export interface BemConfig {
  namespace: string
  blockSeparator: string
  elementSeparator: string
  modifierSeparator: string
}

const defaultBem = {
  namespace: 'sar',
  blockSeparator: '-',
  elementSeparator: '__',
  modifierSeparator: '_',
}

type IsType = boolean | number | string | null

export function createBemStruct(config: BemConfig) {
  const { namespace, blockSeparator, elementSeparator, modifierSeparator } =
    config

  return (block: string | number) => {
    const prefix = namespace + blockSeparator + block

    return {
      b() {
        return prefix
      },
      e(element: string | number | undefined, is?: IsType) {
        if (arguments.length === 2 && !is) {
          return ''
        }
        return prefix + elementSeparator + element
      },
      m(modifier: string | number | undefined, is?: IsType) {
        if (arguments.length === 2 && !is) {
          return ''
        }
        return prefix + modifierSeparator + modifier
      },
      em(
        element: string | number,
        modifier: string | number | undefined,
        is?: IsType,
      ) {
        if (arguments.length === 3 && !is) {
          return ''
        }
        return (
          prefix + elementSeparator + element + modifierSeparator + modifier
        )
      },
      bem(
        block: string | number,
        element?: string | number,
        modifier?: string | number,
        is?: boolean | number | string | null,
      ) {
        if (arguments.length === 4 && !is) {
          return ''
        }

        let className = namespace + blockSeparator + block
        if (element) {
          className += elementSeparator + element
        }
        if (modifier) {
          className += modifierSeparator + modifier
        }
        return className
      },
    }
  }
}

export const createBem = createBemStruct(defaultBem)

export type Bem = ReturnType<typeof createBem>
