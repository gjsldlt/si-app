import SidebarComponent from '../sidebarComponent';

export default function Layout({ children }: LayoutProps) {

  return (
    <div>
      <SidebarComponent />
      <div className='sm:ml-20 sm:mr-4'>{children}</div>
    </div>
  );
}

type LayoutProps = {
  children: any;
};
