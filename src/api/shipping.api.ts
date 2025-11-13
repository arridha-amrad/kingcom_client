import { publicAxios } from '@/lib/axiosInterceptor';

export type ShippingResponse = {
  id: number;
  name: string;
};

export const fetchProvinces = async () => {
  try {
    const res = await publicAxios.get<{ provinces: ShippingResponse[] }>(
      '/shipping/provinces',
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCities = async (provinceId: number) => {
  try {
    const res = await publicAxios.get<{ cities: ShippingResponse[] }>(
      `/shipping/cities/${provinceId}`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchDistricts = async (cityId: number) => {
  try {
    const res = await publicAxios.get<{ districts: ShippingResponse[] }>(
      `/shipping/districts/${cityId}`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export type CalculateShippingCostParams = {
  originId: number;
  destinationId: number;
  weight: number; // in gram
};

export type CalculateShippingCostResponse = {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
};
export const calculateShippingCost = async (
  params: CalculateShippingCostParams,
) => {
  try {
    const res = await publicAxios.post<{
      costs: CalculateShippingCostResponse[];
    }>(`/shipping/cost`, params);
    return res.data;
  } catch (err) {
    throw err;
  }
};
