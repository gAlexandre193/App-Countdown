import { useState, useEffect } from 'react'
import FormCountdown from './components/FormCountdown'
import CountdownCard from './components/CardCountdown'
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [countdownList, setCountdownList] = useState(() => {
    const getCountdownListOnLocalStorage = localStorage.getItem('@countdownList')

    if(getCountdownListOnLocalStorage) return JSON.parse(getCountdownListOnLocalStorage)

    return []
  });

  // Actions
  const handleAddCountdown = (countdownData) => {
    const createID = `${countdownData.countdownTitle}_${countdownList.length + 1}_${Math.floor(Math.random() * 100)}`;

    setCountdownList((oldState) => [...oldState, {...countdownData, id: createID}])
  }
  const handleDeleteCountdown = (id) => {
    const copyCountdownList = [...countdownList]
    const deleteCountdownItem = copyCountdownList.filter((countdown) => 
      countdown.id !== id)

    setCountdownList(deleteCountdownItem)
    toast.error('Countdown Deletado')
  }

  useEffect(() => {
    localStorage.setItem('@countdownList', JSON.stringify(countdownList))
  }, [countdownList])

  return (
    <div className='wrapper'>
      <FormCountdown handleAddCountdown={handleAddCountdown} /> 

      <ul className='list-countdown'>
        {countdownList.map((item) => <CountdownCard 
          key={item.id} 
          countdownData={item} 
          handleDeleteCountdown={handleDeleteCountdown}
        />)}
      </ul>  

      <Toaster 
        toastOptions={{
          style: {
            backgroundColor: '#1b1d1d',
            color: '#fff',
          }
        }}
      />
    </div>
  )
}