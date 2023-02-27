import React from 'react';
import styledComponents from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai'
import { getBuilderContext } from '../contexts/builder';
import * as ExpansionComponents from './components'

const ExpansionModal = () => {
    const { expansion, setContext } = React.useContext(getBuilderContext)
    const ExpansionComponent = ExpansionComponents[expansion]
    return (
        <Container expansion={expansion}>
            <div className='expansion_top'>
                <h4>{expansion}</h4>
                <div className='close_wrap' onClick={() => setContext({ expansion: null })}>
                    <AiOutlineClose />
                </div>
            </div>
            <div className='expansion_wrapper'>
                {expansion && <ExpansionComponent />}
            </div>
        </Container>
    );
};

export default ExpansionModal;

const Container = styledComponents.div`
    position:absolute;
    width:350px;
    background:white;
    height:calc(100vh - 50px);
    top:0;
    left:calc(100% - 350px);
    opacity:0;
    ${({ expansion }) => expansion && `left:100%;`};
    ${({ expansion }) => expansion && `opacity:1;`};
    z-index:1;
    transition:0.3s ease;
    box-shadow:rgb(0 0 0 / 25%) 0px 2px 4px 0px;
    border-top:6px solid rgba(0,0,0,0.6);
    display:flex;
    flex-direction:column;
    box-sizing:border-box;
    .expansion_top{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:0px 16px;
        border-bottom:1px solid rgba(0,0,0,0.2);
        .close_wrap{
            font-size:20px;
            opacity:0.6;
            &:hover{
                opacity:1;
                cursor:pointer;
            }
        }
    }
    .expansion_wrapper{
        padding:16px;
        overflow-y:scroll;
    }
`