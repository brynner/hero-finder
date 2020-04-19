import React, { Component } from 'react';
import CharactersController from '../../controllers/CharactersController';

import styled from 'styled-components';
import { Container, Card, CardMedia, CardContent, Grid, CircularProgress } from '@material-ui/core';
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
        height: 200px;
      }

    }

    h1 {
      margin-bottom: 10px;
      font-size: 24px;
    }

    h2 {
      margin-bottom: 20px;
      font-size: 20px;
    }
  }
`

export default class Hero extends Component {

  state = {
    data: [],
    results: []
  };

  componentDidMount() {
    this.getSeriesByCharacterID();
  }

  getSeriesByCharacterID = () => {

    const id = this.props.match.params.id;

    CharactersController.getSeriesByCharacterID(id).then(result => {

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

          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card className="card">

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
                    <Typography noWrap component="p">{item.title}</Typography>
                  </Grid>
                </Grid>

              </CardContent>

            </Card>
          </Grid>)
      )
    })
    return <Grid container spacing={5}>{items}</Grid>;
  }

  render() {
    return (
      <Style>
        <main className="component-main">

          <AppBar callback={this.filterData} />

          <Container maxWidth="md" className="component-list">

            <Typography variant="h1" component="h1">
              Hero Name
            </Typography>

            <Typography variant="h2" component="h2">
              Series
            </Typography>

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
