import { random } from 'sard-uniapp'

export function getPrizes() {
  return [
    { id: 1, name: '华夫饼', icon: 'huafubing' },
    { id: 2, name: '芝士蛋糕', icon: 'zhishidangao' },
    { id: 3, name: '曲奇饼干', icon: 'quqibinggan' },
    { id: 4, name: '布丁', icon: 'buding' },
    { id: 5, name: '汉堡', icon: 'hanbao' },
    { id: 6, name: '吐司', icon: 'tusi' },
    { id: 7, name: '提拉米苏', icon: 'tilamisu' },
    { id: 8, name: '三明治', icon: 'sanmingzhi' },
    { id: 9, name: '泡芙', icon: 'paofu' },
    { id: 10, name: '千层蛋糕', icon: 'qiancengdangao' },
    { id: 11, name: '蛋挞', icon: 'danta' },
    { id: 12, name: '虎皮卷', icon: 'hupijuan' },
    { id: 13, name: '果冻', icon: 'guodong' },
    { id: 14, name: '蛋黄酥', icon: 'danhuangsu' },
    { id: 15, name: '巧克力蛋卷', icon: 'qiaokelidanjuan' },
    { id: 16, name: '苏打饼干', icon: 'sudabinggan' },
    { id: 17, name: '奥利奥', icon: 'aoliao' },
    { id: 18, name: '巧克力', icon: 'qiaokeli' },
  ]
}

export interface Prize {
  id: number
  name: string
  icon: string
}

export const getPrizesApi = async (count: number) => {
  return new Promise<Prize[]>((resolve) =>
    setTimeout(resolve, 150, getPrizes().slice(0, count)),
  )
}

export const getPrizeApi = async (count: number) => {
  return new Promise<Prize>((resolve) =>
    setTimeout(resolve, 150, getPrizes()[random(0, count - 1)]),
  )
}

export const getMultiPrizeApi = async (columns: number[]) => {
  return new Promise<Prize[]>((resolve) =>
    setTimeout(
      resolve,
      150,
      columns.map((column) => getPrizes()[random(0, column - 1)]),
    ),
  )
}
