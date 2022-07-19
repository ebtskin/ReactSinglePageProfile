import AddProfile from "./AddProfile";
import ProfileList from "./ProfileList";
import { useState } from "react";

const ProfilePage = () => {
    const [formInputFields, setFormInputFields] = useState({
        avatar: null,
        id: null,
        username: "",
        email: "",
        phone: "",
    });

    const [title, setTitle] = useState("Add Post");

    return (
        <main className="profile-page">
            <AddProfile
                formInputFields={formInputFields}
                setFormInputFields={setFormInputFields}
                title={title}
                setTitle={setTitle}
            />
            <ProfileList />
        </main>
    );
};

export default ProfilePage;
