function Notification({ notification }) {
    return <div className="error">
        <div>{notification}</div>
        <div className='notification'>Double click for close</div>
    </div>
}  

export default Notification