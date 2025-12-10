import { createFileRoute, Outlet } from '@tanstack/react-router'

import SpecialOfferAlert from '@/components/Alert/SpecialOfferAlert.tsx'
import Footer from '@/components/Footer.tsx'
import Header from '@/components/Header.tsx'
import NewsLetter from '@/components/NewsLetter.tsx'

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SpecialOfferAlert />
      <Header />
      <Outlet />
      <div className="relative pt-10 px-4">
        <NewsLetter />
        <Footer />
      </div>
    </>
  )
}
