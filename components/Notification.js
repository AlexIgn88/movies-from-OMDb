function Notification({ notification, setNotification }) {
    return <div className="error pop-up-window">
        <div>{notification}</div>
        <div><button onClick={() => setNotification(null)}>Click here for close</button></div>
    </div>
}

export default Notification;