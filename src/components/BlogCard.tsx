import React from 'react'
const BlogCard = () => {
    return (
        <div className="my-5 max-w-sm w-[20rem] bg-whiterounded-sm shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative">
                <img
                    className="h-[22rem] opacity-75"
                    src="https://www.ghidini1961.com/uploads/prodotti/124/frame_dining_table_parallax.jpg"
                    alt=""
                />
                <div className="absolute bottom-0 px-2">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-800">
                            Noteworthy technology acquisitions 2021
                        </h5>
                    </a>
                    <p className="mb-3 text-[15px] text-gray-700 dark:text-gray-100">
                        Here are the biggest enterprise technology acquisitions
                        of 2021 so far, in reverse chronological order.
                    </p>
                </div>
            </div>
            <div className="bg-gray-200 text-gray-600  py-4">
                <p className="pl-3 font-bold mb-2">December 3, 2023 4:55 PM</p>
                <div className="flex  px-2  ">
                    <p className="flex space-x-1 cursor-pointer items-center hover:text-gray-500 hover:underline">
                        <img src="assets/images/icons/person.svg" />
                      <span>Admin</span>
                    </p>
                    <p className="flex space-x-1 cursor-pointer ml-8 items-center">
                        <img
                            src="assets/images/icons/message.svg"
                            width="20px"
                            height="20px"
                        />
                       <span>0</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
