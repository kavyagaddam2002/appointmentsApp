// Write your code here
import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilteredActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilteredActive} = this.state
    this.setState({
      isFilteredActive: !isFilteredActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM YYYY, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilteredActive} = this.state
    if (isFilteredActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilteredActive} = this.state
    const filterClassName = isFilteredActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="card">
            <div className="form-container">
              <h1 className="heading"> Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <div className="label-container">
                  <label htmlFor="title">TITLE</label>
                  <br />
                  <input
                    id="title"
                    type="text"
                    placeholder="title"
                    value={titleInput}
                    onChange={this.onChangeTitleInput}
                  />
                </div>

                <div className="label-container">
                  <label htmlFor="date">DATE</label>
                  <br />
                  <input
                    id="date"
                    type="date"
                    value={dateInput}
                    onChange={this.onChangeDateInput}
                    autoComplete="OFF"
                  />
                </div>

                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="header-with-filter-container">
            <h1>Appointments</h1>
            <button
              type="button"
              className={`filter-style ${filterClassName}`}
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>

          <ul>
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
