import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CharactersController from '../../controllers/CharactersController';

import styled from 'styled-components';
import { Container, Card, CardMedia, CardContent, CardActionArea, Grid, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AppBar from '../ui/AppBar';

/**
 * Style
 */
const Style = styled.div`
  .component-main {

    .component-list {
      margin-top: 100px;
    }

    .card {
      margin-bottom: 10px;

      .card-image {
        height: 100px;
      }

    }
  }
`

export default class Home extends Component {

  state = {
    data: [],
    results: []
  };

  componentDidMount() {
    this.getCharacters();
  }

  getCharacters = () => {

    CharactersController.getCharacters().then(result => {

      console.log(result.data.data);

      this.setState({
        data: result.data.data.results
      });

    }).catch(result => {

      console.log(result);

    });
  }

  mountList = () => {
    let items = [];
    this.state.data.map((item, index) => {
      return (
        items.push(

          <Grid key={index} item xs={12} sm={6} md={3}>
            <Card className="card">

              <CardActionArea component={Link} to={`/hero/${item.id}`}>

                {!item.thumbnail.path ? '' :
                  <CardMedia
                    className="card-image"
                    image={item.thumbnail.path + `.` + item.thumbnail.extension}
                    title={item.name}
                  />
                }

                <CardContent>

                  <Grid container spacing={3}>
                    <Grid item>
                      <Typography noWrap component="p">{item.name}</Typography>
                    </Grid>
                  </Grid>

                </CardContent>

              </CardActionArea>

            </Card>
          </Grid>)
      )
    })
    return <Grid container spacing={5}>{items}</Grid>;
  }

  /**
   * WhileTyping Component: Buscar após soltar tecla...
   */
  filterData = (name, value) => {

    console.log('filterData');
    
  }

  render() {
    return (
      <Style>
        <main className="component-main">

          <AppBar callback={this.filterData} />

          <Container maxWidth="md" className="component-list">

            {
              this.state.data && this.state.data.length ?
                this.mountList()
                :
                <div className="loading">
                  <CircularProgress />
                </div>
            }

          </Container>
        </main>
      </Style>
    )
  }

}