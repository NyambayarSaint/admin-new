import React from 'react';
import Library from 'cubix_library'

const RenderBuilderComposition = React.memo(({ data }) => {
    const stackCount = React.useRef(0)

    const StackLayers = ({ type, component, children, depth, index, track, appendable, ...props }) => {

        const indexToAssign = index
        if (!track) track = '' + index + ''
        else track = track + '-' + index
        depth = typeof depth === "number" ? depth + 1 : 0
        const hasChildren = children && children.length
        const Component = Library[type][component].default
        stackCount.current += 1
        
        return (
            <Component
                options={props.options}
                style={props.style}
                key={track}
                builderHelpers={{
                    "data-depth": depth,
                    "data-index": indexToAssign,
                    "data-track": track,
                    "data-appendable": appendable ? true : "",
                    "draggable": true,
                    "title": props?.name ?? component,
                    "kind": "component"
                }}
            >
                {hasChildren ? children.map((child, index) => {
                    return (
                        StackLayers({ ...child, track, depth, index })
                    )
                }) : ''}
            </Component>
        )
    }

    return (
        <React.Fragment>
            {data.map((instance, index) => {
                return (
                    StackLayers({ ...instance, index, depth: 0 })
                )
            })}
        </React.Fragment>
    );
});

export default RenderBuilderComposition;