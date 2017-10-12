import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Masonry from 'react-masonry-component'
import InfiniteScroll from 'react-infinite-scroller'

import * as actions from '../actions/'

import RecipeCard from './recipe-card'

const cardStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '260px',
  listStyle: 'none',
}

const masonryContainer = {
  margin: '20px auto',
}

const masonryOptions = {
  columnWidth: 300,
  fitWidth: true,
}

class Recipes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
      hasMore: true,
    }
  }

  componentDidMount() {
    !this.props.isFetched &&
      this.props.fetchRecipes(this.props.location.query.search)
  }

  componentWillReceiveProps(nextProps) {
    const search = this.props.location.query.search
    const nextSearch = nextProps.location.query.search
    const recipeLength = Object.keys(this.props.recipes).length
    const nextRecipeLength = Object.keys(nextProps.recipes).length

    search !== nextSearch &&
      this.props.fetchRecipes(nextSearch)

    recipeLength === nextRecipeLength
      ? this.setState({ hasMore: false })
      : this.setState({ hasMore: true })

    this.setState({ offset: nextRecipeLength || 0 })
  }

  renderMasonry() {
    const search = this.props.location.query.search
    const { offset, hasMore } = this.state

    return (
      <InfiniteScroll
        style={{ width: '100%' }}
        hasMore={hasMore}
        loadMore={() => {
          setTimeout(() => {
            this.props.fetchMoreRecipes(search, offset)
          }, 500)
        }}
        loader={<div>loading...</div>}
        useWindow
      >
        <Masonry
          style={masonryContainer}
          elementType={'ul'}
          options={masonryOptions}
        >
          {this.renderRecipes()}
        </Masonry>
      </InfiniteScroll>
    )
  }

  renderRecipes() {
    return _.map(this.props.recipes, recipe => {
      const { id, title, image_url } = recipe
      
      return (
        <li key={id} style={cardStyle}>
          <Link to={`recipes/${id}`}>
            <RecipeCard
              title={title}
              image={image_url}
              id={id}
            />
          </Link>
        </li>
      )
    })
  }

  render() {
    return (
      this.props.isFetched
        ? this.renderMasonry()
        : <div>loading...</div>
    )
  }
}

function mapStateToProps({ recipes }) {
  return {
    recipes: recipes.recipes,
    isFetched: recipes.isFetched,
  }
}

export default connect(mapStateToProps, actions)(Recipes)
