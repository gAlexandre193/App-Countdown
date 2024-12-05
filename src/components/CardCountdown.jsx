import { useState, useEffect } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { BsTrash } from 'react-icons/bs'
import styles from '../styles/cardCountdown.module.css'

export default function CardCountdown({ countdownData, handleDeleteCountdown }) {
  const [countdown, setCountdown] = useState(() => {
    const currentDate = new Date()
    const ajustMinDateInMS = currentDate.getTime() - (currentDate.getTimezoneOffset() * 60 * 1000);
    const targetDate = new Date(countdownData.countdownCompletionDate)

    const days = differenceInDays(targetDate, ajustMinDateInMS)
    const hours = (differenceInHours(targetDate, ajustMinDateInMS) % 24) - 3
    const minutes = differenceInMinutes(targetDate, ajustMinDateInMS) % 60
    const seconds = differenceInSeconds(targetDate, ajustMinDateInMS) % 60

    return {
      days: String(days).padStart(2, 0),
      hours: String(hours).padStart(2, 0),
      minutes: String(minutes).padStart(2, 0),
      seconds: String(seconds).padStart(2, 0),
    }
  })

  // Help with formatting to display the due date
  const targetDate = new Date(countdownData.countdownCompletionDate)
  const getConclusionDate = String(targetDate.getDate()).padStart(2, 0)
  const getConclusionMonth = String(targetDate.getMonth() + 1).padStart(2, 0)
  const getConclusionYear = String(targetDate.getFullYear())

  // Update Countdown
  useEffect(() => {
    if(countdown.hours == 0 && countdown.minutes == 0 && countdown.seconds == 0) return

    const interval = setInterval(() => {
      setCountdown(() => {
        const currentDate = new Date()
        const ajustMinDateInMS = currentDate.getTime() - (currentDate.getTimezoneOffset() * 60 * 1000);
        const targetDate = new Date(countdownData.countdownCompletionDate)

        const days = differenceInDays(targetDate, ajustMinDateInMS)
        const hours = (differenceInHours(targetDate, ajustMinDateInMS) % 24) - 3
        const minutes = differenceInMinutes(targetDate, ajustMinDateInMS) % 60
        const seconds = differenceInSeconds(targetDate, ajustMinDateInMS) % 60

        return {
          days: String(days).padStart(2, 0),
          hours: String(hours).padStart(2, 0),
          minutes: String(minutes).padStart(2, 0),
          seconds: String(seconds).padStart(2, 0),
        }
      })

    }, 1000)

    return () => clearInterval(interval)
  }, [countdown, countdownData])

  return (
    <li className={styles.cardCountdownContainer}>
      <div className={styles.bodyCardCountdownContainer}>
        <span className={styles.countdownText}> 
          {countdown.hours}:{countdown.minutes}:{countdown.seconds} 
        </span>

        <button 
          className={styles.iconContainer}
          onClick={() => handleDeleteCountdown(countdownData.id)}
        >
          <BsTrash className={styles.icon} />
        </button>
      </div>

      <div className={styles.footerCardCountdownContainer}>
        <h4> {countdownData.countdownTitle} </h4>

        <span> Faltam {countdown.days} dia </span>

        <p> 
          {getConclusionDate}/{getConclusionMonth}/{getConclusionYear} 
        </p>
      </div>
    </li>
  )
}