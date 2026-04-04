export type CanvasFontStyle = 'normal' | 'italic' | 'oblique' | (string & {})

export type CanvasTextAlign = 'center' | 'end' | 'left' | 'right' | 'start'

export type CanvasFontWeight =
  | 'normal'
  | 'bold'
  | number
  | 'lighter'
  | 'bolder'
  | (string & {})

export function measureTextWidth(
  context: ReturnType<typeof uni.createCanvasContext>,
  text: string,
  {
    fontStyle,
    fontWeight,
    fontSize,
    fontFamily,
  }: {
    fontStyle?: CanvasFontStyle
    fontWeight?: CanvasFontWeight
    fontSize?: number
    fontFamily?: string
  },
) {
  context.font = [
    fontStyle,
    fontWeight === 'normal' ? '' : fontWeight,
    fontSize + 'px',
    fontFamily,
  ]
    .filter(Boolean)
    .join(' ')

  const metrics = context.measureText(text)

  return metrics?.width ?? 0
}
