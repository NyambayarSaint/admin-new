import React from 'react';
import styledComponents from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import * as AllIcons from './lib/allIcons'

const IconsLibrary = ({ onSelect }) => {

    const [result, setResult] = React.useState(null)
    const [searchVal, setSearchVal] = React.useState('')
    const [watchRequest, setWatchRequest] = React.useState(0)

    React.useEffect(() => {
        if (watchRequest) {
            if (!searchVal) return setResult(null)
            processResult()
        }
    }, [watchRequest])

    const processResult = async () => {

        const { ...getAllIcons } = AllIcons

        let storeAllIcons = {}
        Object.keys(getAllIcons).forEach(iconKey => {
            const { ...tests } = getAllIcons[iconKey]()
            storeAllIcons = { ...storeAllIcons, ...tests }
        })

        const searchResult = {}
        Object.keys(storeAllIcons).forEach(iconName => {
            if (iconName.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())) {
                searchResult[iconName] = storeAllIcons[iconName]
            }
        })
        setResult(searchResult)
    }

    const onKeyPress = (e) => e.key === "Enter" && setWatchRequest(watchRequest + 1)

    return (
        <Container>
            <div className='top_section'>
                <div className='left_wrap'>
                    <div className='search_wrap'>
                        <BsSearch onClick={() => setWatchRequest(watchRequest + 1)} />
                        <input value={searchVal} placeholder={`Search by pressing "Enter" key...`} onKeyPress={onKeyPress} onChange={(e) => setSearchVal(e.target.value)} rel="pb" />
                    </div>
                </div>
                <div className='right_wrap'>
                </div>
            </div>
            <div className='main_section'>
                {result ?
                    <div className='icons_wrapper' rel="pb">
                        {Object.keys(result).map(iconKey => {
                            const ThisIcon = result[iconKey]
                            return (
                                <div className='icon_box' onClick={() => onSelect(iconKey)} key={iconKey}>
                                    <ThisIcon />
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className='empty_wrap'>
                        <h1>Search for the icon you want...</h1>
                        <h2>by pressing "Enter" key</h2>
                    </div>
                }
            </div>
        </Container>
    );
};

export default IconsLibrary;

const Container = styledComponents.div`
    width:80vw;
    height:80vh;
    .top_section{
        display:flex;
        align-items:center;
        justify-content:space-between;
        border-bottom:1px solid rgba(0,0,0,0.1);
        margin-bottom:15px;
        padding-bottom:15px;
        gap:30px;
        .left_wrap{
            flex:1;
            .search_wrap{
                input{
                    width:calc(100% - 30px);
                    box-shadow:none;
                    border:none;
                }
                svg{
                    margin-right:10px;
                    cursor:pointer;
                    transition:0.3s ease;
                    &:hover{
                        transform:scale(1.1);
                    }
                }
            }
        }
        .right_wrap{
            .close_icon{
                svg{
                    font-size:20px;
                    cursor:pointer;
                }
            }
        }
    }
    .main_section{
        height:calc(100% - 70px);
        .icons_wrapper{
            background:rgba(0,0,0,0.1);
            display:flex;
            flex-wrap:wrap;
            gap:10px;
            padding:15px;
            max-height:100%;
            overflow-y:scroll;
            .icon_box{
                width:90px;
                height:64px;
                box-shadow:0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
                display:flex;
                align-items:center;
                background:white;
                justify-content:center;
                transition:0.3s ease;
                svg{
                    font-size:24px;
                    color:black;
                    transition:0.3s ease;
                }
                &:hover{
                    cursor:pointer;
                    background:rgba(0,0,0,0.8);
                    svg{
                        color:white;
                    }
                }
            }
        }
        .empty_wrap{
            flex-direction:column;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100%;
            opacity:0.6;
        }
    }
`