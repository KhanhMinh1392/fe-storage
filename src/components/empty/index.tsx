import React from 'react';
import EmptyBox from '@/assets/images/empty_box.svg';
import Image from 'next/image';

export default function Empty() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src={EmptyBox} alt="empty-box" className="w-auto object-cover" priority />
      <p className="text-xl font-medium">Drag and drop your file</p>
    </div>
  );
}
