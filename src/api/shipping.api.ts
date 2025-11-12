import { publicAxios } from '@/lib/axiosInterceptor';

export const fetchProvinces = async () => {
  try {
    const res = await publicAxios.get('/shipping/provinces');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCities = async (provinceId: number) => {
  try {
    const res = await publicAxios.get(`/shipping/cities/${provinceId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchDistricts = async (cityId: number) => {
  try {
    const res = await publicAxios.get(`/shipping/districts/${cityId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

type CalculateShippingCostParams = {
  originId: number;
  destinationId: number;
  weight: number; // in gram
};
export const calculateShippingCost = async (
  params: CalculateShippingCostParams,
) => {
  try {
    const res = await publicAxios.post(`/shipping/cost`, params);
    return res.data;
  } catch (err) {
    throw err;
  }
};
