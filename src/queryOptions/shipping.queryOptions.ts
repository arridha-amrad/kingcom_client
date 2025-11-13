import {
  calculateShippingCost,
  fetchCities,
  fetchDistricts,
  fetchProvinces,
  type CalculateShippingCostParams,
} from '@/api/shipping.api';
import { cacheKey } from '@/constants/cacheKey';
import { queryOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const provincesQueryOptions = queryOptions({
  queryKey: [cacheKey.shipping.provinces],
  staleTime: 1000 * 60,
  queryFn: fetchProvinces,
});

export const citiesQueryOptions = (provinceId?: number | null) =>
  queryOptions({
    enabled: !!provinceId,
    queryKey: [cacheKey.shipping.cities, provinceId],
    queryFn: () => fetchCities(provinceId!),
  });

export const districtsQueryOptions = (cityId?: number | null) =>
  queryOptions({
    enabled: !!cityId,
    queryKey: [cacheKey.shipping.districts, cityId],
    queryFn: () => fetchDistricts(cityId!),
  });

export const useCostMutation = () => {
  return useMutation({
    mutationFn: (params: CalculateShippingCostParams) =>
      calculateShippingCost(params),
    onSuccess({ costs }) {
      console.log(costs);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    },
  });
};
