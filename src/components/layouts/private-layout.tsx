import { Progress } from '@nextui-org/progress';
import { PropsWithChildren, Suspense } from 'react';
import Header from '../header';
import Icon from '../icon';
import Sidebar from '../sidebar';

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen gap-2.5 overflow-hidden">
      <aside className="min-w-[17rem] text-white">
        <h1 className="flex items-center gap-4 bg-gray-900 px-6 py-5 text-xl font-bold text-inherit">
          <Icon name="mountain" className="h-6 w-6" />
          STORAGE
        </h1>
        <div className="flex h-[calc(100%-60px)] flex-col justify-between bg-gray-800 p-5">
          <Sidebar />
          <div className="mx-auto w-52">
            <div className="flex items-center gap-1.5">
              <Icon name="cloud" width={36} height={36} />
              <p className="text-lg">My Storage</p>
            </div>
            <Progress
              aria-label="Loading..."
              value={40}
              className="my-2 max-w-md"
              classNames={{
                indicator: 'bg-gray-400',
                track: 'bg-white h-2',
              }}
            />
            <p className="text-[13px]">You have used 5 GB out of 15 GB.</p>
          </div>
        </div>
      </aside>
      <div className="mt-1 flex-1">
        <Header />
        <main className="h-full p-5">
          <Suspense fallback="Loading...">{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
