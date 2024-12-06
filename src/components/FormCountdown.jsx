import { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import styles from '../styles/formCountdown.module.css'

export default function FormCountdown({ handleAddCountdown }) {
  const [formVisibility, setFormVisibility] = useState(false)
  const [countdownTitle, setCountdownTitle] = useState('')
  const [countdownDate, setCountdownDate] = useState('')

  // Actions
  const toggleFormVisibility = () => setFormVisibility((oldState) => !oldState)
  const handleSubmitCountdown = (e) => {
    e.preventDefault()

    const currentDate = new Date()
    const convertCountdownDate = new Date(countdownDate)
    
    // Prevent registering the countdown
    if(countdownTitle === '' || countdownDate === '') return
    // If the selected date is equal to or less than the current date
    if(convertCountdownDate.getTime() <= currentDate.getTime()) return 

    // Register Countdown
    const countdownData = {
      countdownTitle,
      countdownDate: convertCountdownDate,
    }

    handleAddCountdown(countdownData)

    // Reset Inputs
    setCountdownTitle('')
    setCountdownDate('')
  }

  return (
    <div className={`${styles.formCountdownContainer} ${formVisibility ? styles.formCountdownIsActive : ''}`}>
      <div className={styles.headerFormCountdownContainer} onClick={toggleFormVisibility}>
        <h3> Registrar Countdown </h3>

        <button type='button' className={styles.iconContainer}>
          <BsChevronLeft className={styles.icon} />
        </button>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmitCountdown}>
        <input 
          type='text' 
          placeholder='Título'
          className={styles.input}
          value={countdownTitle}
          onChange={(e) => setCountdownTitle(e.target.value)}
        />

        <input 
          type='datetime-local' 
          className={styles.input}
          value={countdownDate}
          onChange={(e) => setCountdownDate(e.target.value)}
        />

        <button type='submit' className={styles.buttonContainer}>
          Registrar
        </button>
      </form>
    </div>
  )
}