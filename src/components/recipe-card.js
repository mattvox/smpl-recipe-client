import React from 'react'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = {
  card: {
    maxWidth: 330,
    marginBottom: '40px',
  },
  media: {
    height: 200,
  },
}

const RecipeCard = (props) => {
  const { classes } = props

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title}
      />
      <CardContent>
        <Typography type='headline' component='h2'>
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(RecipeCard)
