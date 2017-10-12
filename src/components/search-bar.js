import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Input } from 'semantic-ui-react'



import * as actions from '../actions'


class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { searchTerm: '' }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const search = this.state.searchTerm.toLowerCase()
    const offset = 0
    const isFetched = false
    const callback = () => {
      browserHistory.push(`/recipes?search=${search}`)

      this.setState({
        searchTerm: '',
      })
    }

    this.props.fetchRecipes(search, offset, isFetched, callback)
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className='input-group'>
        <Input
          icon='search'
          size='large'
          placeholder='Search favorite recipes...'
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { search: state.recipes.search }
}

export default connect(mapStateToProps, actions)(SearchBar)
