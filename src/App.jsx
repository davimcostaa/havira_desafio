import { useEffect } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from './state/userSlice'
import SideBar from "./components/SideBar";
import UserItem from "./components/UserItem";
import Form from "./components/Form";
import "leaflet/dist/leaflet.css";

function App() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const position = useSelector((state) => state.users.position);
  const isOpen = useSelector((state) => state.form.isOpen);


  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  let content;

  if (userStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (userStatus === 'succeeded') {
    content = (
      <div className="w-full h-full flex gap-6 py-4 px-8">   

        <ul className='h-screen pr-2 max-h-screen w-fit overflow-y-auto custom-scrollbar flex flex-col gap-4 pb-20 mt-6'>
          {users.map((user) => (
            <UserItem key={user.id} name={user.name} city={user.address.city} email={user.email} />
          ))} 
        </ul>

        <div className="flex-1 flex items-center z-30 justify-center w-full h-full">
          <MapContainer scrollWheelZoom={false}
              style={{ height: '80%', width: '100%', zIndex: 2 }} center={position} zoom={5} >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              />

                {users.map((user) =>
                    <Marker position={{ lat: user?.address?.geo.lat, lng: user?.address?.geo.lng }}>
                    <Popup>
                     <h1>
                      {user.name}
                     </h1>
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
