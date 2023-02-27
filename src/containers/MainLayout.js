import Div from 'components/Div';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Req from 'utils/Req';
import { AiFillHome } from 'react-icons/ai'
import Button from 'components/Button';
import { FaCog } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'

const MainLayout = () => {
    const [apis, setApis] = React.useState([])
    const navigate = useNavigate()
    React.useEffect(() => {
        fetchMenu()
    }, [])
    const fetchMenu = async () => {
        const result = await Req('get', { url: '/__interfaces' })
        setApis(result.data.sort((a, b) => a.title > b.title ? 1 : -1))
    }
    return (
        <Container>
            <Div c="inner_wrap">
                <Div id="main_menu">
                    <Div c="menu_top">
                        {/* <img src='/images/logo.png' /> */}
                        <span>Dashboard</span>
                    </Div>
                    <Div c="menu_middle" data-scrollable>{apis.map(m => <Button onClick={() => navigate(`/${m.api}`)} key={m.api}><AiFillHome />{m.title}</Button>)}</Div>
                    <Div c="menu_bottom">
                        <Div c='user_wrapper'>
                            <img className='profile_img' src="/images/user.png" />
                            <Div c='name'>Nyambayar Saintogtokh</Div>
                            <Div c='email'>nyambayar.saint@gmail.com</Div>
                        </Div>
                        <Div c='operation_wrapper'>
                            <Button className='operation' kind="ripple"><FaCog /></Button>
                            <Button className='operation' kind="ripple"><ImExit /></Button>
                        </Div>
                    </Div>
                </Div>
                <Div id="main_outlet_root" data-scrollable>
                    <Outlet />
                </Div>
            </Div>
        </Container>
    )
};

export default MainLayout;

const Container = styled.div`
    background:rgba(0, 0, 0, 0.1);
    padding:30px;
    height:100vh;
    width:100vw;
    .inner_wrap{
        display: flex;
        background: white;
        border-radius: 30px;
        height: 100%;
        width: 100%;
        box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px 0px;
        box-sizing: border-box;
        padding: 50px;
        gap:30px;
        #main_outlet_root{
            width:100%;
            height:100%;
            max-height:100%;
            overflow:hidden;
            overflow-y:scroll;
        }
        #main_menu{
            .menu_top{
                padding-bottom:15px;
                margin-bottom:15px;
                display:flex;
                align-items:center;
                img{
                    width:50px;
                    height:50px;
                    object-fit:cover;
                    margin-right:4px;
                    margin-top:-2px;
                }
                span{
                    font-size:23px;
                    // text-transform:uppercase;
                    font-weight:600;
                    // border-bottom:1px solid black;
                    width:100%;
                    // opacity:0.5;
                }
            }
            .menu_middle{
                height:calc(100% - (211px + 61px + 15px));
                overflow:hidden;
                overflow-y:scroll;
                padding-right:15px;
                button{
                    width:100%;
                    justify-content:flex-start;
                    border:none;
                    color: rgba(0,0,0,0.6);
                    padding:10px 16px;
                    border-radius:6px;
                    font-weight:500;
                    margin-bottom:10px;
                    cursor:pointer;
                    transition:0.3s ease;
                    white-space:nowrap;
                    &.active,&:hover{
                        background:black;
                        color:white;
                    }
                }
            }
            .menu_bottom{
                padding-top:30px;
                display:flex;
                flex-direction:column;
                gap:30px;
                .user_wrapper{
                    display:flex;
                    flex-direction:column;
                    gap:10px;
                    align-items:center;
                    .profile_img{
                        width:50px;
                        height:50px;
                        object-fit:cover;
                        border-radius:100%;
                        margin-bottom:5px;
                        border:1px solid rgba(0,0,0,0.2);
                        filter:grayscale(1);
                    }
                    .name{
                        font-weight:600;
                    }
                    .email{
                        font-weight:500;
                        opacity:0.6;
                    }
                }
                .operation_wrapper{
                    display:flex;
                    justify-content:space-around;
                    .operation{
                            padding:12px;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            border-radius:10px;
                            cursor:pointer;
                            position:relative;
                            overflow:hidden;
                            border:1px solid rgba(0,0,0,0.15);
                            svg{
                                font-size:18px;
                            }
                    }
                }
            }
        }
    }
`