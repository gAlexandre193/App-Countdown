import { useState, useEffect } from 'react'
import { BsSortUp, BsSortDown } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import FormCountdown from './components/FormCountdown'
import CountdownCard from './components/CardCountdown'

export default function App() {
  const [countdownList, setCountdownList] = useState(() => {
    const getCountdownListOnLocalStorage = localStorage.getItem('@countdownList')

    if(getCountdownListOnLocalStorage) return JSON.parse(getCountdownListOnLocalStorage)

    return []
  });
  const [sort, setSort] = useState('Asc')

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
  const handleSortAsc = () => setSort('Asc')
  const handleSortDesc = () => setSort('Desc')

  useEffect(() => {
    localStorage.setItem('@countdownList', JSON.stringify(countdownList))
  }, [countdownList])

  return (
    <div className='wrapper'>
      <FormCountdown handleAddCountdown={handleAddCountdown} /> 

      <div className='filterCountdownListContainer'>
        <h3> Filtrar Countdown </h3>

        {sort === 'Asc'
          ? <button className='iconContainer' onClick={handleSortDesc}>
            <BsSortUp className='icon' />
          </button>

          : <button className='iconContainer' onClick={handleSortAsc}>
            <BsSortDown className='icon' />
          </button>}

      </div>

      <ul className='list-countdown'>
        {countdownList
          .sort((a, b) => sort === 'Asc'
            ? new Date(a.countdownDate) - new Date(b.countdownDate)
            : new Date(b.countdownDate) - new Date(a.countdownDate))
          .map((item) => <CountdownCard 
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