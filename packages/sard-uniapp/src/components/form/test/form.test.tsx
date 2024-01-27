import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, reactive } from 'vue'

import Form from '../form.vue'
import FormItem from '../../form-item/form-item.vue'
import Input from '../../input/input.vue'
import { FormExpose } from '../common'

describe('Form', () => {
  test('direction', async () => {
    const wrapper = mount(
      <Form
        direction="horizontal"
        label-align="start"
        label-valign="start"
        star-position="left"
      >
        <FormItem label="Name" required>
          <Input />
        </FormItem>
      </Form>,
    )

    expect(
      wrapper
        .find(
          '.sar-form-item.sar-form-item_horizontal.sar-form-item_align-start.sar-form-item_valign-start.sar-form-item_star-left',
        )
        .exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      direction: 'vertical',
      labelAlign: 'center',
      labelValign: 'center',
      starPosition: 'right',
    })
    expect(
      wrapper
        .find(
          '.sar-form-item.sar-form-item_vertical.sar-form-item_align-center.sar-form-item_valign-center.sar-form-item_star-right',
        )
        .exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      labelAlign: 'end',
      labelValign: 'end',
    })
    expect(
      wrapper
        .find('.sar-form-item.sar-form-item_align-end.sar-form-item_valign-end')
        .exists(),
    ).toBeTruthy()
  })

  test('validate', async () => {
    const wrapper = mount({
      setup() {
        const formModel = reactive({
          name: '',
          nickName: '',
          age: '',
        })

        return () => (
          <Form
            direction="horizontal"
            model={formModel}
            rules={{
              name: [
                {
                  required: true,
                  message: 'Please input Activity name',
                  trigger: 'change',
                },
              ],
            }}
            ref="formRef"
          >
            <FormItem label="Name" name="name">
              <Input v-model={formModel.name} />
            </FormItem>
            <FormItem label="NickName" name="nickname" required>
              <Input v-model={formModel.nickName} />
            </FormItem>
            <FormItem label="age">
              <Input v-model={formModel.age} />
            </FormItem>
          </Form>
        )
      },
    })

    await nextTick()

    expect(
      wrapper.find('.sar-form-item:nth-child(1) .sar-form-item__star').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-form-item:nth-child(2) .sar-form-item__star').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-form-item:nth-child(3) .sar-form-item__star').exists(),
    ).not.toBeTruthy()
    ;(wrapper.vm.$refs.formRef as FormExpose)
      .validate()
      .catch(() => {
        void 0
      })
      .finally(() => {
        expect(
          wrapper
            .find('.sar-form-item:nth-child(1) .sar-form-item__error')
            .text(),
        ).toBe('Please input Activity name')
        expect(
          wrapper
            .find('.sar-form-item:nth-child(2) .sar-form-item__error')
            .exists(),
        ).toBeTruthy()
        expect(
          wrapper
            .find('.sar-form-item:nth-child(3) .sar-form-item__error')
            .exists(),
        ).not.toBeTruthy()
      })
  })
})
