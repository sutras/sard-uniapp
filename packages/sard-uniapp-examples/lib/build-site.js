import child_process from 'child_process'

export const uniProcess = child_process.exec(
  'npx uni build --outDir ../sard-uniapp/docs/mobile --base /sard/mobile/',
)
