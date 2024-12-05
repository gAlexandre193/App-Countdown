import { useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import styles from '../styles/formCountdown.module.css'

export default function FormCountdown({ handleAddCountdown }) {
  const [formVisibility, setFormVisibility] = useState(false)
  const [countdownTitle, setCountdownTitle] = useState('')
  const [countdownCompletionDate, setCountdownCompletionDate] = useState(() => {
    const currentDate = new Date()
    const ajustDateInMS = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60 * 1000))
    ajustDateInMS.setDate(ajustDateInMS.getDate() + 1)

    return ajustDateInMS.toISOString().slice(0, 16)
  })

  const currentDate = new Date()
  const ajustMinDateInMS = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60 * 1000));
  ajustMinDateInMS.setDate(ajustMinDateInMS.getDate() + 1)
  const minDate = ajustMinDateInMS.toISOString().slice()

  useEffect(() => {
    const currentDate = new Date()
    const ajustDateInMS = currentDate.getTime() - (currentDate.getTimezoneOffset() * 60 * 1000)

    console.log(new Date(ajustDateInMS).toISOString())
  }, [])

  // Actions
  const toggleFormVisibility = () => setFormVisibility((oldState) => !oldState)
  const handleSubmitCountdown = (e) => {
    e.preventDefault()

    if(countdownTitle === '' || countdownCompletionDate === undefined) return

    const countdownData = {
      countdownTitle,
      countdownCompletionDate,
    }

    // Register
    handleAddCountdown(countdownData)

    // Reset Inputs
    setCountdownTitle('')
    setCountdownCompletionDate(new Date().toISOString().slice(0, 16))
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
          min={minDate}
          value={countdownCompletionDate}
          onChange={(e) => setCountdownCompletionDate(e.target.value)}
        />

        <button type='submit' className={styles.buttonContainer}>
          Registrar
        </button>
      </form>
    </div>
  )
}