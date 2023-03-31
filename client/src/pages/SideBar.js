import {FaPlus, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = () => {

  return (
    
    <div className="fixed top-0 left-0 h-screen w-16 m-0
                    py-2
                    flex flex-col
                    bg-primary text-secondary"
                    style={{color: '#337F87'}}
                    >
        
        <Link to="./">
        <SideBarIcon icon={<FaHome size="26"/>} text="Home" />
        </Link>
        <Link to="./add">
        <SideBarIcon icon={<FaPlus size="26"/>} text="Add New Product"/>
        </Link>
        </div>
  );
};



const SideBarIcon = ({icon, text = 'tooltip 💡'}) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
    
);

export default SideBar;