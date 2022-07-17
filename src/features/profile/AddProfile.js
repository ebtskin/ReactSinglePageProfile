import InputFiled from "./InputFiled";
import { useDispatch } from "react-redux";
import { profileAdded } from "./profileSlice";
import { useState } from 'react';

const AddProfile = ({ formInputFields, setFormInputFields }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('AddPost');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(profileAdded(formInputFields))
    };

    return (
        <section className="add-profile">
            <form
                className="add-profile-form"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h3>{title}</h3>
                <InputFiled
                    formInputFields={formInputFields}
                    setFormInputFields={setFormInputFields}
                />
                <button>Submit</button>
            </form>
        </section>
    );
};

export default AddProfile;
