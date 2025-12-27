const formTypeTemplate = '${label}不是一个有效的${type}'

export default {
  actionSheet: {
    cancel: '取消',
  },
  calendar: {
    weeks: {
      0: '日',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
    },
    monthTitle: '${year}年${month}月',
    start: '开始',
    end: '结束',
    to: '至',
    multipleOutlet: '选择了${count}个日期',
  },
  cascader: {
    pleaseSelect: '请选择',
    error: '请求失败，点击重新加载',
    noData: '暂无数据',
  },
  cropImage: {
    confirm: '确定',
    cancel: '取消',
  },
  datetimePicker: {
    y: '年',
    M: '月',
    d: '日',
    h: '时',
    m: '分',
    s: '秒',
  },
  datetimeRangePickerInput: {
    to: '至',
  },
  dialog: {
    confirm: '确定',
    cancel: '取消',
  },
  empty: {
    noData: '暂无数据',
  },
  form: {
    defaultValidateMessages: {
      default: '字段验证错误${label}',
      required: '${label}是必需的',
      enum: '${label}必须是其中一个[${enum}]',
      whitespace: '${label}不能为空字符',
      date: {
        format: '${label}日期格式无效',
        parse: '${label}不能转换为日期',
        invalid: '${label}是一个无效日期',
      },
      types: {
        string: formTypeTemplate,
        function: formTypeTemplate,
        array: formTypeTemplate,
        object: formTypeTemplate,
        number: formTypeTemplate,
        date: formTypeTemplate,
        boolean: formTypeTemplate,
        integer: formTypeTemplate,
        float: formTypeTemplate,
        regexp: formTypeTemplate,
        email: formTypeTemplate,
        url: formTypeTemplate,
        hex: formTypeTemplate,
      },
      string: {
        len: '${label}须为${len}个字符',
        min: '${label}最少${min}个字符',
        max: '${label}最多${max}个字符',
        range: '${label}须在${min}-${max}字符之间',
      },
      number: {
        len: '${label}必须等于${len}',
        min: '${label}最小值为${min}',
        max: '${label}最大值为${max}',
        range: '${label}须在${min}-${max}之间',
      },
      array: {
        len: '须为${len}个${label}',
        min: '最少${min}个${label}',
        max: '最多${max}个${label}',
        range: '${label}数量须在${min}-${max}之间',
      },
      pattern: {
        mismatch: '${label}与模式不匹配${pattern}',
      },
    },
  },
  loadMore: {
    incompleteText: '点击加载更多',
    loadingText: '加载中...',
    completeText: '没有更多了',
    errorText: '请求失败，点击重新加载',
  },
  pagination: {
    previous: '上一页',
    next: '下一页',
  },
  popout: {
    confirm: '确定',
    cancel: '取消',
  },
  readMore: {
    fold: '收起',
    unfold: '展开',
  },
  signature: {
    confirm: '确定',
    clear: '清空',
    cancel: '取消',
  },
  tree: {
    addSibling: '添加下一节点',
    addChild: '添加子节点',
    addRoot: '添加根节点',
    removeNode: '删除节点',
    edit: '编辑节点',
    please: '请输入标题',
    error: '请求失败，点击重新加载',
    noData: '暂无数据',
  },
}
