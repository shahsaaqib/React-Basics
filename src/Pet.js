import React from "react";


const Pet = (props) => {
    return (
        <div>
            <h2>{ props.name }</h2>
            <h1>{ props.animal }</h1>
            <h1>{ props.breed }</h1>
        </div>
    );
}

export default Pet;