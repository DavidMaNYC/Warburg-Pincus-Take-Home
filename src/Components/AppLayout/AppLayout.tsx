import { SideNavBar } from './SideNavBar';
export interface AppLayoutProps {
  children: React.ReactNode;
  signOut?: () => void;
}

export const AppLayout = (props: AppLayoutProps) => {
  const { signOut, children } = props;
  return (
    <div className='flex w-screen h-screen'>
      <SideNavBar signOut={signOut} />
      <div className='flex flex-col flex-1 p-10 w-full'>{children}</div>
    </div>
  );
};
