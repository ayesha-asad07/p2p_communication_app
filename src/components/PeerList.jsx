function PeerList({ peers, onJoinRoom }) {
    return (
      <div className="w-64 bg-gray-200 p-4">
        <h2 className="font-bold mb-4">Peers</h2>
        <ul>
          {peers.map((peer, index) => (
            <li key={index} className="p-2 mb-2 cursor-pointer hover:bg-gray-300" onClick={() => onJoinRoom(peer)}>
              {peer}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default PeerList;
  