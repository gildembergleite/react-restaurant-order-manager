import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}