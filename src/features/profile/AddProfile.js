import InputFiled from "./InputFiled";
import { useDispatch } from "react-redux";
import { profileAdded,addNewPost, editPost} from "./profileSlice";


const AddProfile = ({ formInputFields, setFormInputFields, title, setTitle}) => {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", formInputFields.avatar);
        formData.append("email", formInputFields.email);
        formData.append("username", formInputFields.username);
        formData.append("phone", formInputFields.phone);
        if (title && title === "Add Post") {
            dispatch(addNewPost(formData));
        }
        
        if (title && title === "Edit Post") {
            formData.append("id", formInputFields.id);
            dispatch(editPost(formData));
            setTitle("Add Post");
        }

        setFormInputFields({
            avatar: null,
            id: null,
            username: "",
            email: "",
            phone: "",
        });
    };

    return (
        <section
            className={
                title && title === "Add Post" ? "add-profile" : "edit-profile"
            }
        >
            <form className="add-profile-form" onSubmit={handleSubmit}>
                <h3>{title}</h3>
                <hr />
                <InputFiled
                    formInputFields={formInputFields}
                    setFormInputFields={setFormInputFields}
                />
                <button>{title && title === "Add Post" ? "Submit" : "Edit Post"}</button>
            </form>
        </section>
    );
};

export default AddProfile;
