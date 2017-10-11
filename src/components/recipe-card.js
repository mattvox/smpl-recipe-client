import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'

const divStyle = {
  marginBottom: '30px',
};

const imgStyle = {
  width: '100%',
  textAlign: 'center',
};

const RecipeCard = (props) => {
  return (
    <div style={divStyle}>
      <MuiThemeProvider>
        <Card>
          <CardTitle title={props.title} />
          <CardMedia>
            <img src={props.image} style={imgStyle} alt={`img${props.id}`} />
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    </div>
  );
};

export default RecipeCard;
