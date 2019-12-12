import React from 'react';

export default function Log(props) {
    return <textarea name="log" className="log" value={props.log} readOnly={true}></textarea>
}