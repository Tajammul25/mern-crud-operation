import { Users, Plus , X , Check} from "lucide-react";
import "./App.css";
import StatusCard from "./components/StatusCard";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserModel from "./components/UserModel"; 
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import {BrowserRouter , Routes , Route , useNavigate } from "react-router-dom"

import {useEffect} from "react";


import { useState, } from "react";

import {
  getUsers,
  getStatus,
  searchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "./api/userApi";

function App() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const[status, setStatus] = useState({ total: 0, active: 0, inactive: 0 });
  const[searchTerm, setSearchTerm] = useState("");
  const[isModelOpen, setIsModelOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
  });

  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const statusOptions = ["Active", "Inactive"];

  // fetch Users
  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (searchTerm) handleSearch();
    else fetchUsers();
  }, [searchTerm]);

  // fetch status
  const fetchStatus = async () => {
    const data = await getStatus();
    setStatus(data);
  };

  // fetch user
  const fetchUsers = async () => {
    try {
      const data = await getUsers(currentPage, itemsPerPage);
    setUsers(data.users || []);
    setTotalPages(data.totalPages || 0 );
    setTotalUsers(data.totalUsers || 0 );
    fetchStatus();

    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }
  // handle search
  const handleSearch = async () => {
    const data = await searchUsers(searchTerm, currentPage, itemsPerPage);
    setUsers(data.users);
    setTotalPages(data.totalPages);
    setTotalUsers(data.totalUsers);
  };

  //
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone)
      return alert("Fill All Fields");
    setLoading(true);
    try {
      if (editingItem) await updateUser(editingItem._id, formData);
      else await addUser(formData);
      fetchUsers();
      closeModel();
    } catch (error) {
      alert(error.message);
    }finally{
      setLoading(false);
    }

  };

  const handleDelete = async (id) => {
    if (window.confirm("Are You sure")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const openModel = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: "", email: "", phone:"" , status: "Active" });
    }
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
    setEditingItem(null);
    setFormData({ name: "", email: "", phone:"",  status: "Active" });
  };

  // const navigate = useNavigate();
  
  const handleLogout = ()=>{
    localStorage.removeItem("userAuth");
    // navigate("/login")
    window.location.href = "/login";

  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 shadow-xl border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Users size={28} className="text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">User Management</h1>
              <p className="text-gray-400 mt-1">MERN Stack Application</p>
              <button className="py-1 px-4 bg-red-500 rounded-lg text-white cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <button
            className="flex items-center gap-2 bg-green-500 text-gray-900 px-5 py-2.5 rounded-lg hover:bg-green-400
         transition-colors shadow-lg font-semibold"
            onClick={() => openModel()}
          >
            <Plus size={20} /> Add User
          </button>
        </div>
      </header>

      {/* Main */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard
           title="Total Users"
           value={{number : status.total}}
           icon={<Users />}
           bgIcon="bg-green-500"
           iconColor="text-white"
           gradient="from-green-900 to-green-700"
          />

           <StatusCard
           title="Inactive Users"
           value={{number : status.inactive}}
           icon={<X />}
           bgIcon="bg-red-500"
           iconColor="text-white"
           gradient="from-red-900 to-red-700"
          />

           <StatusCard
           title="Acitive Users"
           value={{number : status.active}}
           icon={<Check />}
           bgIcon="bg-indigo-500"
           iconColor="text-white"
           gradient="from-indigo-900 to-indigo-700"
          />
        </div>
        {/* Search */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} onClear={()=>{
          setSearchTerm("");
          setCurrentPage(1);

        }}
        itemsPerPage={itemsPerPage}
        OnItemsPerPageChange={(val)=> {
          setItemsPerPage(Number(val));
          setCurrentPage(1)
        }}
        currentPage={currentPage}
        totalUsers={totalUsers}
        />

        {/* User table */}
        <UserTable
          users={users}
          onEdit={openModel}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}     
        />
        <UserModel isOpen={isModelOpen}
        onClose={closeModel}
        formData={formData} 
        setFormData={setFormData} 
        onSubmit={handleSubmit} 
        loading={loading} 
        statusOptions={statusOptions} />

        {/* <Login /> 
        <SignUp /> */}

      </main>
    </div>
  );
}

export default App;
