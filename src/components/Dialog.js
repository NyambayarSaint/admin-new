import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import Button from './Button';

const Dialog = ({ title, onClose, children, submit }) => {
    const itself = React.useRef()
    const handleClose = () => {
        itself.current.classList.add('unfade')
        setTimeout(() => {
            onClose()
        }, 300);
    }
    return (
        <Container onClick={(e) => e.target === itself.current && handleClose()} ref={itself}>
            <div data-scrollable className='main_wrap'>
                <div className='top_bar'>
                    <div className='title_wrap'>{title}</div>
                    <AiOutlineClose onClick={handleClose} />
                </div>
                <div className='content_wrap'>
                    {children}
                </div>
                <div className='bottom_wrap'>
                    <Button onClick={handleClose} color="inherit" style={{ marginLeft: 'auto', marginRight: 10 }}>Хаах</Button>
                    {submit ?? ''}
                </div>
            </div>
        </Container>
    );
};

export default Dialog;

const Container = styled.div`
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background: hsl(240 3.8% 46.1% / 33%);
	animation: fade-in 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    @-webkit-keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}
    @-webkit-keyframes fade-out{0%{opacity:1}100%{opacity:0}}@keyframes fade-out{0%{opacity:1}100%{opacity:0}}
    display:flex;
    justify-content:center;
    align-items:center;
    &.unfade{
        animation: fade-out 0.3s ease-out both !important;
    }
    .main_wrap{
        padding:30px;
        background:white;
        border-radius:4px;
        min-width:400px;
        max-height:80vh;
        overflow-y:scroll;
        .top_bar{
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding-bottom:15px;
            border-bottom:1px solid rgba(0,0,0,0.03);
            .title_wrap{
                font-size:16px;
            }
            svg{
                font-size:20px;
                margin-top:-2px;
                cursor:pointer;
            }
        }
        .content_wrap{
            margin-top:30px;
            margin-bottom:30px;
        }
        .bottom_wrap{
            padding-top:15px;
            display:flex;
        }
    }
    
`