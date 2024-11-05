import { useNavigate } from 'react-router-dom';
import signUpImg from "../../assets/login/image1.png";

const RoleDecide = () => {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        navigate('/signup', { state: { role } });
    };

    return (
        <div className="max-w-[1440px] mx-auto my-10 grid grid-cols-2 gap-20">
            <div className="text-center pt-40">
                <h3 className="font-semibold text-3xl">Welcome to TechHud</h3>
                <p>Signup your account as</p>
                <div className="flex flex-col gap-10 pt-10 w-1/2 mx-auto">
                    <button 
                        className="bg-primary-color text-white p-2 rounded-lg"
                        onClick={() => handleRoleSelection('teacher')}
                    >
                        Teacher
                    </button>
                    <button 
                        className="text-primary-color bg-white border border-primary-color p-2 rounded-lg"
                        onClick={() => handleRoleSelection('school-owner')}
                    >
                        School
                    </button>
                </div>
            </div>
            <div>
                <img src={signUpImg} alt="Sign Up" />
            </div>
        </div>
    );
};

export default RoleDecide;
