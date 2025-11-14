import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import type { Cart } from '../../models/cart.model'
import {
  Field,
  Label,
  RadioGroup,
  Radio,
  Select,
  Textarea,
} from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import type {
  CalculateShippingCostResponse,
  ShippingResponse,
} from '../../api/shipping.api'
import clsx from 'clsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  citiesQueryOptions,
  districtsQueryOptions,
  provincesQueryOptions,
  useCostMutation,
} from '../../queryOptions/shipping.queryOptions'
import { cn, formatToIdr } from '../../utils'
import { cacheKey } from '../../constants/cacheKey'
import type { Shipping } from '../../models/order.model'
import toast from 'react-hot-toast'

type TShippingFormContext = {
  carts: Cart[]
  targetProvince: ShippingResponse | null
  setTargetProvince: Dispatch<SetStateAction<ShippingResponse | null>>
  targetCity: ShippingResponse | null
  setTargetCity: Dispatch<SetStateAction<ShippingResponse | null>>
  targetDistrict: ShippingResponse | null
  setTargetDistrict: Dispatch<SetStateAction<ShippingResponse | null>>
  targetAddress: string
  setTargetAddress: Dispatch<SetStateAction<string>>
  availableCouriers: CalculateShippingCostResponse[]
  setAvailableCouriers: Dispatch<
    SetStateAction<CalculateShippingCostResponse[]>
  >
  selectedCourier: CalculateShippingCostResponse | null
  setSelectedCourier: Dispatch<
    SetStateAction<CalculateShippingCostResponse | null>
  >
}

const ShippingFormContext = createContext<TShippingFormContext | null>(null)

const useShippingFormContext = () => {
  const ctx = useContext(ShippingFormContext)
  if (!ctx) {
    throw new Error('must be wrapped inside ShippingForm Context Provider')
  }
  return ctx
}

export default function ShippingForm({
  children,
  carts,
}: {
  children: ReactNode
  carts: Cart[]
}) {
  const [targetProvince, setTargetProvince] = useState<null | ShippingResponse>(
    null
  )
  const [targetCity, setTargetCity] = useState<null | ShippingResponse>(null)
  const [targetDistrict, setTargetDistrict] = useState<null | ShippingResponse>(
    null
  )
  const [targetAddress, setTargetAddress] = useState('')
  const [availableCouriers, setAvailableCouriers] = useState<
    CalculateShippingCostResponse[]
  >([])
  const [selectedCourier, setSelectedCourier] =
    useState<CalculateShippingCostResponse | null>(null)

  return (
    <ShippingFormContext.Provider
      value={{
        carts,
        setTargetCity,
        setTargetDistrict,
        setTargetProvince,
        targetCity,
        targetDistrict,
        targetProvince,
        setTargetAddress,
        targetAddress,
        availableCouriers,
        setAvailableCouriers,
        selectedCourier,
        setSelectedCourier,
      }}
    >
      {children}
    </ShippingFormContext.Provider>
  )
}
/**
 * it will be hide after fetching available couriers
 */
ShippingForm.Destination = ({ children }: { children: ReactNode }) => {
  const { availableCouriers } = useShippingFormContext()
  return (
    <div
      className={cn(
        'w-full space-y-4',
        availableCouriers.length > 0 ? 'hidden' : 'block'
      )}
    >
      {children}
    </div>
  )
}

ShippingForm.SelectProvince = () => {
  const { data, isPending } = useQuery(provincesQueryOptions)
  const { setTargetProvince } = useShippingFormContext()
  return (
    <ShippingSelect
      isPending={isPending}
      label="Province"
      options={data?.provinces ?? []}
      setter={setTargetProvince}
    />
  )
}

ShippingForm.SelectCity = () => {
  const { setTargetCity, targetProvince } = useShippingFormContext()
  const { data, isPending } = useQuery(citiesQueryOptions(targetProvince?.id))
  return (
    <ShippingSelect
      isPending={isPending}
      label="City"
      options={data?.cities ?? []}
      setter={setTargetCity}
    />
  )
}

ShippingForm.SelectDistrict = () => {
  const { setTargetDistrict, targetCity } = useShippingFormContext()
  const { data, isPending } = useQuery(districtsQueryOptions(targetCity?.id))
  return (
    <ShippingSelect
      isPending={isPending}
      label="District"
      options={data?.districts ?? []}
      setter={setTargetDistrict}
    />
  )
}

ShippingForm.InputHomeAddress = () => {
  const { targetAddress, setTargetAddress } = useShippingFormContext()
  return (
    <Field>
      <Label className="text-sm/6 font-medium text-foreground">
        Home Address
      </Label>
      <Textarea
        value={targetAddress}
        onChange={(e) => setTargetAddress(e.target.value)}
        placeholder="Additional detail home address"
        className="w-full h-24 mt-1 resize-none bg-foreground/5 text-foreground rounded-lg p-2 outline-none focus:ring focus:ring-foreground/20 transition-colors duration-200"
      />
    </Field>
  )
}

ShippingForm.FindShippingServiceButton = () => {
  const { targetDistrict, carts, setAvailableCouriers } =
    useShippingFormContext()
  const { isPending, mutateAsync } = useCostMutation()
  const totalWeight = carts.reduce((pv, cv) => {
    pv += cv.quantity * cv.product.weight
    return pv
  }, 0)
  const find = async () => {
    if (!targetDistrict) {
      return
    }
    const result = await mutateAsync({
      destinationId: targetDistrict?.id,
      originId: 4240,
      weight: totalWeight,
    })
    setAvailableCouriers(result.costs)
  }
  return (
    <div className="mt-4">
      <button
        onClick={find}
        disabled={isPending}
        className="bg-foreground disabled:brightness-75 text-background w-full rounded-2xl py-2 font-medium hover:bg-foreground/90 transition-colors ease-in duration-100"
      >
        {isPending ? 'loading...' : 'Find Couriers'}
      </button>
    </div>
  )
}

ShippingForm.AvailableCouriers = () => {
  const { availableCouriers, selectedCourier, setSelectedCourier } =
    useShippingFormContext()
  return (
    <RadioGroup
      value={selectedCourier}
      onChange={setSelectedCourier}
      aria-label="Courier"
      className="space-y-2"
    >
      {availableCouriers.map((ac, i) => (
        <Radio
          key={i}
          value={ac}
          className="flex items-end justify-between hover:bg-foreground/5 transition-colors ease-in duration-100 px-4 py-2 rounded-lg cursor-pointer data-checked:bg-white/10"
        >
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{ac.name}</span>
            <span className="text-sm">{ac.service}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm italic font-bold">{ac.etd}</span>
            <span className="text-sm">{formatToIdr(ac.cost)}</span>
          </div>
        </Radio>
      ))}
    </RadioGroup>
  )
}

ShippingForm.PickCourier = ({ callback }: { callback?: VoidFunction }) => {
  const { selectedCourier, availableCouriers, targetAddress } =
    useShippingFormContext()
  const qc = useQueryClient()
  const chooseCourier = () => {
    if (!selectedCourier) {
      toast.error('selected courier is missing')
      return
    }
    const shipping: Shipping = {
      ...selectedCourier,
      address: targetAddress,
    }
    qc.setQueryData([cacheKey.cart.shipping], shipping)
    toast.success('courier selected')
    if (callback) {
      callback()
    }
  }
  return (
    <div
      onClick={chooseCourier}
      className={cn('my-4', availableCouriers.length > 0 ? 'block' : 'hidden')}
    >
      <button className="bg-foreground disabled:brightness-75 text-background w-full rounded-2xl py-2 font-medium hover:bg-foreground/90 transition-colors ease-in duration-100">
        Pick Courier
      </button>
    </div>
  )
}

type ShippingSelectProps = {
  isPending: boolean
  options: ShippingResponse[]
  label: string
  setter: (value: ShippingResponse) => void
}
const ShippingSelect = ({
  isPending,
  label,
  options,
  setter,
}: ShippingSelectProps) => {
  const handleChange = (value: string) => {
    const data = value.split('_')
    const id = data[0]
    const name = data[1]
    setter({
      id: parseInt(id),
      name,
    })
  }
  return (
    <div className="w-full">
      <Field disabled={isPending}>
        <Label className="text-sm/6 font-medium text-foreground">{label}</Label>
        <div className="relative">
          <Select
            onChange={(e) => handleChange(e.target.value)}
            className={clsx(
              'mt-1 block w-full appearance-none rounded-lg border-none bg-foreground/5 px-3 py-1.5 text-sm/6 text-foreground',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-foreground/25',
              // Make the text of each option black on Windows
              '*:text-background'
            )}
          >
            <option value={undefined}>-- Select {label}</option>
            {options?.map((o, i) => (
              <option
                className="text-white"
                key={i}
                value={`${o.id}_${o.name}`}
              >
                {o.name}
              </option>
            ))}
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-foreground/60"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  )
}
