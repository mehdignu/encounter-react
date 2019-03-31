import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import NavLink from "react-router-dom/es/NavLink";
import cls from './Footer.scss';
const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    appBar: {
        position: 'relative',
    },
    toolbarTitle: {
        flex: 1,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    footer: {
        marginTop: theme.spacing.unit * 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit * 6}px 0`,
    },

    footer2: {
        marginTop: theme.spacing.unit * 4,
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit * 3}px 0`,
    },
});

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];
const footers = [
    {
        title: 'Encounter',
        description: [<NavLink exact to={{pathname: '/about'}} className={cls.link}> about</NavLink>, <NavLink exact to={{pathname: '/contact'}}  className={cls.link}> contact</NavLink>],
    },
    {
        title: 'Features',
        description: ['Secure Event Communication', 'Events without groups','Total control over your experience'],
    },
    // {
    //     title: 'Resources',
    //     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    // },
    {
        title: 'Legal',
        description: [ <NavLink exact to={{pathname: '/privacy'}} className={cls.link} > Privacy policy</NavLink>, <NavLink exact to={{pathname: '/legal'}} className={cls.link} > Terms of use</NavLink>],
    },
];

function Footer(props) {
    const { classes } = props;

    return (

            <footer className={classNames(classes.footer, classes.layout)}>
                <Grid container spacing={32} justify="space-evenly">
                    {footers.map(footer => (
                        <Grid item xs key={footer.title}>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                {footer.title}
                            </Typography>
                            {footer.description.map(item => (
                                <Typography key={item} variant="subtitle1" color="textSecondary">
                                    {item}
                                </Typography>
                            ))}
                        </Grid>
                    ))}

                </Grid>

                <Grid container spacing={32} justify="space-evenly">

                    <Typography className={classNames(classes.footer2)} variant="subtitle1" color="textSecondary">

                        copyright Encounter

                    </Typography>



                </Grid>
            </footer>

    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
