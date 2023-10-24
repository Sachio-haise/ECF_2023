
import React, {useState, useEffect} from 'react';
import { useAuth } from '@/hooks/auth'


function GoogleCallback() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({});
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState<any>([])
    const [shouldRemember, setShouldRemember] = useState(false)
    const [status, setStatus] = useState<string | null>(null)
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })


    // On page load, we take "search" parameters
    // and proxy them to /api/auth/callback on our Laravel API
    useEffect(() => {

        fetch(`http://localhost/api/auth/callback${location.search}`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setData(data);
                const {email,google_id} = data?.user;
                console.log(email)
                console.log(google_id)
                login({
                    email,
                    password:google_id,
                    remember: shouldRemember,
                    setErrors,
                    setStatus,
                })
            });
    }, []);

    // Helper method to fetch User data for authenticated user
    // Watch out for "Authorization" header that is added to this call
    // function fetchUserData() {
    //     fetch(`http://localhost/api/user`, {
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer ' + data.access_token,
    //         }
    //     })
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setUser(data);
    //         });
    // }

    if (loading) {
        return <DisplayLoading/>
    }
    // else {
    //     if (user != null) {
    //         return <DisplayData />
    //     } else {
    //         return (
    //             <div>
    //                 <DisplayData/>
    //                 <div style={{marginTop:10}}>
    //                     <button onClick={fetchUserData}>Fetch User</button>
    //                 </div>
    //             </div>
    //         );
    //     }
    // }
}

function DisplayLoading() {
    return <div className='bg-gray-700 w-full min-h-screen'>
    <div className="loader-custom">Loading...</div>
    </div>;
}

function DisplayData() {
    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
                <div className="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                    404
                </div>

                <div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                    Not Found
                </div>
            </div>
        </div>
    </div>
    );
}

export default GoogleCallback;
