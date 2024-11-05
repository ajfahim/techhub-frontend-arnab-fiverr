
const ContactUs = () => {
    return (
        <div>
            <div className="bg-[url('contact-us-banner.png')] bg-cover">
                <h2 className="bg-[#2f9995] bg-opacity-50 text-white text-6xl font-semibold text-center py-96">Contact Us</h2>
            </div>
            <div className="text-center py-10 w-11/12 mx-auto">
                <h2 className="text-3xl font-semibold">Would you like us to contact you?</h2>
                <h2 className="text-3xl font-semibold text-[#2f9995] py-5">We’re always in touch</h2>
                <form action="" className="custom-shadow text-left p-5 rounded-md">
                    <div className="grid grid-cols-2 gap-10 w-3/5 mx-auto">
                        <div>
                            <p>First Name</p>
                            <input type="text" className="border rounded w-full p-2 mt-1" placeholder="First Name" />
                        </div>
                        <div>
                            <p>Last Name</p>
                            <input type="text" className="border rounded w-full p-2 mt-1" placeholder="Last Name" />
                        </div>
                        <div>
                            <p>Phone Number</p>
                            <input type="text" className="border rounded w-full p-2 mt-1" placeholder="Phone Number" />
                        </div>
                        <div>
                            <p>Email</p>
                            <input type="text" className="border rounded w-full p-2 mt-1" placeholder="Email" />
                        </div>
                        <div className="col-span-2">
                            <p>Message</p>
                            <textarea name="" id="" className="border rounded w-full p-2 mt-1 h-40" placeholder="Message"></textarea>
                        </div>
                    </div>
                    <div className="text-center pt-5">
                        <button className="bg-[#2f9995] text-white text-center px-6 py-2 rounded-md">Message</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;