import StyledComponentsRegistry from "@/lib/registry"
import WalletProvider from '@/components/WalletProvider'
import { UserProvider } from "@/hooks/useUser"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({
    children,
  }: {
    children: React.ReactNode
  }){
    return(
        <StyledComponentsRegistry>
            <WalletProvider>
                <UserProvider>
                    {children}
                    <ToastContainer/>
                </UserProvider>
            </WalletProvider>
        </StyledComponentsRegistry>
    )
}