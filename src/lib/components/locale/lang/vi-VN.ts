const formTypeTemplate = '${label}không phải là một ${type} hợp lệ'

export default {
  calendar: {
    weeks: {
      0: 'CN',
      1: 'T2',
      2: 'T3',
      3: 'T4',
      4: 'T5',
      5: 'T6',
      6: 'T7',
    },
    monthTitle: 'Tháng ${month} năm ${year}',
    start: 'Bắt đầu',
    end: 'Kết thúc',
    to: 'đến',
    multipleOutlet: 'Đã chọn ${count} ngày',
  },
  cascader: {
    pleaseSelect: 'Vui lòng chọn',
    error: 'Yêu cầu thất bại, nhấn để tải lại',
    noData: 'Không có dữ liệu',
  },
  cropImage: {
    confirm: 'Xác nhận',
    cancel: 'Hủy',
  },
  datetimePicker: {
    y: 'năm',
    M: 'tháng',
    d: 'ngày',
    h: 'giờ',
    m: 'phút',
    s: 'giây',
  },
  datetimeRangePickerInput: {
    to: 'đến',
  },
  dialog: {
    confirm: 'Xác nhận',
    cancel: 'Hủy',
  },
  empty: {
    noData: 'Không có dữ liệu',
  },
  form: {
    defaultValidateMessages: {
      default: 'Lỗi xác thực trường ${label}',
      required: '${label} là bắt buộc',
      enum: '${label} phải là một trong [${enum}]',
      whitespace: '${label} không được chứa khoảng trắng trống',
      date: {
        format: 'Định dạng ngày ${label} không hợp lệ',
        parse: 'Không thể chuyển đổi ${label} thành ngày',
        invalid: '${label} là một ngày không hợp lệ',
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
        len: '${label} phải có ${len} ký tự',
        min: '${label} tối thiểu ${min} ký tự',
        max: '${label} tối đa ${max} ký tự',
        range: '${label} phải nằm trong khoảng ${min}-${max} ký tự',
      },
      number: {
        len: '${label} phải bằng ${len}',
        min: 'Giá trị tối thiểu của ${label} là ${min}',
        max: 'Giá trị tối đa của ${label} là ${max}',
        range: '${label} phải nằm trong khoảng ${min}-${max}',
      },
      array: {
        len: 'Phải có ${len} ${label}',
        min: 'Tối thiểu ${min} ${label}',
        max: 'Tối đa ${max} ${label}',
        range: 'Số lượng ${label} phải nằm trong khoảng ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} không khớp với mẫu ${pattern}',
      },
    },
  },
  loadMore: {
    incompleteText: 'Nhấn để tải thêm',
    loadingText: 'Đang tải...',
    completeText: 'Không còn nữa',
    errorText: 'Yêu cầu thất bại, nhấn để tải lại',
  },
  pagination: {
    previous: 'Trang trước',
    next: 'Trang sau',
  },
  popout: {
    confirm: 'Xác nhận',
    cancel: 'Hủy',
  },
  readMore: {
    fold: 'Thu gọn',
    unfold: 'Mở rộng',
  },
  signature: {
    confirm: 'Xác nhận',
    clear: 'Xóa',
    cancel: 'Hủy',
  },
  tree: {
    addSibling: 'Thêm nút kế tiếp',
    addChild: 'Thêm nút con',
    addRoot: 'Thêm nút gốc',
    removeNode: 'Xóa nút',
    edit: 'Chỉnh sửa nút',
    please: 'Vui lòng nhập tiêu đề',
    error: 'Yêu cầu thất bại, nhấn để tải lại',
    noData: 'Không có dữ liệu',
  },
}
