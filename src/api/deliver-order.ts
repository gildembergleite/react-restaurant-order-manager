import { api } from '@/lib/axios'

export async function deliverOrder({ orderId }: { orderId: string }) {
  await api.patch(`/orders/${orderId}/deliver`)
}
