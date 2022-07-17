import { useEffect, useState } from 'react';

const ProfileCard = ({ field, value }) => {
    const [img, setImg] = useState();

    useEffect(() => {
        if (field === 'avatar') {
            setImg(URL.createObjectURL(value));
        }
    }, [field, value])
    
    return (
        <div className="card">
            {field === 'avatar' && (<img className="avatar-img" src={img} alt="avatar"></img>)}
            {field === 'username' && (<h3 className="username">{value}</h3>)}
            {field === 'email' && (<p className="email">{field}: {value}</p>)}
            {field === 'phone' && (<p className="phone">{field}: {value}</p>)}
        </div>
    );
};

export default ProfileCard;
