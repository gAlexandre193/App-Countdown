import { useState, useEffect } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { BsTrash } from 'react-icons/bs'
import styles from '../styles/cardCountdown.module.css'

export default function CardCountdown({ countdownData, handleDeleteCountdown }) {
  const [countdown, setCountdown] = useState(() => {
    const targetDate = new Date(countdownData.countdownDate)
    const currentDate = new Date()

    if(targetDate < currentDate) return { 
      days: '00', 
      hours: '00', 
      minutes: '00', 
      seconds: '00' 
    }

    const days = differenceInDays(targetDate, currentDate)
    const hours = differenceInHours(targetDate, currentDate)
    const minutes = differenceInMinutes(targetDate, currentDate) % 60
    const seconds = differenceInSeconds(targetDate, currentDate) % 60

    return {
      days: String(days).padStart(2, 0),
      hours: String(hours).padStart(2, 0),
      minutes: String(minutes).padStart(2, 0),
      seconds: String(seconds).padStart(2, 0),
    }
  })

  // Help with formatting to display the due date
  const conclusionDate = new Date(countdownData.countdownDate)
  const getConclusionDate = String(conclusionDate.getDate())
    .padStart(2, 0)
  const getConclusionMonth = String(conclusionDate.getMonth()+1)
    .padStart(2, 0)
  const getConclusionYear = String(conclusionDate.getFullYear())

  // Update Countdown
  useEffect(() => {
    // Prevents counting when the scheduled date arrives
    if(countdown.days == 0 && countdown.hours == 0 && countdown.minutes == 0 && countdown.seconds == 0) return 

    // Will update the countdown
    const targetDate = new Date(countdownData.countdownDate)

    const interval = setInterval(() => {
      const currentDate = new Date()

      const days = differenceInDays(targetDate, currentDate)
      const hours = differenceInHours(targetDate, currentDate)
      const minutes = differenceInMinutes(targetDate, currentDate) % 60
      const seconds = differenceInSeconds(targetDate, currentDate) % 60

      setCountdown({
        days: String(days).padStart(2, 0),
        hours: String(hours).padStart(2, 0),
        minutes: String(minutes).padStart(2, 0),
        seconds: String(seconds).padStart(2, 0),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown])

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