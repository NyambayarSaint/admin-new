import React from 'react';
import styled from 'styled-components';
import Div from 'components/Div';

const TableHeader = ({ title, children }) => {
    return (
        <Container>
            <Div c="left_wrap">
                <Div c="maintitle">{title}</Div>
                <Div c="helpertitle">Lists of {title}</Div>
            </Div>
            <Div c="right_wrap">
                {children}
            </Div>
        </Container>
    );
};

export default TableHeader;

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:30px;
    .left_wrap{
        .maintitle{
            font-size:28px;
            font-weight:bold;
            margin-bottom:10px;
        }
        .helpertitle{
            opacity:0.8;
        }
    }
    .right_wrap{

    }
`