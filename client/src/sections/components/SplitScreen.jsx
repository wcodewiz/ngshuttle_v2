import React from 'react'
import { LayoutStyle } from '../../core/enums/main';

export const SplitScreen = ({ children, styles, height }) => {
    const [top, left, content, right] = children;

    const TopLeftContent = () => {
        return <section style={{ height: `${height}` }} className='flex flex-col w-full'>
            {top && <div className='w-full'>{top}</div>}
            <div className='flex justify-between'>
                {left && <div>{left}</div>}
                {content && <div>{content}</div>}
            </div>
        </section>
    }



    const ContentTopLeft = () => {
        return <section style={{ height: `${height}` }} className='flex flex-col w-full'>
            {content && <div className='w-full'>{content}</div>}
            <div className='flex flex-col'>
                {top && <div>{top}</div>}
                {left && <div>{left}</div>}
            </div>
        </section>
    }
    const LeftContentTop = () => {
        return <section style={{ height: `${height}` }} className='flex justify-between w-full'>
            {left && <div className='w-full'>{left}</div>}
            <div className='flex flex-col'>
                {content && <div>{content}</div>}
                {top && <div>{top}</div>}
            </div>
        </section>
    }

    const RightTopContent = () => {
        return <section style={{ height: `${height}` }} className='flex justify-between w-full'>
            <div className='flex flex-col'>
                {top && <div>{top}</div>}
                {content && <div>{content}</div>}
            </div>
            {right && <div className='w-full'>{right}</div>}
        </section>
    }
    const ContentRightTop = () => {
        return <section style={{ height: `${height}` }} className='flex flex-col w-full'>
            <div className='flex justify-between'>
                {content && <div>{content}</div>}
                {right && <div className='w-full'>{right}</div>}
            </div>
            {top && <div>{top}</div>}

        </section>
    }
    const TopContentRight = () => {
        return <section style={{ height: `${height}` }} className='flex flex-col w-full'>
            {top && <div>{top}</div>}
            <div className='w-full'>
                {content && <div>{content}</div>}
            </div>
            {right && <div className='w-full'>{right}</div>}

        </section>
    }

    const TopLeftContentRight = () => {
        return <section style={{ height: `${height}` }} className='flex flex-col w-full'>
            {top && <div className='w-full'>{top}</div>}
            <div className='flex justify-between'>
                {left && <div className='w-1/6'>{left}</div>}
                <div className='flex justify-between w-5/6'>
                    {content && <div className='w-5/6'>{content}</div>}
                    {right && <div className='w-1/6'>{right}</div>}
                </div>
            </div>
        </section>
    }
    const ContentRightTopLeft = () => {
        return <section style={{ height: `${height}` }} className='flex flex-col w-full'>
            <div className='flex justify-between'>
                {content && <div className='w-full'>{content}</div>}
                {right && <div>{right}</div>}
            </div>
            <div className='flex justify-between'>
                {top && <div>{top}</div>}
                {left && <div>{left}</div>}
            </div>

        </section>

    }
    const RightContentLeftTop = () => {
        return <section style={{ height: `${height}` }} className='flex flex-col w-full'>
            <div className='flex justify-between'>
                {right && <div>{right}</div>}
                {content && <div className='w-full'>{content}</div>}
            </div>
            <div className='flex justify-between'>
                {left && <div>{left}</div>}
                {top && <div>{top}</div>}
            </div>

        </section>

    }
    const LeftTopRightContent = () => {
        return <section style={{ height: `${height}` }} className='flex flex-col w-full'>
            {top && <div>{top}</div>}
            <div className='flex justify-between'>
                {left && <div>{left}</div>}
                {content && <div className='w-full'>{content}</div>}
                {right && <div>{right}</div>}
            </div>
        </section>

    }

    switch (styles) {
        case LayoutStyle.TOP_LEFT_CONTENT:
            return <div className='w-full'>{TopLeftContent()}</div>
        case LayoutStyle.LEFT_CONTENT_TOP:
            return <div className='w-full'>{LeftContentTop()}</div>
        case LayoutStyle.CONTENT_TOP_LEFT:
            return <div className='w-full'>{ContentTopLeft()}</div>

        case LayoutStyle.RIGHT_TOP_CONTENT:
            return <div className='w-full'>{RightTopContent()}</div>
        case LayoutStyle.CONTENT_RIGHT_TOP:
            return <div className='w-full'>{ContentRightTop()}</div>
        case LayoutStyle.TOP_CONTENT_RIGHT:
            return <div className='w-full'>{TopContentRight()}</div>

        case LayoutStyle.CONTENT_RIGHT_TOP_LEFT:
            return <div className='w-full'>{ContentRightTopLeft()}</div>
        case LayoutStyle.LEFT_TOP_RIGHT_CONTENT:
            return <div className='w-full'>{LeftTopRightContent()}</div>
        case LayoutStyle.RIGHT_CONTENT_LEFT_TOP:
            return <div className='w-full'>{RightContentLeftTop()}</div>
        case LayoutStyle.TOP_LEFT_CONTENT_RIGHT:
            return <div className='w-full'>{TopLeftContentRight()}</div>
        default:
            return <div className='w-full'>{TopLeftContentRight()}</div>
    }

}
