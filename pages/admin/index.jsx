import React, {useState} from 'react';
import App from "./layouts/app";

const Index = () => {
    const [open, setOpen] = useState(null)

    function clickMe() {
        fetch('api/auth/checkToken').then(r => r.json()).then(r => setOpen(r.message))

    }

    return (
        <div>
            <App>
                <h1>Admin panel {open}</h1>
                <button onClick={clickMe}>Click</button>
            </App>
        </div>
    );
};

export default Index;