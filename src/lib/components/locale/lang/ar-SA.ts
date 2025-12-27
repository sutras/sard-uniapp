const formTypeTemplate = '${label} ليس ${type} صالحاً'

export default {
  actionSheet: {
    cancel: 'إلغاء',
  },
  calendar: {
    weeks: {
      0: 'الأحد',
      1: 'الاثنين',
      2: 'الثلاثاء',
      3: 'الأربعاء',
      4: 'الخميس',
      5: 'الجمعة',
      6: 'السبت',
    },
    monthTitle: '${year}/${month}',
    start: 'البداية',
    end: 'النهاية',
    to: 'إلى',
    multipleOutlet: 'عدد التواريخ المختارة: ${count}',
  },
  cascader: {
    pleaseSelect: 'الرجاء الاختيار',
    error: 'فشل الطلب. انقر لإعادة التحميل',
    noData: 'لا توجد بيانات',
  },
  cropImage: {
    confirm: 'موافق',
    cancel: 'إلغاء',
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
    to: 'إلى',
  },
  dialog: {
    confirm: 'موافق',
    cancel: 'إلغاء',
  },
  empty: {
    noData: 'لا توجد بيانات',
  },
  form: {
    defaultValidateMessages: {
      default: 'خطأ في التحقق من صحة الحقل ${label}',
      required: '${label} مطلوب',
      enum: '${label} يجب أن يكون واحداً من [${enum}]',
      whitespace: '${label} لا يمكن أن يكون حرفاً فارغاً',
      date: {
        format: 'تنسيق التاريخ ${label} غير صحيح',
        parse: '${label} لا يمكن تحويله إلى تاريخ',
        invalid: '${label} تاريخ غير صحيح',
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
        len: '${label} يجب أن يكون ${len} أحرف',
        min: '${label} يجب أن يكون على الأقل ${min} أحرف',
        max: '${label} يجب أن يكون حتى ${max} أحرف',
        range: '${label} يجب أن يكون بين ${min}-${max} أحرف',
      },
      number: {
        len: '${label} يجب أن يساوي ${len}',
        min: '${label} يجب أن يكون الحد الأدنى ${min}',
        max: '${label} يجب أن يكون الحد الأقصى ${max}',
        range: '${label} يجب أن يكون بين ${min}-${max}',
      },
      array: {
        len: 'يجب أن يكون ${len} ${label}',
        min: 'على الأقل ${min} ${label}',
        max: 'على الأكثر ${max} ${label}',
        range: 'كمية ${label} يجب أن تكون بين ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} لا يتطابق مع النمط ${pattern}',
      },
    },
  },
  loadMore: {
    incompleteText: 'انقر لتحميل المزيد',
    loadingText: 'جاري التحميل...',
    errorText: 'فشل الطلب. انقر لإعادة التحميل',
    completeText: 'لا يوجد المزيد',
  },
  pagination: {
    previous: 'السابق',
    next: 'التالي',
  },
  popout: {
    confirm: 'موافق',
    cancel: 'إلغاء',
  },
  readMore: {
    fold: 'طي',
    unfold: 'فتح',
  },
  signature: {
    confirm: 'موافق',
    clear: 'مسح',
    cancel: 'إلغاء',
  },
  tree: {
    addSibling: 'إضافة عقدة شقيقة',
    addChild: 'إضافة عقدة فرعية',
    addRoot: 'إضافة عقدة جذرية',
    removeNode: 'إزالة العقدة',
    edit: 'تعديل العقدة',
    please: 'الرجاء إدخال العنوان',
    error: 'فشل الطلب. انقر لإعادة التحميل',
    noData: 'لا توجد بيانات',
  },
}
