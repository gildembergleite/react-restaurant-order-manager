import { api } from '@/lib/axios'

export async function dispatchOrder({ orderId }: { orderId: string }) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
