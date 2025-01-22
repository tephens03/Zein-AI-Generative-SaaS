// import Navbar from '@/components/navbar';
import SideBar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { getApiLimit } from '@/lib/api-limit';
import { ProModal } from '@/components/pro-modal';
import { checkSubscription } from '@/lib/subscription';


const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = await getApiLimit();
  const isPro = await checkSubscription();

  return (

    <div className='h-full relative'>
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] second-purple text-white' >
        <div>
          <SideBar isPro={isPro} apiLimitCount={apiLimitCount} />
        </div>
      </div>

      <main className="md:pl-72 min-h-screen dashboard">
        <Navbar />
        <ProModal />
        {children}
      </main>



    </div >

  );
}

export default DashboardLayout