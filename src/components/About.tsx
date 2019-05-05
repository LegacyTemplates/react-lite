import * as React from 'react';

export const About: React.FC<any> = (props:any) => {
    const [message] = React.useState('About page');

    return (<div id="about">
            <h3>{ message }</h3>
        </div>);
}
