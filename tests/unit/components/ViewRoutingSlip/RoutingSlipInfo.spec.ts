import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import CommonUtils from '@/util/common-util'
import { RoutingSlipInfo } from '@/components/ViewRoutingSlip'
import { SlipStatus } from '@/util/constants'
import Vue from 'vue'
import Vuetify from 'vuetify'
import StatusMenu from '@/components/common/StatusMenu.vue'
import ConfigHelper from '@/util/config-helper'
import initialize from '@/plugins/i18n'
import Vuelidate from 'vuelidate'

describe('RoutingSlipInfo.vue', () => {
  const i18n = initialize(Vue)
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    localVue.use(Vuelidate)
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    vi.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    vi.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    vi.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    vi.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const wrapper = shallowMount(RoutingSlipInfo, {
      localVue,
      vuetify,
      i18n,
      directives: {
        can () { /* stub */ }
      },
      stubs: {
        RefundRequestForm: MyStub
      },
      mocks: { i18n }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Routing Slip Information')
    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
  })

  it('should have StatusMenu component', async () => {
    vi.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    vi.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    vi.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    vi.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const wrapper = shallowMount(RoutingSlipInfo, {
      localVue,
      vuetify,
      i18n,
      directives: {
        can () { /* stub */ }
      }
    })

    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
    expect(wrapper.findComponent(StatusMenu).exists()).toBeTruthy()
  })

  it('Refund approval/cancel flow', async () => {
    vi.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    vi.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    vi.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    vi.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const wrapper: any = mount(RoutingSlipInfo, {
      localVue,
      vuetify,
      i18n,
      directives: {
        can () { /* stub */ }
      },
      data: {
        currentStatus: SlipStatus.REFUNDREQUEST,
        editMode: true,
        isAddressEditable: true
      },
      mocks: { i18n }
    })

    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
    expect(wrapper.findComponent(StatusMenu).exists()).toBeTruthy()

    // fix selected value by passing props
    // wrapper.find('[data-test="btn-edit"]').trigger('click')
    // await wrapper.vm.$nextTick()

    // expect(wrapper.findComponent(StatusMenu).exists()).toBeTruthy()
    // expect(wrapper.vm.showAddressEditMode).toBeTruthy()
  })

  it('should have refundRequestForm component', async () => {
    vi.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    vi.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    vi.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    vi.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const wrapper = shallowMount(RoutingSlipInfo, {
      localVue,
      vuetify,
      i18n,
      directives: {
        can () { /* stub */ }
      }
    })

    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
    expect(wrapper.findComponent(StatusMenu).exists()).toBeTruthy()
  })

  it('hides RefundRequestForm component when status is not refund process', async () => {
    vi.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    vi.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    vi.spyOn(CommonUtils, 'isRefundProcessStatus').mockReturnValue(false)
    vi.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    vi.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')

    const wrapper: any = mount(RoutingSlipInfo, {
      localVue,
      vuetify,
      i18n,
      directives: {
        can () { /* stub */ }
      },
      mocks: { i18n }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'RefundRequestForm' }).exists()).toBe(false)
  })

  it('display RefundRequestForm component when status is REFUNDREQUEST', async () => {
    vi.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    vi.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    vi.spyOn(CommonUtils, 'isRefundProcessStatus').mockReturnValue(true)
    vi.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    vi.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const RefundRequestFormStub = {
      name: 'RefundRequestForm',
      template: '<div class="refund-request-form-stub"></div>'
    }

    const wrapper = mount(RoutingSlipInfo, {
      localVue,
      vuetify,
      i18n,
      stubs: {
        RefundRequestForm: RefundRequestFormStub
      },
      directives: {
        can () { /* stub */ }
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'RefundRequestForm' }).exists()).toBe(true)
  })
})
