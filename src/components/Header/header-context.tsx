import { cn } from '@/utils'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { Search, ShoppingCart } from 'lucide-react'
import { createContext, useState } from 'react'
import ButtonTheme from '../Button/ButtonTheme'

const ActiveIndicator = () => (
  <div className="absolute bottom-0 inset-x-0 rounded-full w-3/4 h-1 bg-foreground" />
)

const HeaderContext = createContext(undefined)

const HeaderContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderContext.Provider value={undefined}>
      {children}
    </HeaderContext.Provider>
  )
}

HeaderContextProvider.Brand = () => (
  <Link
    className="font-header cursor-pointer font-bold tracking-wide block text-4xl pb-1"
    to="/"
  >
    KingCom
  </Link>
)

HeaderContextProvider.Links = () => {
  const pathname = useLocation().pathname
  return (
    <ul className="items-center shrink-0 justify-center gap-4 hidden md:flex">
      <li className="py-4 relative">
        <Link to="/products">Shop</Link>
        {pathname === '/products' && <ActiveIndicator />}
      </li>
      {pathname === '/' && (
        <>
          <li>
            <a href="#on_sale">On Sale</a>
          </li>
          <li>
            <a href="#new_arrival">New Arrivals</a>
          </li>
          <li>
            <a href="#brands">Brands</a>
          </li>
        </>
      )}
    </ul>
  )
}

HeaderContextProvider.ButtonCart = () => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  return (
    <button className="relative py-4" onClick={() => navigate({ to: '/cart' })}>
      <ShoppingCart
        className={cn(
          pathname === '/cart' ? 'fill-foreground stroke-foreground' : ''
        )}
      />
      {pathname === '/cart' && <ActiveIndicator />}
    </button>
  )
}

HeaderContextProvider.ThemeButton = () => <ButtonTheme />

HeaderContextProvider.SearchProductField = () => {
  const navigate = useNavigate()
  const [key, setKey] = useState('')
  const handleSubmit = () => {
    navigate({
      to: '/products',
      search: {
        name: key,
      },
    })
  }
  return (
    <div className="relative w-full hidden lg:block">
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
        onChange={(e) => setKey(e.target.value)}
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
export default HeaderContextProvider
