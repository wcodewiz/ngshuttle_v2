import React, { useState } from 'react'
import { Shimmer } from '../../core/lib';
import { ShimmerEffectTypes } from '../../core/lib/shimmer/std';
import { List } from '../components/List';
import { NavigationAxis } from '../../core/enums/main';
import { DocImage, PDFimage } from '../../assets';
import { Badge } from '../components/Badge';

export const File = React.forwardRef((props, ref) => {
    let [files, setFiles] = useState([])
    const change = (ev) => {
        let mfiles = ev.target.files;
        let ufile = [];
        setFiles([]);
        for (let i = 0; i < mfiles.length; i++) {
            let file = mfiles[i];
            if (file.type.indexOf("image") !== -1) {
                ufile.push(<Shimmer key={i} alt={"uploaded"} className={"w-1/6 object-contain object-center rounded-md "} src={URL.createObjectURL(file)} width={100} height={64} shimmerEffectTypes={ShimmerEffectTypes.BREATHING} />)
            } else if (file.type.indexOf("pdf") !== -1) {
                ufile.push(<div className='relative w-1/6 px-2 py-2' key={i}>
                    <Shimmer alt={"uploaded"} className={"w-full object-cover object-center rounded-md"} src={PDFimage} width={100} height={64} shimmerEffectTypes={ShimmerEffectTypes.BREATHING} />
                    <Badge count={file.name} bg_color='bg-blue-400 whitespace-nowrap text-white rounded-md font-bold left-0 w-full overflow-hidden text-ellipsis' />
                </div>)
            } else if (file.type.indexOf("video") !== -1) {
                ufile.push(<video className={"w-2/6 object-cover object-center rounded-md"} controls key={i} src={URL.createObjectURL(file)} />)
            } else {
                ufile.push(<div className='relative w-1/6 px-2 py-2' key={i}>
                    <Shimmer alt={"uploaded"} className={"w-full object-cover object-center rounded-md"} src={DocImage} width={100} height={64} shimmerEffectTypes={ShimmerEffectTypes.BREATHING} />
                    <Badge count={file.name} bg_color='bg-blue-400 whitespace-nowrap text-white rounded-md font-bold left-0 w-full overflow-hidden text-ellipsis' />
                </div>)
            }
        }
        setFiles(ufile);
    }
    return <List axis={NavigationAxis.Vertical} className='justify-start'>
        <input multiple={props.isMany ?? false} tabIndex={-30} autoComplete='Off' ref={ref ?? null} name={props.name ?? ""} type={props.type ?? "text"}
            placeholder={props.placeholder ?? ""} onChange={change}
            defaultValue={props.value ?? ""} className={`bg-transparent hover:border-none focus:border-none focus:outline-none ${props.className ?? ""} `} />
        <List>
            {files && files}
        </List>
    </List>
})
