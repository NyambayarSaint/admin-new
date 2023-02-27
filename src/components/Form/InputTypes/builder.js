import Button from 'components/Button';
import Div from 'components/Div';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styledComponents from 'styled-components';

const Builder = ({ api, fieldName, instance, forwardChange }) => {
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        navigate(`/builder?api=${api}&slug=${instance.slug}`)
    }
    return (
        <Container>
            <Button onClick={handleClick}>
                <img id='builder-btn-img' src='/images/builder.webp' />
                <Div c="hidden-content"><Div>Open Page Builder</Div></Div>
            </Button>
        </Container>
    );
};

export default Builder;

const Container = styledComponents.div`
    button{
        padding:8px 12px;
        #builder-btn-img{
            width:100%;
            object-fit:cover;
        }
        .hidden-content{
            position:absolute;
            top:0;
            bottom:0;
            left:0;
            right:0;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.3s ease;
            div{
                padding:8px 12px;
                background:black;
                border-radius:4px;
                color:white;
                opacity:0;
                transition:0.3s ease;
            }
        }
        &:hover{
            .hidden-content{
                background:rgba(0,0,0,0.7);
                div{
                    opacity:1;
                }
            }
        }
    }
`