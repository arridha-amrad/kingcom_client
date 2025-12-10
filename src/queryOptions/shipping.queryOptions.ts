import { fetchCities, fetchDistricts, fetchProvinces } from '@/api/shipping.api'
import { queryOptions } from '@tanstack/react-query'

export const provincesQueryOptions = queryOptions({
  queryKey: ['provinces'],
  staleTime: 1000 * 60,
  queryFn: fetchProvinces,
})

export const citiesQueryOptions = (provinceId?: number | null) =>
  queryOptions({
    enabled: !!provinceId,
    queryKey: ['cities', provinceId],
    queryFn: () => fetchCities(provinceId!),
    staleTime: 1000 * 60,
  })

export const districtsQueryOptions = (cityId?: number | null) =>
  queryOptions({
    enabled: !!cityId,
    queryKey: ['districts', cityId],
    queryFn: () => fetchDistricts(cityId!),
    staleTime: 1000 * 60,
  })
