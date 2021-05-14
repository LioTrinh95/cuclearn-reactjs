import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/Form-controls/InputField';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from '../../../../components/Form-controls/PasswordField';

const useStypes = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(4),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: 'center',

    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    },

    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    },
}));


RegisterForm.propTypes = {
    onSubmit: PropTypes.func,

};

function RegisterForm(props) {
    const classes = useStypes();
    const schema = yup.object().shape({
        fullname: yup.string().required('Please enter your full name.')
            .test('Should has at least two words', 'Please enter at least two word.', (value) => {
                return value.split(' ').length >= 2;
            }),
        email: yup.string().required('Please enter your email.')
            .email('Please enter a valid email address.'),
        password: yup.string().required('Please enter your password.')
            .min(6, 'Please enter at least 6 characters.'),
        retypepassword: yup.string()
            .required('Please retype your password.')
            .oneOf([yup.ref('password')], 'Password does not match'),

    });

    const form = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
            retypepassword: '',
        },
        resolver: yupResolver(schema),
    })
    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
        // form.reset();
    }
    const { isSubmitting } = form.formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}

            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Create An Account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name='fullname' label='Full Name' form={form} />
                <InputField name='email' label='Email' form={form} />
                <PasswordField name='password' label='Password' form={form} />
                <PasswordField name='retypepassword' label='Retype Password' form={form} />
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size='large'
                >Create an Account</Button>
            </form>
        </div >
    );
}

export default RegisterForm;