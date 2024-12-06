import { useState } from 'react'
import FormCountdown from './components/FormCountdown';
import CountdownCard from './components/CardCountdown';

export default function App() {
  const [countdownList, setCountdownList] = useState([]);

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