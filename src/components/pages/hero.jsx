import React, { Component } from 'react';
import CharactersController from '../../controllers/CharactersController';
import * as URLUtil from '../../utils/URLUtil';

import styled from 'styled-components';
import { Container, Card, CardMedia, CardContent, Grid, CircularProgress, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { connect } from "react-redux";
import editModeAction from "../../actions/editModeAction";
import setHeroAction from "../../actions/setHeroAction";

/**
 * Style
 */
const Style = styled.div`
  .component-main {

    .alignRight {
      text-align: right;
    }
    
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

class Hero extends Component {

  state = {
    data: [],
    results: []
  };

  componentDidMount() {
    this.getSeriesByCharacterID();
  }

  getSeriesByCharacterID = () => {

    const id = this.props.match.params.id;
    
    // Se houver item no Redux
    if (this.checkIfHeroIsIntoRedux(id, this.props.heroes)) {

      console.log('From Redux baby');

      const indexHeroesObject = this.props.heroes.findIndex(item => item.id === id);

      this.setState({
        data: this.props.heroes[indexHeroesObject].series
      });

    } else {

      console.log('From API bro');

      CharactersController.getSeriesByCharacterID(id).then(result => {

        console.log(result.data.data);

        this.setState({
          data: result.data.data.results
        });

        // Salva item no Redux
        this.storeHeroesIntoRedux(id, result.data.data.results);

      }).catch(result => {

        console.log(result);

      });
    }

  }

  checkIfHeroIsIntoRedux = (id, heroes) => {

    if (!heroes) return;

    const verifyObjectID = heroes.some(obj => obj.id === id);

    return verifyObjectID;
  }

  storeHeroesIntoRedux = (id, series) => {
    this.props.setHeroAction({
      id: id,
      series: series
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
                  image={URLUtil.replaceHTTPbyHTTPS(item.thumbnail.path) + `.` + item.thumbnail.extension}
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

          <Container maxWidth="md" className="component-list">

            <Grid container spacing={5}>
              <Grid item xs={6}>

                <Typography variant="h1" component="h1">
                  Hero Name
                </Typography>

                <Typography variant="h2" component="h2">
                  Series
                </Typography>

              </Grid>

              <Grid item xs={6} className="alignRight">

                Edit mode?
                {this.props.editing ?
                  'Yes'
                  :
                  'No'
                }

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => this.props.editModeAction(!this.props.editing)}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => console.log(this.props.heroes)}
                >
                  Props
                </Button>

              </Grid>
            </Grid>

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

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  editModeAction: (payload) => dispatch(editModeAction(payload)),
  setHeroAction: (payload) => dispatch(setHeroAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero);