// Write your code here

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li>
      <div>
        <p>{title}</p>
        <button type="button" data-testid="star" onClick={onClickStar}>
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p>Date:{date}</p>
    </li>
  )
}

export default AppointmentItem
