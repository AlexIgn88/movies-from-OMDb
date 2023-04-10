function Notification({ notification }) {
    return <div className="error">
        <div>Oшибка: {notification}</div>
        <div className='notification'>Double click for close</div>
    </div>
}

export default Notification