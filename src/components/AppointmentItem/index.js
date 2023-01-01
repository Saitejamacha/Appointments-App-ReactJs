import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {id, text, date, isFavorite} = appointmentDetails

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/star-filled-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/star-outline-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="list-items">
      <div className="appointment-con">
        <div className="text-con">
          <p className="text">{text}</p>
          <button
            type="button"
            className="favorite-icon"
            onClick={onClickFavoriteIcon}
          >
            <img alt="star" src={starImgUrl} className="favorite-icon" />
          </button>
        </div>
        <p className="date">Date: {date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
