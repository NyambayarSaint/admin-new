import React from 'react';
import styledComponents from 'styled-components';
import { BsChevronDown } from 'react-icons/bs'
import { getBuilderContext } from '../contexts/builder';
import { AiFillBackward, AiFillHome, AiOutlineDesktop, AiOutlineLeft, AiOutlineMobile, AiOutlineTablet } from 'react-icons/ai'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { TbCornerUpLeft, TbCornerUpRight } from 'react-icons/tb'
import axios from 'axios';
import { getReferenceContext } from '../contexts/reference';
import { useNavigate } from 'react-router-dom';
import Req from 'utils/Req';

const TopBar = () => {
    const [showSelection, setShowSelection] = React.useState(false)
    const { ScreenLoader } = React.useContext(getReferenceContext)
    const { viewPort, setContext, composition, destinationApi, destinationSlug } = React.useContext(getBuilderContext)
    const navigate = useNavigate()
    const handlePublish = async () => {
        try {
            ScreenLoader.current.dispatchEvent(new CustomEvent('lockScreen'))
            const pageResult = await Req('get', { url: `/${destinationApi}?slug=${destinationSlug}` })
            const pageId = pageResult.data[0].id
            await Req('put', { url: `/${destinationApi}/${pageId}`, body: { composition } })
            ScreenLoader.current.dispatchEvent(new CustomEvent('unlockScreen'))
        } catch (e) {
            window.alert('Something gone wrong!')
            ScreenLoader.current.dispatchEvent(new CustomEvent('unlockScreen'))
        }
    }
    return (
        <Container>
            <div className='left_wrap'>
                <div className='home_wrap' onClick={() => navigate('/')}><AiOutlineLeft /></div>
                <div className='name_wrap'>
                    <span>Page Builder</span>
                </div>
                <div className='page_selection' onClick={() => setShowSelection(!showSelection)}>
                    <div className='caption'>{destinationApi}:</div>
                    <div className='name'>{destinationSlug}</div>
                    <BsChevronDown />
                    {showSelection &&
                        <div className='page_selection_wrap'>
                            <div className='selection_instance'>Not available</div>
                        </div>
                    }
                </div>
                <div className='device_selection'>
                    <div onClick={() => setContext({ viewPort: 'desktop' })} className={`device_types ${viewPort === "desktop" && 'active'}`}><AiOutlineDesktop /></div>
                    <div onClick={() => setContext({ viewPort: 'tablet' })} className={`device_types ${viewPort === "tablet" && 'active'}`}><AiOutlineTablet /></div>
                    <div onClick={() => setContext({ viewPort: 'mobile' })} className={`device_types ${viewPort === "mobile" && 'active'}`}><AiOutlineMobile /></div>
                </div>
            </div>
            <div className='right_wrap'>
                <div summary="icon"><TbCornerUpLeft /></div>
                <div summary="icon"><TbCornerUpRight /></div>
                <button summary="publish" onClick={handlePublish}>Publish</button>
                <div summary="icon"><BiDotsVerticalRounded /></div>
            </div>
        </Container>
    );
};

export default TopBar;

const Container = styledComponents.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    z-index:1;
    background:white;
    .left_wrap{
        border-bottom:1px solid rgba(0,0,0,0.1);
        flex:1;
        display:flex;
        align-items:center;
        .home_wrap{
            padding:8px 16px;
            border-right:1px solid rgba(0,0,0,0.1);
            cursor:pointer;
        }
        .name_wrap{
            font-weight:bold;
            padding:8px 16px;
            display:flex;
            align-items:center;
            gap:15px;
            border-right:1px solid rgba(0,0,0,0.1);
            img{
                height:30px;
            }
            span{
                text-transform:uppercase;
                font-weight:700;
                letter-spacing:0.5;
            }
        }
        .page_selection{
            padding:8px 16px;
            display:flex;
            align-items:center;
            cursor:pointer;
            width:fit-content;
            position:relative;
            .caption{
                margin-right:10px;
                text-transform:capitalize;
            }
            .name{
                color:rgba(0,0,0,0.6);
            }
            svg{
                margin-left:4px;
            }
            .page_selection_wrap{
                position:absolute;
                left:0px;
                top:100%;
                padding:8px 16px;
                min-width:150px;
                box-shadow:rgb(0 0 0 / 25%) 0px 2px 4px 0px;
                border:1px solid rgba(0,0,0,0.1);
                background:white;
                z-index:1;
            }
        }
        .device_selection{
            display:flex;
            align-items:center;
            .device_types{
                cursor:pointer;
                padding:8px 16px;
                &.active{
                    background:#ebf2ff;
                    color:#116dff;
                }
            }
        }
    }
    .right_wrap{
        padding-right:10px;
        display:flex;
        align-items:center;
        height:100%;
        button[summary="publish"]{
            border:none;
            color:white;
            background:rgb(56, 152, 236);
            padding:4px 32px;
            border-radius:4px;
            font-weight:500;
            font-size:14px;
            margin-left:15px;
            margin-right:15px;
            cursor:pointer;
        }
        div[summary="icon"]{
            font-size:20px;
            display:flex;
            align-items:center;
            padding:4px;
            border-radius:100%;
            &:hover{
                background:rgba(0,0,0,0.1);
                cursor:pointer;
            }
        }
    }
`