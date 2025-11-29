const formTypeTemplate = '${label} is not a valid ${type}'

export default {
  calendar: {
    weeks: {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
    },
    monthTitle: '${year}/${month}',
    start: 'start',
    end: 'end',
    to: 'to',
    multipleOutlet: 'The number of dates selected is: ${count}',
  },
  cascader: {
    pleaseSelect: 'Please select',
    error: 'Request failed. Click to reload',
    noData: 'No data',
  },
  cropImage: {
    confirm: 'Ok',
    cancel: 'Cancel',
  },
  datetimePicker: {
    y: '',
    M: '',
    d: '',
    h: '',
    m: '',
    s: '',
  },
  datetimeRangePickerInput: {
    to: 'to',
  },
  dialog: {
    confirm: 'Ok',
    cancel: 'Cancel',
  },
  empty: {
    noData: 'No data',
  },
  form: {
    defaultValidateMessages: {
      default: 'Field validation error for ${label}',
      required: '${label} is required',
      enum: '${label} must be one of [${enum}]',
      whitespace: '${label} cannot be a blank character',
      date: {
        format: '${label} date format is invalid',
        parse: '${label} cannot be converted to a date',
        invalid: '${label} is an invalid date',
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
        len: '${label} must be ${len} characters',
        min: '${label} must be at least ${min} characters',
        max: '${label} must be up to ${max} characters',
        range: '${label} must be between ${min}-${max} characters',
      },
      number: {
        len: '${label} must be equal to ${len}',
        min: '${label} must be minimum ${min}',
        max: '${label} must be maximum ${max}',
        range: '${label} must be between ${min}-${max}',
      },
      array: {
        len: 'Must be ${len} ${label}',
        min: 'At least ${min} ${label}',
        max: 'At most ${max} ${label}',
        range: 'The amount of ${label} must be between ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} does not match the pattern ${pattern}',
      },
    },
  },
  loadMore: {
    incompleteText: 'Click to load more',
    loadingText: 'Loading...',
    errorText: 'Request failed. Click to reload',
    completeText: 'No more',
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
  },
  popout: {
    confirm: 'Ok',
    cancel: 'Cancel',
  },
  readMore: {
    fold: 'fold',
    unfold: 'unfold',
  },
  signature: {
    confirm: 'Ok',
    clear: 'Clear',
    cancel: 'Cancel',
  },
  tree: {
    addSibling: 'Add sibling node',
    addChild: 'Add child node',
    addRoot: 'Add root node',
    removeNode: 'Remove node',
    edit: 'Edit node',
    please: 'Please input title',
    error: 'Request failed. Click to reload',
    noData: 'No data',
  },
}
