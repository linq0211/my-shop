import type {
  OrderCreateParams,
  OrderCreateResult,
  OrderListParams,
  OrderListResult,
  OrderLogisticResult,
  OrderPreResult,
  OrderResult
} from '@/types/order'
import myRequest from '..'

export function getMemberOrderPre() {
  return myRequest<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre'
  })
}

export function getMemberOrderPreNow(data: { skuId: string; count: string; addressId?: string }) {
  return myRequest<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data
  })
}

export function getMemberOrderRepurchaseById(id: string) {
  return myRequest<OrderPreResult>({
    method: 'GET',
    url: `/member/order/repurchase/${id}`
  })
}

export function postMemberOrder(data: OrderCreateParams) {
  return myRequest<OrderCreateResult>({
    method: 'POST',
    url: '/member/order',
    data
  })
}

export function getMemberOrderById(id: string) {
  return myRequest<OrderResult>({
    method: 'GET',
    url: `/member/order/${id}`
  })
}

export function getPayWxPay(data: { orderId: string }) {
  return myRequest<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: `/pay/wxPay/miniPay`,
    data
  })
}
export function getPayMock(data: { orderId: string }) {
  return myRequest({
    method: 'GET',
    url: `/pay/mock`,
    data
  })
}

export const getMemberOrderConsignmentById = (id: string) => {
  return myRequest({
    method: 'GET',
    url: `/member/order/consignment/${id}`
  })
}

export const putMemberOrderReceiptById = (id: string) => {
  return myRequest<OrderResult>({
    method: 'PUT',
    url: `/member/order/${id}/receipt`
  })
}

export const getMemberOrderLogisticsById = (id: string) => {
  return myRequest<OrderLogisticResult>({
    method: 'GET',
    url: `/member/order/${id}/logistics`
  })
}

export const deleteMemberOrder = (data: { ids: string[] }) => {
  return myRequest({
    method: 'DELETE',
    url: `/member/order`,
    data
  })
}

export const getMemberOrderCancelById = (id: string, data: { cancelReason: string }) => {
  return myRequest<OrderResult>({
    method: 'PUT',
    url: `/member/order/${id}/cancel`,
    data
  })
}

export const getMemberOrder = (data: OrderListParams) => {
  return myRequest<OrderListResult>({
    method: 'GET',
    url: `/member/order`,
    data
  })
}
