import { useFetchAuth } from '@/hooks/auth.hooks'
import { useNavigate } from '@tanstack/react-router'
import ButtonSearch from '../Button/ButtonSearch'
import UserDropDown from '../Dropdowns/UserDropDown'
import Button from '../ui/Button'
import HeaderContextProvider from './header-context'

function Header() {
  const { data } = useFetchAuth()
  const navigate = useNavigate()

  return (
    <HeaderContextProvider>
      <header className="h-24 sticky top-0 bg-background/70 backdrop-blur z-50 shrink-0 w-full px-4 flex items-center gap-4">
        <div className="flex-1">
          <HeaderContextProvider.Brand />
        </div>
        <div className="flex-4 px-4 flex items-center justify-center gap-4">
          <HeaderContextProvider.Links />
          <HeaderContextProvider.SearchProductField />
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="block lg:hidden pt-1">
            <ButtonSearch />
          </div>
          {data ? (
            <>
              <HeaderContextProvider.ButtonCart />
              <UserDropDown />
            </>
          ) : (
            <>
              <Button onClick={() => navigate({ to: '/login' })}>Login</Button>
              <Button onClick={() => navigate({ to: '/signup' })}>
                Signup
              </Button>
            </>
          )}
          <div className="h-5 w-1 bg-foreground/10 rounded-full" />
          <HeaderContextProvider.ThemeButton />
        </div>
      </header>
    </HeaderContextProvider>
  )
}

export default Header
