import { Skeleton } from '@/components/ui/skeleton'

export function MetricsCardSkeleton() {
  return (
    <div className='space-y-3'>
      <Skeleton className='h-7 w-36 rounded-none' />
      <Skeleton className='h-3 w-56 rounded-none' />
    </div>
  )
}
