import { PropsWithChildren, ReactNode } from 'react'
import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import Header from './Client/Header'
import Footer from './Client/Footer'
interface Props {
    header: ReactNode
}

const AppLayout = ({ header, children }: PropsWithChildren<Props>) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-gray-200 ">
          {/*  <Header {...user} />*/}
          <Header/>

            {/* Page Heading
            <header className="bg-white">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>
            */}

            {/* Page Content */}
            <main>{children}</main>

            {/* Page Footer */}

            <Footer />
        </div>
    )
}

export default AppLayout
