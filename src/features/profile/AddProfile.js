import InputFiled from "./InputFiled";
import { useDispatch } from "react-redux";
import { profileAdded } from "./profileSlice";
import { addNewPost } from "./profileSlice";

const AddProfile = ({ formInputFields, setFormInputFields, title, setTitle }) => {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(profileAdded(formInputFields));

        const formData = new FormData();
        formData.append("file", formInputFields.avatar);
        formData.append("email", formInputFields.email);
        formData.append("username", formInputFields.username);
        formData.append("phone", formInputFields.phone);
        
        dispatch(addNewPost(formData));
        

        setFormInputFields({
            avatar: null,
            id: null,
            username: "",
            email: "",
            phone: "",
        });
    };

    return (
        <section className="add-profile">
            <form
                className="add-profile-form"
                onSubmit={handleSubmit}
            >
                <h3>{title}</h3>
                <hr />
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
