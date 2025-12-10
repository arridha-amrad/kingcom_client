import { useLoaderDeps, useNavigate } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

interface Props {
  totalPages: number
}

function ProductPaginatedButton({ totalPages }: Props) {
  const deps = useLoaderDeps({ from: '/(main)/products/' })

  const router = useNavigate()

  const currentPage = deps.page ?? 1

  const handlePageChange = (newPage: number) => {
    router({
      to: '/products',
      search: (prev) => ({
        ...prev,
        page: newPage,
      }),
    })
  }

  const renderPageNumbers = () => {
    const page = [1, totalPages]
    const dataPage = [currentPage - 1, currentPage, currentPage + 1]
    const result = Array.from(new Set([...page, ...dataPage]))
      .filter((v) => v > 0 && v <= totalPages)
      .sort((a, b) => a - b)
    return result
  }

  const nextPage = () => {
    handlePageChange(currentPage + 1)
  }

  const prevPage = () => {
    handlePageChange(currentPage - 1)
  }

  const buttons = (
    <div className="flex items-center justify-center gap-1">
      {renderPageNumbers().map((page) => (
        <button
          onClick={() => handlePageChange(page)}
          key={page}
          className={`size-10 rounded-xl cursor-pointer ${
            currentPage === page
              ? 'bg-foreground text-background'
              : 'bg-background text-foreground '
          }`}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
    </div>
  )

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={prevPage}
        className="flex items-center justify-center gap-2 border border-foreground/20 rounded-xl h-10 aspect-square md:aspect-auto md:px-6"
      >
        <ArrowLeftIcon />
        <span className="lg:block hidden">Previous</span>
      </button>
      {buttons}
      <button
        onClick={nextPage}
        className="flex items-center justify-center gap-2 border border-foreground/20 rounded-xl h-10 aspect-square md:aspect-auto md:px-6"
      >
        <span className="lg:block hidden">Next</span>
        <ArrowRightIcon />
      </button>
    </div>
  )
}

export default ProductPaginatedButton
