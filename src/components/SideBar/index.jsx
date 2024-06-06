import { useState } from 'react';
import { BsPlus, BsGearFill } from 'react-icons/bs';
import { FaRegMap, FaUserAlt  } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import haviraIcon from '../../assets/icons/havira_icon.jpg'
import { closeForm, openForm } from '../../state/formSlice';
import Form from '../Form';

const SideBar = () => {

  const dispatch = useDispatch();


  return (
    <>
        <div className="z-20 top-0 left-0 h-screen w-16 flex flex-col
                 bg-secondaryGray shadow-lg">
                    
          <SideBarIcon icon={<img src={haviraIcon} />} />
          <SideBarIcon icon={<BsPlus size="32" onClick={() => dispatch(openForm())} />} text='cadastrar usuário' />
          <Divider />
          <SideBarIcon icon={<FaRegMap size="32" onClick={() => dispatch(closeForm())} />}  text='mostrar mapa'/>
          <SideBarIcon icon={<FaUserAlt  size="20" />} />
          <Divider />
          <Divider />
          <SideBarIcon icon={<BsGearFill size="22" />} />
         

        </div>

    </>

  );
};

const SideBarIcon = ({ icon, text }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>

  </div>
);


const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;