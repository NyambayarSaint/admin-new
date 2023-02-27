import React from 'react';
import camelCase from 'camelcase';
import { AiOutlineClose, AiFillQuestionCircle } from 'react-icons/ai'
import { all as allKnownCssProperties } from 'known-css-properties';
const allPropertiesSorted = allKnownCssProperties.sort((a, b) => (a > b ? 1 : -1)).filter(x => x.charAt(0) !== "-")

const CssPropertyInstance = ({
    property: propertyData,
    cssObject,
    onChange: forwardOnChange,
    forwardKey,
    isNewProperty,
    isDefault,
    setLastFocus,
    directFocus,
    onDelete
}) => {

    const [property, setProperty] = React.useState(propertyData === "new" ? '' : propertyData)
    const initialProperty = propertyData === "new" ? null : propertyData
    const [value, setValue] = React.useState(cssObject[propertyData] ? cssObject[propertyData] : '')
    const [showSuggestion, setShowSuggestion] = React.useState(false)
    const [allProperties, setAllProperties] = React.useState(allPropertiesSorted)
    const [wrongStyleValue, setWrongStyleValue] = React.useState(false)

    const valueRef = React.useRef()
    const propertyRef = React.useRef()

    const handleChangeProperty = (e) => {
        if (isDefault) return console.warn('Cannot remove default properties. Either set its value to "none" or change it accordingly to your needs.')
        setProperty(e.target.value)
    }
    const handleSuggestionSelect = (e, incomingValue) => {
        e.preventDefault()
        setProperty(incomingValue)
        setShowSuggestion(false)
        setAllProperties(allPropertiesSorted)
        valueRef.current.focus()

    }
    const handleChangeValue = (e) => {

        setValue(e.target.value)

        const dummyElement = document.createElement('div')
        const styleName = camelCase(property)
        dummyElement.style[styleName] = e.target.value
        const appliedStyle = dummyElement.getAttribute('style')

        if (!appliedStyle) return setWrongStyleValue(true)

        setWrongStyleValue(false)
        forwardOnChange(property, e.target.value, initialProperty)
    }
    const filterAllProperties = () => {
        const arg = property || ''
        const filtered = allPropertiesSorted.filter(x => x.includes(arg))
        const exactResult = filtered.find(x => x === arg)

        if (!exactResult) return setAllProperties(filtered)

        const indexToRemove = filtered.indexOf(exactResult)
        filtered.splice(indexToRemove, 1)
        const insertBackToTop = [exactResult].concat(filtered)
        setAllProperties(insertBackToTop)
    }
    const handleKeyDown = (e, incomingValue) => {
        if (e.key === "Enter") {
            setProperty(incomingValue)
            setShowSuggestion(false)
            setAllProperties(allPropertiesSorted)
            valueRef.current.focus()
        } else if (e.key === "Tab") {
        }
    }
    const handlePropertyKeyDown = (e, incomingValue) => {
        if (e.key === "Enter") {
            const exactProperty = allProperties.find(x => x === incomingValue)
            if (exactProperty) {
                setProperty(incomingValue)
                setShowSuggestion(false)
                setAllProperties(allPropertiesSorted)
                valueRef.current.focus()
            }
        }
    }

    React.useEffect(() => {
        filterAllProperties()
        // eslint-disable-next-line
    }, [property])

    React.useEffect(() => {
        isNewProperty && propertyRef.current.focus()
        directFocus && valueRef.current.focus()
        // eslint-disable-next-line
    }, [])

    const handleValueKeyDown = (e) => {
        if (e.key === "Enter") {

        }
    }

    const handleValueFocus = (e) => {
        setLastFocus.current = property
        setShowSuggestion(false)
        const foundExactProperty = allProperties.find(x => x === property)
        if (!foundExactProperty) propertyRef.current.focus()
    }
    const handleKeyFocus = (event) => {
        document.addEventListener('click', (e) => watchOutsideClick(e, event.target))
        setTimeout(() => {
            setShowSuggestion(true)
        }, 100);
    }
    const watchOutsideClick = (e, target) => {
        if (e.target !== target) setShowSuggestion(false)
    }
    const handleValueBlur = (e) => {
        if (!e.target.value) onDelete(initialProperty)
    }
    return (
        <div className={`_css_property_instance ${showSuggestion ? 'active' : ''}`}>
            <input
                kind="key"
                placeholder='Property name'
                value={property}
                ref={propertyRef}
                onChange={handleChangeProperty}
                onFocus={handleKeyFocus}
                onKeyDown={(e) => handlePropertyKeyDown(e, property)}
            />
            {showSuggestion && (
                <div className='__property_suggestion_wrap'>
                    {allProperties.map((c, i) => (
                        <span
                            tabIndex={0}
                            key={forwardKey + i}
                            open={property === c}
                            onKeyDown={(e) => handleKeyDown(e, c)}
                            onClick={(e) => handleSuggestionSelect(e, c)}
                        >{c}</span>
                    ))}
                </div>
            )}
            <input
                kind="value"
                ref={valueRef}
                value={value}
                onFocus={handleValueFocus}
                onChange={handleChangeValue}
                onKeyDown={handleValueKeyDown}
                onBlur={handleValueBlur}
            />
            {isDefault ?
                <AiFillQuestionCircle
                    title='Cannot remove default properties. Either set its value to "none" or change it accordingly to your needs.'
                    className='question_mark'
                />
                :
                <AiOutlineClose
                    onClick={() => onDelete(initialProperty)}
                    className='delete_mark'
                />
            }
            {wrongStyleValue && <div className='wrong_style_value'></div>}
        </div>
    )
}

export default CssPropertyInstance