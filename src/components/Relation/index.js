import React from 'react';
import styled from 'styled-components';
import RelationModel from './RelationModel';
import pluralize from 'pluralize'

const Relation = (meta) => {
    return (
        <Container>
            {Object.keys(meta.relations ?? {}).map(type => {
                const models = meta.relations[type]
                return models.map(model => {
                    const relApi = pluralize(model.toLowerCase())
                    return (
                        <RelationModel
                            key={type + model}
                            relModel={model}
                            relType={type}
                            relApi={relApi}
                            isMulti={type === "hasMany" || type === "belongsToMany" ? true : false}
                            {...meta}
                        />
                    )
                })
            })}
        </Container>
    );
};

export default Relation;

const Container = styled.div`
    & > div {
        margin-bottom:15px;
        &:last-child{
            margin-bottom:0px;
        }
    }
`