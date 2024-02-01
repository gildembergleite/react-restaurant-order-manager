import { BarChartIcon } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { product: 'Pepperoni', amount: 40 },
  { product: 'Muzarela', amount: 60 },
  { product: 'Margherita', amount: 15 },
  { product: 'Frango', amount: 55 },
  { product: 'Camarão ao alho e óleo', amount: 30 },
]

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
  function buildLabelChart(props: LabelProps) {
    const { cx, cy, midAngle, innerRadius, outerRadius, value, index } = props

    const RADIAN = Math.PI / 180
    const radius = 12 + innerRadius + (outerRadius - innerRadius)
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        className="fill-muted-foreground text-xs truncate"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {data[index].product.length > 15
          ? data[index].product.substring(0, 15).concat('...')
          : data[index].product}{' '}
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
        <ResponsiveContainer width={'100%'} height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
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
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  className='stroke-background hover:opacity-75'
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
