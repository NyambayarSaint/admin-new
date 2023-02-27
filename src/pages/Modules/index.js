import Table from 'components/Table';
import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { tableModel } from 'utils/helpers';
import Req from 'utils/Req';
import { AiOutlineEdit } from 'react-icons/ai'
import TableHeader from 'pages/Modules/TableHeader';
import Button from 'components/Button';
import { FaPlus } from 'react-icons/fa';

const ModuleMain = () => {

    const navigate = useNavigate()
    const meta = useOutletContext()
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        Req('get', { url: `/${meta.api}` }).then(res => setData(res.data))
    }, [meta.api])

    React.useEffect(() => {
        console.log(meta.attributes, 'attrs')
    }, [])

    return (
        <Container>
            <TableHeader title={meta.title}>
                <Button onClick={() => navigate(`/${meta.api}/new`)} bg="black" color="white"><FaPlus />Add New {meta.model}</Button>
            </TableHeader>
            <Table data={data} model={{
                ...tableModel(meta.attributes), custom: {
                    jsx: ({ thisInstance }) => (
                        <OperationWrap>
                            <AiOutlineEdit onClick={() => navigate(`/${meta.api}/${thisInstance.id}`)} />
                        </OperationWrap>
                    )
                }
            }} />
        </Container>
    );
};

export default ModuleMain;

const Container = styled.div`

`

const OperationWrap = styled.div`
    svg{
        font-size:18px;
        cursor:pointer;
    }
`