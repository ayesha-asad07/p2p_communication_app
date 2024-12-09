const Navbar = ({ user, onLogout }) => {
  return (
    <div className="p-4 bg-gray-800 text-white">
      <h1 className="text-xl">Peer-to-Peer App</h1>
      {user && (
        <div className="flex justify-between">
          <div>Welcome, {user.email}</div>
          <button onClick={onLogout} className="bg-red-500 p-2 rounded">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
