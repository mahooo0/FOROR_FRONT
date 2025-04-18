export default function AnimationBG() {
    return (
        <>
            <img
                loading="lazy"
                src="/svg/devMap.svg"
                alt=""
                className=" absolute top-[150px]  w-auto  max-sm:hidden  "
            />
            <div className="absolute top-0 left-0 w-full max-sm:hidden ">
                <div className="relative h-[4082px] w-[100%]">
                    <div className="absolute top-0 left-0 w-full h-[calc(100%+60vh)] ">
                        <div className="w-full h-[50vh] bg-white sticky top-[60%]"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
