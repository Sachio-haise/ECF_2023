import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm'
import DeleteUserForm from './partials/DeleteUserForm'
import UpdatePasswordForm from './partials/UpdatePasswordForm'

const Profile = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profile
                </h2>
            }>
            <Head>
                <title>Profile</title>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>

            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-gray-200 shadow-lg rounded-md">
                        <div className="">
                            <UpdateProfileInformationForm />
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-200 shadow-lg rounded-md ">
                        <div className="">
                           <UpdatePasswordForm />
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-200 shadow-lg rounded-md ">
                        <div className="">
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Profile
