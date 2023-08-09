import React from 'react'
import { SplitScreen } from '../sections/components/SplitScreen'
import { LayoutStyle } from '../core/enums/main'
import { Header } from '../sections/components/Header'
import { LeftSideBar } from '../sections/components/LeftSideBar'
import { RightSideBar } from '../sections/components/RightSideBar'
import { Engine } from '../sections/components/Engine'

const GuestLayout = ({ children }) => {
    const [home, below] = children
    return (
        <div>
            <Engine />
            <SplitScreen height={"100%"} styles={LayoutStyle.TOP_LEFT_CONTENT_RIGHT}>
                <Header />
                <div className='relative left-20'>
                    <LeftSideBar />
                </div>
                <div className='relative left-21'>
                    {home}
                </div>
                <RightSideBar />

            </SplitScreen>
            {below}
        </div>
    )
}

export default GuestLayout