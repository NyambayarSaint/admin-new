import React from 'react';
import styledComponents from 'styled-components';
import { CgArrowsMergeAltH } from 'react-icons/cg'
import { BiArrowToLeft, BiArrowFromLeft, BiMoveHorizontal } from 'react-icons/bi'

const baseAlignments = [
    { title: 'Full width', icon: <BiMoveHorizontal /> },
    { title: 'Align to the left side', icon: <BiArrowToLeft /> },
    { title: 'Center horizontally', icon: <CgArrowsMergeAltH /> },
    { title: 'Align to the right side', icon: <BiArrowFromLeft /> },
]

const Layout = () => {
    return (
        <Container>
            <span>Align</span>
            {baseAlignments.map(x => <div key={x.title} title={x.title}>{x.icon}</div>)}
        </Container>
    );
};

export default Layout;

const Container = styledComponents.div`
    display:flex;
    align-items:center;
    padding:4px 8px;
    border:1px solid rgba(0,0,0,0.1);
    background:rgba(0,0,0,0.03);
    border-radius:5px;
    font-size:12px;
    gap:8px;
    color:rgba(0,0,0,0.6);
    span{
        font-weight:bold;
        text-transform:uppercase;
        margin-right:10px;
        margin-top:2px;
        cursor:default;
        font-size:11px;
    }
    div{
        padding:4px;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:100%;
        svg{
            font-size:16px;
        }
        &:hover{
            cursor:pointer;
            background:rgba(0,0,0,0.1);
        }
    }
`