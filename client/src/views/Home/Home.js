import React, { useState } from 'react'
import "./Home.css"
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import TransactionCard from '../../components/TrnsactionCard/TransactionCard.js'
import imgAdd from "./add.png"
import { Link } from 'react-router-dom'
import logout from './logout.png'

function Home() {

  const [user, setUser] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
      setUser(currentUser)
    }

    if (!currentUser) {
      window.location.href = '/login'
    }

  }, [])

  const loadTransactions = async () => {
    if (!user._id) {
      return
    }

    
  //   toast.loading('Loading transactions')

  //   const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`)

  //   const allTransactions = response.data.data
    
  //   toast.dismiss()
  //   setTransactions(allTransactions)
   
  // }

  try {
    toast.loading('Loading transactions');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`);
    const allTransactions = response?.data?.data || [];
    setTransactions(allTransactions);
    toast.dismiss();
  } catch (error) {
    console.error('Error loading transactions:', error);
    toast.dismiss();
    toast.error('Failed to load transactions');
  }
};




  useEffect(() => {
    loadTransactions()
  }, [user])

  useEffect(() => {
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      if (transaction.type === "credit") {
        income += transaction.amount
      }
      else {
        expense += transaction.amount
      }
    })

    setNetIncome(income)
    setNetExpense(expense)

  }, [transactions])

  return (
    <div>
    <div className = 'greeting-container'>
      <h1 className='home-greeting'>Hello {user.fullName}!! </h1>
      <h2 className='home-heading'>Welcome to the Expense Tracker.....</h2>
      </div>


      <span className='home-logout'
        onClick={() => {
          localStorage.clear()
          toast.success("Logged out successfully")

          setTimeout(() => {
            window.location.href = '/login'
          }, 3000);
        }}>
        Logout
      </span>
     
      <span className='logout-icon'>
      <img src={logout} alt='Logout' />
      </span>



      <div className='net-transactions-value'>
        <div className='net-transactions-value-item'>
          <span className='net-transactions-value-amount'>
            + {netIncome}
          </span>

          <span className='net-transactions-value-title'>
            Net Income
          </span>
        </div>

        <div className='net-transactions-value-item'>
          <span className='net-transactions-value-amount'>
            - {netExpense}
          </span>

          <span className='net-transactions-value-title'>
            Net Expense
          </span>
        </div>

        <div className='net-transactions-value-item'>
          <span className='net-transactions-value-amount'>
            {netIncome - netExpense}
          </span>

          <span className='net-transactions-value-title'>
            Net Balance
          </span>
        </div>
      </div>

      <h2 className='list-heading'>Expenses list : </h2>

      <div className='transactions-container'>
        {
          transactions.map((transaction,i) => {
            const {
              _id,
              title,
              amount,
              category,
              type,
              createdAt,
             
            } = transaction;

            return <TransactionCard
              key={_id}
              _id={_id}
              title={title}
              amount={amount}
              category={category}
              type={type}
              createdAt={createdAt}
              loadTransactions={loadTransactions}
            />
          })
        }
        
      </div>

      <Link to='/add-transaction' >
        <img src={imgAdd} alt='Add Transaction' className='add-transaction' />

      </Link>

      <Toaster />
    </div>
  )
}

export default Home