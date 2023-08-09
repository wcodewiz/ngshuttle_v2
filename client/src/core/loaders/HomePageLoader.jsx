import { Shimmer } from '../../lib'
import { ShimmerEffectTypes } from '../../lib/shimmer/std'

const HomePageLoader = () => {
    return (
        <div className='overflow-hidden'>

            <div>
                <Shimmer width={window.screen.width} height={80} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />

                <div className="px-2 py-2 w-full h-screen shadow-md bg-slate-200">
                    <Shimmer width={20} height={20} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />
                    <div className="flex justify-between px-4 w-full">
                        <div className="px-1 w-2/6 bg-gray-100 rounded-md h-screen">
                            <div>
                                <Shimmer width={400} height={200} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />
                            </div>
                            <div className="px-4 py-1 w-full">
                                <h4 className="font-bold px-4 text-black py-2 bg-gray-200 rounded-md w-full"><Shimmer width={200} height={50} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} /></h4>
                                <div className="px-4 py-2 mt-4 flex justify-between ">
                                    <div className="flex flex-col">
                                        <Shimmer width={150} height={400} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />

                                    </div>
                                    <div className="flex flex-col">
                                        <Shimmer width={150} height={400} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />

                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="px-1 w-3/6 bg-gray-100 mx-2">
                            <Shimmer width={600} height={600} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />

                        </div>
                        <div className="px-2 w-1/6 bg-gray-100 rounded-md h-screen">
                            <Shimmer width={180} height={600} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HomePageLoader