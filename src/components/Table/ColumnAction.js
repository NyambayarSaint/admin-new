import React from 'react';
import { BsFillCaretDownFill, BsFillCaretUpFill, BsChevronDown } from 'react-icons/bs'
import styled from 'styled-components';

const Action = ({ data, fieldName, sticky, label, order, filter, orderByColumnCb }) => {
    const [sortStatus, setSortStatus] = React.useState('')
    const [dropDownOpen, setDropDownOpen] = React.useState(false)
    const [filterOptions, setFilterOptions] = React.useState([])
    const handleOrder = async (arg) => {
        if (arg === sortStatus) return setSortStatus('')
        orderByColumnCb(arg).then(() => setSortStatus(arg)).catch(() => null)
    }
    const forwardOpenState = (e) => {
        const open = e.target.parentElement.getAttribute('open')
        setDropDownOpen(open === null ? false : true)
    }
    React.useEffect(() => {
        if (dropDownOpen) {
            const uniqueFields = [... new Set(data.map(item => item[fieldName]))]
            const array = uniqueFields.map(field => data.find(d => d[fieldName] === field))
            array.sort((a, b) => a[fieldName] > b[fieldName] ? 1 : -1)
            setFilterOptions(array)
        } else {
            setFilterOptions([])
        }
    }, [dropDownOpen])
    return (
        <Container data-sticky={sticky}>
            <span>{label}</span>
            {order &&
                <span className='orderBy'>
                    <BsFillCaretUpFill open={sortStatus === 'asc'} onClick={() => handleOrder('asc')} />
                    <BsFillCaretDownFill open={sortStatus === 'desc'} onClick={() => handleOrder('desc')} />
                </span>
            }
            {filter &&
                <sl-dropdown>
                    <BsChevronDown onClick={forwardOpenState} slot="trigger" className='filterBy' />
                    <sl-menu>
                        {filterOptions.map(option => <sl-checkbox key={option.id}>{option[fieldName]}</sl-checkbox>)}
                    </sl-menu>
                </sl-dropdown>
            }
        </Container>
    );
};

export default Action;

const Container = styled.th`
    display:flex;
    align-items:center;
    gap:8px;
    .orderBy{
        display:inline-flex;
        flex-direction:column;
        svg{
            cursor:pointer;
            opacity:0.6;
            font-size:11px;
            &[open]{
                color:rgb(64, 158, 255);
                opacity:1;
            }
            &:last-child{
                margin-top:-2px;
            }
        }
    }
    .filterBy{
        font-size:11px;
        opacity:0.8;
        cursor:pointer;
        path{
            pointer-events:none;
        }
    }
    sl-menu{
        padding:10px 15px;
        margin-top:10px;
        text-align:left;
        sl-checkbox{
            display:block;
            padding-top:5px;
            padding-bottom:5px;
            &[checked]{
                label{
                    color:${({ theme }) => theme.lightblue};
                }
            }
        }
    }
`