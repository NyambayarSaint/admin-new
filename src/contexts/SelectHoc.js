import React from 'react';
import SelectComponent from 'react-select'
import styled from 'styled-components';

const SelectHoc = (props) => {
    return (
        <Container>
            <SelectComponent placeholder="Сонгох" {...props} />
        </Container>
    );
};

export default SelectHoc;

const Container = styled.div`
    & > div{
        & > div{
            min-height:unset;
            & > div {
                &:first-child{
                    color:${({theme})=>theme.dark};
                }
                &:last-child{
                    & > div{
                        padding:4px;
                        svg{
                            width:15px;
                            height:15px;
                        }
                    }
                }
            }
        }
    }
`