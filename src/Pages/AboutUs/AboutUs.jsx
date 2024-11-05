
const AboutUs = () => {
    return (
        <div>
            <div className="bg-[#2f9995] text-white text-center h-[500px]">
                <h2 className=" text-6xl font-semibold pt-20 pb-5">About Us</h2>
                <p>World wide Availability</p>
                <div className="flex justify-center mt-5">
                    <img src="map.png" alt="" className="" />
                </div>
            </div>
            <div className="w-11/12 mx-auto">
                <div className="flex gap-10 pt-72">
                    <img src="1.png" alt="" />
                    <div>
                        <h3 className="text-center font-semibold text-2xl pb-5">Expanding our reach into the Northwest while maintaining the core of who we are.</h3>
                        <p className="text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br /> <br />Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="pt-20">
                    <h2 className="text-center text-[#2f9995] font-semibold text-5xl pb-10">Our Mission</h2>
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-center font-semibold text-2xl pb-5">Making a difference for educators and school districts.</h3>
                            <p className="text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br /><br /> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br /><br />Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div>
                            <div className="flex gap-3 pb-3">
                                <img src="2.png" alt="" />
                                <img src="3.png" alt="" />
                            </div>
                            <div>
                                <img src="4.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;