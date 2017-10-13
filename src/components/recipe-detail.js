import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchRecipe } from '../actions/index'

class RecipeDetail extends Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.params.id)
  }

  renderIngredients() {
    return this.props.recipe.ingredients.map((ingredient) => {
      return (
        <li key={ingredient}>{ingredient}</li>
      )
    })
  }

  renderMethods() {
    return this.props.recipe.methods.map((method) => {
      return (
        <li key={method}>{method}</li>
      )
    })
  }

  renderRecipe() {
    const {
      title,
      description,
      image_url,
      difficulty,
      servings,
    } = this.props.recipe

    return (
      <div className='col-sm-8 col-sm-offset-2'>
        <Link to='/'>Back to Home</Link>
        <h3>{title}</h3>
        <h6>{description}</h6>
        <img src={image_url} alt={title} />
        <p>Difficulty: {difficulty}</p>
        <p>Servings: {servings}</p>
        <p>Ingredients:</p>
        <ul>
          {this.renderIngredients()}
        </ul>
        <p>Methods:</p>
        <ol>
          {this.renderMethods()}
        </ol>
      </div>
    )
  }

  render() {
    return (
      this.props.isFetched
        ? this.renderRecipe()
        : <div>Loading...</div>
    )
  }
}

const mapStateToProps = ({ activeRecipe }) => {
  return {
    recipe: activeRecipe.recipe,
    isFetched: activeRecipe.isFetched,
  }
}

export default connect(mapStateToProps, { fetchRecipe })(RecipeDetail)
