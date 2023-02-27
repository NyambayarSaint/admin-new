import SelectHoc from 'contexts/SelectHoc';
import pluralize from 'pluralize';
import React from 'react';
import styled from 'styled-components';
import Req from 'utils/Req';

const RelationModel = ({ instance, setInstance, ...meta }) => {
    const [linkedData, setLinkedData] = React.useState([])
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        fetch()
    }, [])
    const fetch = async () => {
        const dataResponse = await Req('get', { url: `/${meta.relApi}/rel` })
        setData(dataResponse.data)
        if (instance.id) {
            const res = await Req('get', { url: `/${meta.relApi}/rel?${meta.name}.id_eq=${instance.id}` })
            setLinkedData(res.data)
        }
    }
    const handleChange = (value) => {
        if (meta.isMulti) {
            const pluralized = pluralize(meta.relModel)
            setInstance({ ...instance, [pluralized]: value.map(v => v.value) })
            setLinkedData(value)
        } else {
            setInstance({ ...instance, [meta.relModel]: value.value })
            setLinkedData([value])
        }
    }
    return (
        <Container>
            <label>{meta.relApi}</label>
            <SelectHoc onChange={handleChange} isMulti={meta.isMulti} value={linkedData} options={data} />
        </Container>
    );
};

export default RelationModel;

const Container = styled.div`
    label{
        text-transform:capitalize;
        display:block;
        margin-bottom:5px;
    }
`