import { ShimmerEffectTypes } from '../shimmer/std'
import { Shimmer } from "../shimmer/shimmers"




const Picture = ({ src, className, width, height, alt, containerStyle = "w-full h-full" }) => {
    return <div className={`${containerStyle}`}>
        <Shimmer src={src} className={className} width={width} height={height} alt={alt} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />
    </div>
}

export default Picture