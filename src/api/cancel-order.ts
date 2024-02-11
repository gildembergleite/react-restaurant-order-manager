import { api } from '@/lib/axios'

export async function cancelOrder({ orderId }: { orderId: string }) {
  await api.patch(`/orders/${orderId}/cancel`)
}
