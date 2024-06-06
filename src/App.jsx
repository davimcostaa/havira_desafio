import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updatePosition, filterList } from './state/userSlice'
import SideBar from "./components/SideBar";
import UserItem from "./components/UserItem";
import Form from "./components/Form";
import "leaflet/dist/leaflet.css";
import Loader from "./components/Loader";
import Input from "./components/Input";
import { TbSortAscendingLetters } from "react-icons/tb";
import Icon from "./components/Icon";
import { mapIcon } from "./MapItems/MapIcon";

function App() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const filteredUsers = useSelector((state) => state.users.filteredUsers);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const position = useSelector((state) => state.users.position);
  const isOpen = useSelector((state) => state.form.isOpen);
  const [searchTerm, setSearchTerm] = useState('');

  const changeMapCenter = (user) => {
    dispatch(updatePosition([user?.address?.geo.lat, user?.address?.geo.lng]));
  };

  useEffect(() => {
    const filtered = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    dispatch(filterList(filtered));
  }, [users, searchTerm, dispatch]);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const filterUsers = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortUsersForName = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    console.log(sortedUsers);
    dispatch(filterList(sortedUsers));
  }

  function ChangeView() {
    const map = useMap();
        useEffect(() => {
            map.flyTo([position[0], position[1]]);
        }, [position, dispatch]);
        return null;
  }

  let content;

  if (userStatus === 'loading') {
    content = <div className='flex w-full h-full items-center justify-center'><Loader /></div>;
  } else if (userStatus === 'succeeded') {
    content = (
      <div className="w-full h-full flex gap-6 py-4 px-8">   
        <ul className='h-screen pr-2 max-h-screen w-fit overflow-y-auto custom-scrollbar flex flex-col gap-4 pb-20 mt-6'>
          <div className="flex items-center gap-2">
            <Input onChange={(e) => filterUsers(e)} />
            <Icon icon={<TbSortAscendingLetters  size="20" />} onClick={() => sortUsersForName()} />
          </div>
          {filteredUsers.map((user) => (
            <UserItem key={user.id} 
                name={user.name} 
                city={user.address.city} 
                email={user.email} 
                onClick={() => changeMapCenter(user)}
            />
          ))} 
        </ul>
        <div className="flex-1 flex items-center z-30 justify-center w-full h-full">
          <MapContainer scrollWheelZoom={false}
              style={{ height: '80%', width: '100%', zIndex: 2 }} center={position} zoom={5}  >
              <ChangeView /> 

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              />

                {users.map((user) =>
                    <Marker 
                        position={{ lat: user?.address?.geo.lat, lng: user?.address?.geo.lng }}
                        icon={mapIcon}
                        >
                    <Popup>
                      <div>
                          <h1>
                            <strong>Nome:</strong> {user.name}
                          </h1>

                          <p><strong>Rua:</strong> {user.address.street}</p>
                          <p><strong>Número:</strong> {user.address.suite}</p>
                          <p><strong>Cidade:</strong> {user.address.city}</p>
                          <p><strong>Código postal:</strong> {user.address.zipcode}</p>
                          <a>Site: {user.website}</a>
                      </div>
                    </Popup>
                  </Marker>
                )}
          </MapContainer>
        </div>
      </div>
    );
    } else if (userStatus === 'failed') {
      content = <div>{error}</div>;
    }
    return (
        <div className="flex w-screen overflow-hidden h-screen bg-primaryGray">
            <SideBar className="w-1/4" /> 
      
          <div className="z-10 flex-1">
            {!isOpen ? content : <Form />} 
            
          </div>

        </div>

  )
}

export default App
