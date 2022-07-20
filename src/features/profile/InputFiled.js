import { useState, useEffect, useRef } from "react";

const InputFiled = ({ formInputFields, setFormInputFields }) => {
    const [active, setActive] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (!active) inputRef.current.focus();
        setActive(false);
    }, [active]);

    const handleInputChange = ({ target: { name, value } }) => {
        const newInputs = { ...formInputFields, [name]: value };
        setFormInputFields(newInputs);
    };

    const handleInputImage = async ({ target: { name, files } }) => {
        const [file] = files;
        console.log(file);
        const newInputs = { ...formInputFields, [name]: file };
        setFormInputFields(newInputs);
    };

    return (
        <>
            <label htmlFor="username">Username:</label>
            <input
                ref={inputRef}
                type="text"
                id="username"
                name="username"
                value={formInputFields.username}
                placeholder="username..."
                onChange={handleInputChange}
                required
            />
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                name="email"
                value={formInputFields.email}
                placeholder="email..."
                onChange={handleInputChange}
                required
            />
            <label htmlFor="phone">Phone Number:</label>
            <input
                type="text"
                id="phone"
                name="phone"
                value={formInputFields.phone}
                placeholder="phone number..."
                onChange={handleInputChange}
                required
            />
            <label htmlFor="avatar">Profile Picture:</label>
            <input
                type="file"
                id="avatar"
                name="avatar"
                value={formInputFields.pic}
                accept="image/png, image/jpeg"
                onChange={handleInputImage}
            />
        </>
    );
};

export default InputFiled;
