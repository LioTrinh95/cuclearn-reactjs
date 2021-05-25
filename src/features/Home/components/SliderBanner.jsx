import { Box, Button, makeStyles, MobileStepper, useTheme } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

SliderBanner.propTypes = {
    sliderData: PropTypes.array.isRequired,
};
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    img: {
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden', // 	Khi chiều cao của box không đủ chứa text, thì text bị tràn sẽ được dấu đi.
        width: '100%',
        borderRadius: '2px',
    },
    positionBtn: {
        padding: 0,
        margin: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        '& > button': {
            top: '-90px',
            color: '#fff',
            minWidth: 0,
        },
    },
}));


function SliderBanner({ sliderData }) {

    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    const theme = useTheme();
    const maxSteps = sliderData.length;

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleStepChange = (step) => setActiveStep(step);

    return (
        <Box className={classes.root}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {sliderData.map((step, index) => (
                    <Box key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img className={classes.img} src={step.imgPath} alt={step.label} />
                        ) : null}
                    </Box>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                className={classes.positionBtn}
                nextButton={
                    <Button type="submit"
                        variant="text"
                        size='small'
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        className={classes.backBtn}
                    >

                        {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon style={{ fontSize: 60 }} /> : <KeyboardArrowRightIcon style={{ fontSize: 60 }} />}
                    </Button>
                }
                backButton={
                    <Button type="submit"
                        variant="text"
                        size='small'
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className={classes.prevBtn}
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowRightIcon style={{ fontSize: 60 }} /> : <KeyboardArrowLeftIcon style={{ fontSize: 60 }} />}
                    </Button>
                }
            />
        </Box>
    );
}

export default SliderBanner;