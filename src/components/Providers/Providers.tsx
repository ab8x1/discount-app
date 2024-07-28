import StyledComponentsRegistry from "@/lib/registry"
import WalletProvider from '@/components/WalletProvider'
import { UserProvider } from "@/hooks/useUser"

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
                </UserProvider>
            </WalletProvider>
        </StyledComponentsRegistry>
    )
}