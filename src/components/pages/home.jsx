import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CharactersController from '../../controllers/CharactersController';
import * as URLUtil from '../../utils/URLUtil';

import AppBar from '../../components/ui/AppBar';

import styled from 'styled-components';
import { Container, Card, CardMedia, CardContent, CardActionArea, Grid, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from "react-redux";
import searchAction from "../../actions/searchAction";

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

    h1 {
      margin-bottom: 30px;
      font-size: 24px;
    }
  }
`

class Home extends Component {

  state = {
    data: [],
    results: []
  };

  componentDidMount() {
    this.getCharacters();
  }

  getCharacters = () => {

    // Se não houver dados no Reducer
    if (!this.props.query.results.length) {

      CharactersController.getCharacters().then(result => {

        this.setState({
          data: result.data.data.results
        });

        // Armazenar resultados no Reducer
        this.props.searchAction({
          string: '',
          results: result.data.data.results
        });

      }).catch(result => {

        console.log(result);
      });
    }
  }

  searchCharacters = () => {
    console.log('searchCharacters');
  }

  mountList = (data) => {
    let items = [];
    data.map((item, index) => {
      return (
        items.push(

          <Grid key={index} item xs={12} sm={6} md={3}>
            <Card className="card">

              <CardActionArea component={Link} to={`/hero/${item.id}`}>

                {!item.thumbnail.path ? '' :
                  <CardMedia
                    className="card-image"
                    image={URLUtil.replaceHTTPbyHTTPS(item.thumbnail.path) + `.` + item.thumbnail.extension}
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

  render() {
    return (
      <Style>
        <main className="component-main">

          <AppBar />

          <Container maxWidth="md" className="component-list">

            {
              this.props.query.results.length ?
                <>
                    <Typography variant="h1" component="h1">
                      {this.props.query.length ?
                      `Results for "${this.props.query.string}"`
                      :
                      `Choose a Hero`
                      }
                    </Typography>
                  {
                    this.mountList(this.props.query.results)
                  }
                </>
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


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  searchAction: (payload) => dispatch(searchAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);