import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CharactersController from '../../controllers/CharactersController';
import * as URLUtil from '../../utils/URLUtil';

import AppBar from '../../components/ui/AppBar';

import styled from 'styled-components';
import { Container, Card, CardMedia, CardContent, CardActionArea, Grid, CircularProgress, Button } from '@material-ui/core';
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

    .btn-show-more {
      margin: 40px 0px;
      width: 100%;
    }
  }
`

class Home extends Component {

  componentDidMount() {
    this.getCharacters();
  }

  getCharacters = () => {

    // Se não houver dados no Reducer
    if (!this.props.query.results.length) {

      this.props.searchAction({
        searching: true,
        string: '',
        results: []
      });

      CharactersController.getCharacters().then(result => {

        // Armazenar resultados no Reducer
        this.props.searchAction({
          searching: false,
          string: '',
          results: result.data.data.results
        });

      }).catch(result => {

        console.log(result);
      });
    }
  }

  loadMore = () => {

    const currentResults = this.props.query.results;
    const amountOfItems = this.props.query.results.length;
    const queryString = this.props.query.string ? this.props.query.string : '';
    
    CharactersController.getCharacters(queryString, amountOfItems).then(result => {

      const updatedResults = currentResults.concat(result.data.data.results);

      // Adicionar mais resultados no Reducer
      this.props.searchAction({
        searching: false,
        string: queryString,
        results: updatedResults
      });

    }).catch(result => {

      console.log(result);
    });
    
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
              this.props.query.searching ?

                <div className="loading">
                  <CircularProgress />
                </div>

                :
                this.props.query.results.length ?
                  <>
                    <Typography variant="h1" component="h1">
                      {this.props.query.string.length ?
                        `Results for "${this.props.query.string}"`
                        :
                        `Choose a Hero`
                      }
                    </Typography>
                    {
                      this.mountList(this.props.query.results)
                    }
                    <Button
                      className="btn-show-more"
                      variant="contained" 
                      color="primary" 
                      onClick={() => this.loadMore()}
                    >
                      {`Show more`}
                    </Button>
                  </>
                  :
                  <Typography variant="h1" component="h1">
                    {`Hero Not Found`}
                  </Typography>
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