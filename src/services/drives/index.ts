import { API_PATH } from '@/constants/apis';
import axiosInstance from '@/lib/axiosIntance';
import { IRes } from '@/types/common';

export interface IDrive {
  id: number;
  name: string;
  type: 'folder';
  parent_id: number;
  user_id: number;
  url: null;
  metadada: null;
  created_at: string;
  updated_at: string;
  size: string;
}

export const getDrives = async (id?: string): Promise<IRes<IDrive>> => {
  const url = API_PATH.DRIVES;
  return await axiosInstance.get(url, { params: { parent_id: id } });
};
