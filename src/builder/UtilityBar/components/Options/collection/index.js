import React from 'react';
import styledComponents from 'styled-components';
import Instance from './Instance';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai'

const Collection = ({ object: array, forwardKey, forwardChange }) => {
    const toggleInstance = (e) => {
        const target = e.currentTarget.parentElement
        if (target.classList.contains('active')) {

            target.classList.remove('active')

            target.style.marginTop = "0px"
            target.style.marginBottom = "0px"

            const title = target.querySelector('.instance_title')
            title.style.background = "none";
            title.style.paddingLeft = "0px";
            title.style.padding = "14px 0px";

            const body = target.querySelector('.instance_body')
            body.style.display = "none"
            body.style.border = "none";

            const close_icon = target.querySelector('.close_icon')
            close_icon.style.display = "none"

            const open_icon = target.querySelector('.open_icon')
            open_icon.style.display = "block"

        }
        else {

            target.classList.add('active')

            target.style.marginTop = "5px"
            target.style.marginBottom = "15px"

            const title = target.querySelector('.instance_title')
            title.style.background = "rgba(0,0,0,0.1)";
            title.style.paddingLeft = "15px";

            const body = target.querySelector('.instance_body')
            body.style.display = "block"
            body.style.border = "1px solid rgba(0,0,0,0.1)";

            const close_icon = target.querySelector('.close_icon')
            close_icon.style.display = "block"

            const open_icon = target.querySelector('.open_icon')
            open_icon.style.display = "none"

        }
    }
    const handleChange = (key, value, index) => {
        const clone = [...array]
        clone[index][key].value = value
        forwardChange(forwardKey, [])
    }
    const handleAddNew = () => {
        const singleClone = {...array[0]}
        const clone = [...array]
        clone.push(singleClone)
        forwardChange(forwardKey, clone)
    }
    return (
        <Container>
            {array.map((instance, i) =>
                <div key={forwardKey + i} className='instance_wrapper'>
                    <div className='instance_title' onClick={toggleInstance}>
                        <AiFillCaretRight className='open_icon' />
                        <AiFillCaretDown className='close_icon' />
                        <span>{forwardKey} {i + 1}</span>
                    </div>
                    <Instance forwardKey={forwardKey} index={i} object={instance} forwardChange={handleChange} />
                </div>
            )}
            <button rel="pb" onClick={handleAddNew}>Add new {forwardKey} +</button>
        </Container>
    );
};

export default Collection;

const Container = styledComponents.div`
    .instance_wrapper{
        border-bottom:1px solid rgba(0,0,0,0.1);
        transition:0.3s ease;
        &:last-child{
            border-bottom:0;
        }
        .instance_title{
            padding:14px 0px;
            color:rgba(0,0,0,0.8);
            text-transform: capitalize;
            font-size:12px;
            display:flex;
            transition:0.3s ease;
            cursor:pointer;
            svg{
                margin-right:6px;
                font-size:14px;
                opacity:0.8;
            }
            svg.close_icon{
                display:none;
            }
        }
        .instance_body{
            padding:8px 16px;
            display:none;
        }
    }
    button{
        border: 0;
        background: 0;
        font-weight: 500;
        color: rgba(26,115,232,1);
        font-size: 12px;
        padding: 8px;
        cursor: pointer;
        width:100%;
        text-align:center;
        margin-top:10px;
        transition:0.3s ease;
        &:hover{
            background:rgba(26,115,232,1);
            color:white;
        }
    }
`