import React, { Component } from 'react';
import CharactersController from '../../controllers/CharactersController';
import * as URLUtil from '../../utils/URLUtil';

import styled from 'styled-components';
import { Container, Card, CardMedia, CardContent, Grid, CircularProgress, Button, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

// Redux
import { connect } from "react-redux";
import editModeAction from "../../actions/editModeAction";
import setHeroAction from "../../actions/setHeroAction";
import updateHeroAction from "../../actions/updateHeroAction";

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
      font-size: 18px;
      font-style: italic;
    }

    .descriptionField {
      width: 100%;
    }
  }
`

class Hero extends Component {

  state = {
    data: []
  };

  componentDidMount() {
    this.getSeriesByCharacterID();
  }

  findIndexObject = (id, object) => {
    return object.findIndex(item => item.id === id);
  }

  getSeriesByCharacterID = () => {

    const id = this.props.match.params.id;
    
    // Se houver item no Redux
    if (this.checkIfHeroIsIntoRedux(id, this.props.heroes)) {

      console.log('From Redux baby');

      const indexHeroesObject = this.findIndexObject(id, this.props.heroes);

      this.setState({
        index: indexHeroesObject,
        id: this.props.heroes[indexHeroesObject].id,
        name: this.props.heroes[indexHeroesObject].name,
        description: this.props.heroes[indexHeroesObject].description,
        series: this.props.heroes[indexHeroesObject].series
      });

    } else {

      console.log('From API bro');

      /**
       * Character (Hero) Info
       */
      CharactersController.getCharacter(id).then(result => {

        const heroName = result.data.data.results[0].name;
        const heroDescription = result.data.data.results.description;
        
        /**
         * Series
         */
        CharactersController.getSeriesByCharacterID(id).then(result => {
  
          this.setState({
            id: id,
            name: heroName,
            description: heroDescription,
            series: result.data.data.results
          });
  
          // Salva item no Redux
          this.storeHeroesIntoRedux(id, heroName, heroDescription, result.data.data.results);
  
        }).catch(result => {
  
          console.log(result);
  
        });

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

  storeHeroesIntoRedux = (id, name, description, series) => {
    this.props.setHeroAction({
      id,
      name,
      description,
      series
    });
  }

  onChangeHero = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  updateHero = () => {

    const id = this.props.match.params.id;
    const indexHeroesObject = this.findIndexObject(id, this.props.heroes);

    this.props.updateHeroAction({
      index: indexHeroesObject,
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      series: this.state.series
    });
  }

  editHero = () => {

    if (this.props.editing) {
      this.updateHero();
    }

    this.props.editModeAction(!this.props.editing);
  }

  mountList = () => {
    let items = [];
    this.state.series.map((item, index) => {
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

          {
            this.state.series && this.state.series.length ?
            <>
              <Grid container spacing={5}>
                <Grid item xs={6}>

                  <Typography variant="h1" component="h1">
                    Series • {this.state.name}
                  </Typography>

                  <Typography variant="h2" component="h2">
                    {
                      this.props.editing ?
                      <TextField
                        className="descriptionField"
                        name="description"
                        placeholder="Description"
                        value={this.state.description}
                        multiline
                        onChange={this.onChangeHero}
                      />
                      :
                      this.state.description ?
                      this.state.description
                      :
                      'No Description...'
                    }
                  </Typography>

                </Grid>

                <Grid item xs={6} className="alignRight">
                  
                  <Button
                    variant="contained"
                    size="small"
                    color={this.props.editing ? 'primary' : 'secondary'}
                    startIcon={this.props.editing? <SaveIcon /> : <EditIcon />}
                    onClick={
                      () => this.editHero()
                    }
                  >
                    {this.props.editing ? 'Save' : 'Edit'}
                  </Button>
                  
                  {/*
                  <Button
                    size="small"
                    variant="contained"
                    color="default"
                    onClick={() => console.log(this.props.heroes)}
                  >
                    Props
                  </Button>
                  */}

                </Grid>
              </Grid>
              
              {
                this.mountList()
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
  editModeAction: (payload) => dispatch(editModeAction(payload)),
  setHeroAction: (payload) => dispatch(setHeroAction(payload)),
  updateHeroAction: (payload) => dispatch(updateHeroAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero);