import PublicLayoutShell from '@/shared/layouts/PublicLayoutShell';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <PublicLayoutShell>{children}</PublicLayoutShell>;
};

export default Layout;
