import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    lable: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled } = props;
    const { formState: { errors } } = form;
    const hasError = errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) =>
                <TextField {...field}
                    fullWidth
                    label={label}
                    disabled={disabled}
                    variant="outlined"
                    margin="normal"


                    error={hasError}
                    helperText={errors[name]?.message}
                />
            }
        />
    );
}

export default InputField;
