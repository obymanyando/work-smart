import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Box, Link } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  filter: {
      margin: '10px',
      textAlign: 'left',
      width: '80%'
  }
});

const Filter = {
    NEARME: 'nearme',
    DEFAULT: 'default'
}

class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterOpen: false,
    		searchText:''
        }
    }

    toggleFilterView = (event) => {
        this.setState({ filterOpen: !this.state.filterOpen });
    }

    applyFilter = (filter) => (event) => {
        switch (filter) {
            case (Filter.NEARME):
                this.props.nearMeFilter();
                break;
            default:
                this.props.defaultFilter()
        }
        event.preventDefault();
    }
    onSearchInputChange = (event) => {
        this.setState({ searchText: event.target.value })
    }

    onSearchSubmit = (event) => {
        this.props.onSubmit(this.state.searchText) 
    }
    render() {
        const classes = this.props.classes;
        return (
            <Fragment>
                <Paper className={classes.root}>
                    <IconButton 
                        className={classes.iconButton} 
                        aria-label="menu"
                        onClick={this.toggleFilterView}
                    >
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Gigs"
                        inputProps={{ 'aria-label': 'search gigs' }}
                        defaultValue={this.state.searchText}
                        onChange={this.onSearchInputChange}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={this.onSearchSubmit}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Box display={this.state.filterOpen? 'inline': 'none'}>
                    <div className={classes.filter}>
                        Filters: <Link href='' onClick={this.applyFilter(Filter.NEARME)}>Find near me</Link>
                    </div>
                </Box>
            </Fragment>
        );
    }
}

export default withStyles(styles)(SearchInput);
