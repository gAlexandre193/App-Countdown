import { useState, useEffect } from 'react'
import FormCountdown from './components/FormCountdown';
import CountdownCard from './components/CardCountdown';

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
  }

  useEffect(() => {
    localStorage.setItem('@countdownList', JSON.stringify(countdownList))

    console.log(JSON.parse(localStorage.getItem('@countdownList')))
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
    </div>
  )
}