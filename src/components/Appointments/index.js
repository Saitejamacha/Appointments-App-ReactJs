import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    ScheduleDate: '',
    isFilterActive: false,
    appointmentList: [],
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, ScheduleDate} = this.state

    const formattedDate =
      ScheduleDate && format(new Date(ScheduleDate), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: v4(),
      text: title,
      date: formattedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      ScheduleDate: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeScheduleDateInput = event => {
    this.setState({
      ScheduleDate: event.target.value,
    })
  }

  getFilteredAppointmentsList = () => {
    const {isFilterActive, appointmentList} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentList
  }

  render() {
    const {isFilterActive, ScheduleDate, title} = this.state
    const filteredAppointmentList = this.getFilteredAppointmentsList()

    const onClickStarBtnClass = isFilterActive ? 'starred-button' : 'emptyBtn'

    return (
      <div className="bg-con">
        <div className="inner-con">
          <div className="card-con">
            <div className="top-con">
              <h1 className="main-head">Add Appointment</h1>
              <form className="form-space" onSubmit={this.onAddAppointment}>
                <label htmlFor="Title">TITLE </label>
                <input
                  id="Title"
                  placeholder="Title"
                  type="text"
                  value={title}
                  onChange={this.onChangeTitleInput}
                />

                <label className="date-label" htmlFor="Date">
                  DATE
                </label>
                <input
                  value={ScheduleDate}
                  id="Date"
                  type="date"
                  onChange={this.onChangeScheduleDateInput}
                />
                <br />
                <button type="submit" className="addBtn">
                  Add
                </button>
              </form>
            </div>
            <img
              className="app-image"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr className="h-line" />
          <div className="bottom-con">
            <h1 className="bottom-head">Appointments</h1>
            <button
              onClick={this.onFilter}
              className={onClickStarBtnClass}
              type="button"
            >
              Starred
            </button>
          </div>

          <ul className="un-ordered-list">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
