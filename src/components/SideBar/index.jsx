import { BsPlus, BsGearFill } from 'react-icons/bs';
import { FaRegMap, FaUserAlt  } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import haviraIcon from '../../assets/icons/havira_icon.jpg'
import { closeForm, openForm } from '../../state/formSlice';
import Icon from '../Icon';

const SideBar = () => {

  const dispatch = useDispatch();

  return (
    <>
        <div className='z-20 top-0 left-0 h-screen w-16 flex flex-col
                 bg-secondaryGray shadow-lg'>
                    
          <Icon icon={<img src={haviraIcon} />} />
          <Icon 
              icon={<BsPlus size="32" />} 
              text='cadastrar usuário' 
              onClick={() => dispatch(openForm())} />
          <Divider />
          <Icon 
              icon={<FaRegMap size="32" />} 
              text='mostrar mapa' 
              onClick={() => dispatch(closeForm())} />  
          <Icon icon={<FaUserAlt  size="20" />} />
          <Divider />
          <Divider />
          <Icon icon={<BsGearFill size="22" />} />

        </div>

    </>

  );
};


const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;