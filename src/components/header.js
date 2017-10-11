/*
TODO

- break nav bar out into its own component?
*/

import React from 'react';
import Headroom from 'react-headroom';
import { Grid, Menu } from 'semantic-ui-react';

import SearchBar from './search-bar';

const Header = () => (
  <Headroom>
    <Grid centered textAlign='center'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Menu borderless>
            <Menu.Item header>smpl Recipe</Menu.Item>
            <Menu.Item position='right'>
              <SearchBar />
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  </Headroom>
);

export default Header;
