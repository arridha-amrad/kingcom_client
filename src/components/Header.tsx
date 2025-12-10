'use client'

import { cn } from '@/utils'
import {
  Link,
  useLocation,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import { Search, ShoppingCart } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import ButtonSearch from './Button/ButtonSearch'
import ButtonTheme from './Button/ButtonTheme'
import ButtonUser from './Button/ButtonUser'
import Button from './ui/Button'

function Header() {
  const navigate = useNavigate()
  const loc = useLocation()
  const pathname = loc.pathname

  return (
    <header className="h-24 sticky top-0 bg-background/70 backdrop-blur z-50 shrink-0 w-full px-4 flex items-center gap-4">
      <div className="flex-1">
        <h1
          onClick={() => navigate({ to: '/' })}
          className="font-header cursor-pointer font-bold tracking-wide block text-4xl pb-1"
        >
          KingCom
        </h1>
      </div>
      <div className="flex-4 flex items-center justify-center gap-4">
        <ul className="items-center shrink-0 justify-center gap-4 hidden md:flex">
          <li className="py-4 relative">
            <Link to="/products">Shop</Link>
            {pathname === '/products' && <ActiveIndicator />}
          </li>
          <li>
            <a href="#on_sale">On Sale</a>
          </li>
          <li>
            <a href="#new_arrival">New Arrivals</a>
          </li>
          <li>
            <a href="#brands">Brands</a>
          </li>
        </ul>
        <SearchProductField />
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="block lg:hidden pt-1">
          <ButtonSearch />
        </div>
        <button
          className="relative py-4"
          onClick={() => navigate({ to: '/cart' })}
        >
          <ShoppingCart
            className={cn(
              pathname === '/cart' ? 'fill-foreground stroke-foreground' : ''
            )}
          />
          {pathname === '/cart' && <ActiveIndicator />}
        </button>
        {/* <ButtonUser /> */}
        <Button onClick={() => navigate({ to: '/login' })}>Login</Button>
        <div className="h-5 w-1 bg-foreground/10 rounded-full" />
        <ButtonTheme />
      </div>
    </header>
  )
}

export default Header

const ActiveIndicator = () => (
  <div className="absolute bottom-0 inset-x-0 rounded-full w-3/4 h-1 bg-foreground" />
)

const SearchProductField = () => {
  const router = useRouter()

  const [key, setKey] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value)
  }

  const handleSubmit = () => {
    router.navigate({
      to: '/products',
      search: {
        name: key,
      },
    })
  }

  return (
    <div className="relative w-full xl:max-w-[400px] hidden lg:block lg:max-w-sm">
      <input
        className="bg-foreground/10 pl-12 outline-0 w-full px-4 h-12 rounded-full"
        name="search"
        placeholder="Search for products..."
        type="text"
        value={key}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSubmit()
          }
        }}
        onChange={handleChange}
      />
      <div className="absolute top-0 left-0 aspect-square">
        <button
          onClick={handleSubmit}
          className="h-12 flex items-center justify-center aspect-square rounded-full"
        >
          <Search className="stroke-foreground/20" />
        </button>
      </div>
    </div>
  )
}
