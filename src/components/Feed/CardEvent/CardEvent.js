import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import PlaceIcon from '@material-ui/icons/Place';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccessIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import 'typeface-roboto';
import Aux from '../../../hoc/Aux';
import cls from './CardEvent.scss';

const styles = theme => ({
    card: {

        [theme.breakpoints.down('sm')]: {
            maxWidth: 400,
            marginBottom: 18,
        },

        maxWidth: 545,
        marginBottom: 18,

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    button: {
        width: '100%',
    },
    input: {
        display: 'none',
    },
    straightButt: {
        paddingLeft: 0,
    },

});

class CardEvent extends Component {
    state = {expanded: false};

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    render() {
        const {classes} = this.props;

        return (

            <Aux>
                <Typography variant="h5" className={cls.eventDate}>
                    13th February 2019
                </Typography>
                <hr align="left"/>

                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    />
                    <CardContent>

                        <Typography variant="h6" gutterBottom>
                            Some cool event
                        </Typography>

                        <div className={cls.mainInfo}>

                            <IconButton aria-label="Event place" disabled={true} className={classes.straightButt}>


                                <PlaceIcon/>


                            </IconButton>
                            <Typography paragraph>
                                Aristotelessteig 6, 10318 Berlin
                            </Typography>

                            <IconButton aria-label="Event time" disabled={true}>
                                <AccessIcon/>

                            </IconButton>

                            <Typography paragraph>
                                10:00 AM
                            </Typography>

                        </div>

                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        {/*<IconButton aria-label="Add to favorites">*/}
                        {/*<FavoriteIcon/>*/}
                        {/*</IconButton>*/}
                        <IconButton aria-label="Share">
                            <ShareIcon/>
                        </IconButton>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon/>

                        </IconButton>

                    </CardActions>

                    <Button variant="contained" color="primary" className={classes.button} href="/event">
                        Join Event
                    </Button>

                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                minutes.
                            </Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                                to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                                cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don’t open.)
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>

            </Aux>
        );
    }
}

CardEvent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardEvent);
