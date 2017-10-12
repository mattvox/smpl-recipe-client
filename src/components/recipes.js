/*
TODO

- add Styled components
- refactor and clean up code, remove console logs, etc
- refactor Redux state with better, less redundant object names
*/

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Masonry from 'react-masonry-component'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid } from 'semantic-ui-react'

import * as actions from '../actions/'

import RecipeCard from './recipe-card'

const cardStyle = {
  marginLeft: '5px',
  marginRight: '5px',
  width: '220px',
}

const masonryContainer = {
  margin: '0 auto',
}

const masonryOptions = {
  columnWidth: 250,
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
    // if (this.props.recipes.length === 0) {
    if (Object.keys(this.props.recipes).length === 0) {
      this.props.fetchRecipes(this.props.location.query.search)
    }
  }

  componentWillReceiveProps(nextProps) {
    const search = this.props.location.query.search

    const nextSearch = nextProps.location.query.search


    // if (this.props.recipes.length !== 0) {
    if (Object.keys(this.props.recipes).length !== 0) {
      if (search !== nextSearch) {
        console.log('current search term: ', search)
        console.log('new search term: ', nextSearch)
        this.props.fetchRecipes(nextSearch)

        this.setState({
          // offset: nextProps.recipes.length,
          offset: Object.keys(nextProps.recipes).length,
        })
      }

      // if (this.props.recipes.length === nextProps.recipes.length) {
      if (Object.keys(this.props.recipes).length === Object.keys(nextProps.recipes).length) {
        this.setState({
          hasMore: false,
        })
      } else {
        this.setState({
          hasMore: true,
        })
      }
    }

    this.setState({
      // offset: nextProps.recipes.length || 0,
      offset: Object.keys(nextProps.recipes).length || 0,
    })
  }

  renderMasonry() {
    const search = this.props.location.query.search

    return (
      <InfiniteScroll
        hasMore={this.state.hasMore}
        loadMore={() => {
          setTimeout(() => {
            this.props.fetchMoreRecipes(search, this.state.offset)
          }, 500)
        }}
        loader={<div>loading...</div>}
        useWindow
      >
        <Grid centered>
          <Grid.Row columns={1}>
            <Grid.Column width={12}>
              <Masonry
                style={masonryContainer}
                elementType={'div'}
                options={masonryOptions}
              >
                {this.renderRecipes()}
              </Masonry>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </InfiniteScroll>
    )
  }

  renderRecipes() {
    // return this.props.recipes.map((recipe) => {
    //   return (
    //     <div key={recipe.id} style={cardStyle}>
    //       <Link to={`recipes/${recipe.id}`}>
    //         <RecipeCard
    //           title={recipe.title}
    //           image={recipe.image_url}
    //           id={recipe.id}
    //         />
    //       </Link>
    //     </div>
    //   )
    // })

    return _.map(this.props.recipes, recipe => {
      return (
        <div key={recipe.id} style={cardStyle}>
          <Link to={`recipes/${recipe.id}`}>
            <RecipeCard
              title={recipe.title}
              image={recipe.image_url}
              id={recipe.id}
            />
          </Link>
        </div>
      )
    })
    // return this.props.recipes.map((recipe) => {
    //   return (
    //     <div key={recipe.id} style={cardStyle}>
    //       <Link to={`recipes/${recipe.id}`}>
    //         <RecipeCard
    //           title={recipe.title}
    //           image={recipe.image_url}
    //           id={recipe.id}
    //         />
    //       </Link>
    //     </div>
    //   )
    // })
  }

  render() {
// if isLoading render spinner else do below
    if (!this.props.recipes) {
      return <div>LOADING...</div>
    // eslint-disable-next-line
    } else {
      return this.renderMasonry()
    }
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes.recipes,
    isFetched: state.recipes.isFetched,
  }
}

export default connect(mapStateToProps, actions)(Recipes)
