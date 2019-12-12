import React from 'react';

export default function Button(props) {
    return <button className="button" onClick={props.action} name={props.name}>{props.title}</button>
}