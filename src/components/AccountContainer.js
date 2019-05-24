import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
// import {transactions} from '../transactionsData'

class AccountContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      masterTransactionList: [],
      displayedTransactionList: []
    }
  };

  async componentDidMount() {
    try {
      const call = await fetch('https://boiling-brook-94902.herokuapp.com/transactions');
      const transactions = await call.json();
      this.setState({
        masterTransactionList: transactions,
        displayedTransactionList: transactions
      });
    } catch (error) {
      console.log(error);
    };
  };

  setFilteredState = (newTransactionList) => {
    this.setState({ displayedTransactionList: newTransactionList });
  };

  filterTransactions = (queryString) => {
    const filteredTransactions = this.state.masterTransactionList.filter(transaction => {
      return (transaction.category).toLowerCase().includes(queryString) || (transaction.description).toLowerCase().includes(queryString)
    });
    this.setFilteredState(filteredTransactions);
  };

  handleChange = (event) => {
    this.filterTransactions(event.target.value.toLowerCase());
  };

  render() {

    return (
      <div>
        <Search 
          handleChange={this.handleChange}
        />
        <TransactionsList 
          displayedTransactionList={this.state.displayedTransactionList}
        />
      </div>
    )
  }
}

export default AccountContainer
