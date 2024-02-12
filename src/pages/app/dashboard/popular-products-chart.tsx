import { BarChartIcon } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { getPopularProducts } from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'

const COLORS = [
  colors.red['500'],
  colors.orange['500'],
  colors.yellow['500'],
  colors.green['500'],
  colors.teal['500'],
]

interface LabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  value: number
  index: number
}

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts
  })

  function buildLabelChart(props: LabelProps) {
    const { cx, cy, midAngle, innerRadius, outerRadius, value, index } = props

    const RADIAN = Math.PI / 180
    const radius = 12 + innerRadius + (outerRadius - innerRadius)
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    if (!popularProducts) return null

    const productName = popularProducts[index].product ?? ''

    return (
      <text
        x={x}
        y={y}
        className="fill-muted-foreground text-xs truncate"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {productName.length > 15
          ? productName.substring(0, 15).concat('...')
          : productName}{' '}
        ({value})
      </text>
    )
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between w-full">
          <CardTitle>Produtos populares</CardTitle>
          <BarChartIcon size={16} />
        </div>
      </CardHeader>
      <CardContent>
        {popularProducts && (
          <ResponsiveContainer width={'100%'} height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={popularProducts}
                dataKey={'amount'}
                nameKey={'product'}
                cx={'50%'}
                cy={'50%'}
                outerRadius={86}
                innerRadius={56}
                strokeWidth={6}
                labelLine={false}
                label={(props: LabelProps) => buildLabelChart(props)}
              >
                {popularProducts.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                    className='stroke-background hover:opacity-75'
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
