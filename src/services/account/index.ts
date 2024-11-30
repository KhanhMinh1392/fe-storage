import axiosInstance from '@/lib/axiosIntance';

interface IAccountInfoRes {
  id: string;
  email: string;
  fullName: string;
}

export const getAccountInfo = async (): Promise<IAccountInfoRes> => {
  const url = '/auth/info';
  return await axiosInstance.get(url);
};
