import React from 'react';
import styledComponents from 'styled-components';
import { AiFillPlusCircle, AiOutlineFontColors } from 'react-icons/ai'
import { CgColorBucket, CgColorPicker } from 'react-icons/cg'
import { IoIosColorPalette } from 'react-icons/io'
import { FaLayerGroup } from 'react-icons/fa'
import ExpansionModal from './Expansion/ExpansionModal';
import { getBuilderContext } from './contexts/builder';

const ToolBar = () => {
    const { setContext } = React.useContext(getBuilderContext)
    return (
        <Container>
            <ToolsWrap>
                <Tools onClick={() => setContext({ expansion: 'InspectLayers' })}>< FaLayerGroup /></Tools>
                <Tools onClick={() => setContext({ expansion: 'AddElements' })}><AiFillPlusCircle /></Tools>
                <Tools onClick={() => setContext({ expansion: 'AddIcons' })}>< CgColorBucket /></Tools>
                <Tools onClick={() => setContext({ expansion: 'AddElements' })}><IoIosColorPalette /></Tools>
                <Tools onClick={() => setContext({ expansion: 'AddElements' })}><AiOutlineFontColors /></Tools>
                <Tools onClick={() => setContext({ expansion: 'AddElements' })}><CgColorPicker /></Tools>
            </ToolsWrap>
            <ExpansionModal />
        </Container>
    );
};

export default ToolBar;

const Container = styledComponents.div`
    position:absolute;
`
const ToolsWrap = styledComponents.div`
    position:relative;
    z-index:2;
    background:white;
    padding:16px 8px;
    background:white;
    height:100%;
    border-right:1px solid rgba(0,0,0,0.1);
    box-sizing:border-box;
`
const Tools = styledComponents.div`
    font-size:24px;
    cursor:pointer;
    width:40px;
    height:40px;
    border-radius:100%;
    transition:0.3s ease;
    margin-bottom:10px;
    display:flex;
    align-items:center;
    justify-content:center;
    &:hover{
        background:#ebf2ff;
        color:#116dff;
    }
`