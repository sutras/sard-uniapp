export const columns = [
  {
    title: 'ID',
    prop: 'id',
    width: '80rpx',
  },
  {
    title: '日期',
    prop: 'date',
    width: '200rpx',
  },
  {
    title: '姓名',
    prop: 'name',
    width: '100rpx',
  },
  {
    title: '城市',
    prop: 'city',
    width: '100rpx',
  },
  {
    title: '电话',
    prop: 'tel',
    width: '200rpx',
  },
  {
    title: '地址',
    prop: 'address',
    width: '300rpx',
  },
] as const

export const partialColumns = [
  {
    title: 'ID',
    prop: 'id',
    width: '1',
  },
  {
    title: '姓名',
    prop: 'name',
    width: '2',
  },
  {
    title: '城市',
    prop: 'city',
    width: '3',
  },
] as const

export const data = Array(20)
  .fill(0)
  .map((_, i) => {
    return {
      id: i + 1,
      name: '张三',
      city: '广州',
      tel: '138********',
      address: '广东省广州市**路22号',
      date: '2024-12-12',
    }
  })

export const partialData = data.slice(0, 3)
