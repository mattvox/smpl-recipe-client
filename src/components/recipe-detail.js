import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'

import { fetchRecipe } from '../actions/index'

const { Row, Column: Col } = Grid

const styles = {
  container: {
    marginTop: '40px',
    marginBottom: '40px',
    backgroundColor: '#f5f5f5',
    fontSize: '18px',
    borderRadius: '6px'
  },
  image: {
    boxShadow: '2px 2px 12px #dadada',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,

  },
  item: {
    paddingBottom: '16px',
  },
}

class RecipeDetail extends Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.params.id)
  }

  renderIngredients() {
    return this.props.recipe.ingredients.map((ingredient, index) => {
      return (
        <li key={index} style={styles.item}>
          {ingredient}
        </li>
      )
    })
  }

  renderMethods() {
    return this.props.recipe.methods.map((method, index) => {
      return (
        <li key={index} style={styles.item}>
          <p><strong>{index + 1}. </strong>{method}</p>
        </li>
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
      <Grid container centered stackable style={styles.container}>
        <Row columns={2}>
          <Col>
            <Image style={styles.image} shape='rounded' fluid src={image_url} alt={title} />
          </Col>
          <Col>
            <h1>{title}</h1>
            <h3>{description}</h3>
            <p>Difficulty: {difficulty}</p>
            <p>Servings: {servings}</p>
          </Col>
        </Row>

        <Row columns={2}>
          <Col>
            <h2>Ingredients</h2>
            <ul style={styles.list}>
              {this.renderIngredients()}
            </ul>
          </Col>
          <Col>
            <h2>Methods</h2>
            <ul style={styles.list}>
              {this.renderMethods()}
            </ul>
          </Col>
        </Row>
      </Grid>
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
