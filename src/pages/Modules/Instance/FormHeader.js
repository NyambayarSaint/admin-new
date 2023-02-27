import Div from 'components/Div';
import React from 'react';
import styled from 'styled-components';
import { BiChevronLeft } from 'react-icons/bi'
import Button from 'components/Button';
import { AiOutlineSave, AiOutlineDelete, AiOutlineUndo } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const FormHeader = ({ id, api, onSave, onDelete, onReset }) => {
    const navigate = useNavigate()
    const handleDelete = () => {
        if (window.confirm('Are you sure ?')) {
            onDelete()
            navigate(-1)
        }
    }
    return (
        <Container>
            <Div c="left_wrap">
                <Div c="back_button" onClick={() => navigate(`/${api}`)}><Button><BiChevronLeft /></Button></Div>
                <Div c="maintitle">{id}</Div>
            </Div>
            <Div c="right_wrap">
                <Button onClick={onReset}><AiOutlineUndo /> Reset</Button>
                <Button color="red" onClick={handleDelete}><AiOutlineDelete /> Delete</Button>
                <Button onClick={onSave} bg="black" color="white"><AiOutlineSave /> Save</Button>
            </Div>
        </Container>
    );
};

export default FormHeader;

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    .left_wrap{
        display:flex;
        align-items:center;
        gap:15px;
        .back_button{
            button{
                width:40px;
                height:40px;
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:10px;
                border:1px solid rgba(0,0,0,0.2);
                cursor:pointer;
                position:relative;
                overflow:hidden;
                svg{
                    font-size:30px;
                }
            }
        }
    }
    .right_wrap{
        display:flex;
        gap:15px;
    }
`