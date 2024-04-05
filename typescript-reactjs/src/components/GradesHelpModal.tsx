import { forwardRef, cloneElement } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';


interface FadeProps {
    children: React.ReactElement;
    in?: boolean;
    onClick?: any;
    onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
    onExited?: (node: HTMLElement, isAppearing: boolean) => void;
    ownerState?: any;
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null as any, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null as any, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {cloneElement(children, { onClick })}
        </animated.div>
    );
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


interface GradesHelpModal {
    open: boolean;
    handleClose: () => void;
}

const GradesHelpModal = ({ open, handleClose }: GradesHelpModal) => {
    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="spring-modal-title" variant="h5" component="h2" textAlign="center">
                            Grading Scheme: Grade Point Values
                        </Typography>

                        {/* Empty space */}
                        <div style={{ marginBottom: '20px' }} />

                        <Paper>
                            <Table size={"small"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Grade</TableCell>
                                        <TableCell>Points</TableCell>
                                        <TableCell>Equivalent Percentage</TableCell>
                                        <TableCell>4.0 Scale</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>A+</TableCell>
                                        <TableCell>12</TableCell>
                                        <TableCell>90-100</TableCell>
                                        <TableCell>4</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>A</TableCell>
                                        <TableCell>11</TableCell>
                                        <TableCell>3.9</TableCell>
                                        <TableCell>4</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>A-</TableCell>
                                        <TableCell>10</TableCell>
                                        <TableCell>80-84</TableCell>
                                        <TableCell>3.7</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>B+</TableCell>
                                        <TableCell>9</TableCell>
                                        <TableCell>77-79</TableCell>
                                        <TableCell>3.3</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>B</TableCell>
                                        <TableCell>8</TableCell>
                                        <TableCell>73-76</TableCell>
                                        <TableCell>3</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>B-</TableCell>
                                        <TableCell>7</TableCell>
                                        <TableCell>70-72</TableCell>
                                        <TableCell>2.7</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>C+</TableCell>
                                        <TableCell>6</TableCell>
                                        <TableCell>67-69</TableCell>
                                        <TableCell>2.3</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>C</TableCell>
                                        <TableCell>5</TableCell>
                                        <TableCell>63-66</TableCell>
                                        <TableCell>2</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>C-</TableCell>
                                        <TableCell>4</TableCell>
                                        <TableCell>60-62</TableCell>
                                        <TableCell>1.7</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>D+</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>57-59</TableCell>
                                        <TableCell>1.3</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>D</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>53-56</TableCell>
                                        <TableCell>1</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>D-</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>50-52</TableCell>
                                        <TableCell>0.7</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>F</TableCell>
                                        <TableCell>0</TableCell>
                                        <TableCell>0-49</TableCell>
                                        <TableCell>0</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {/* Empty space */}
                            <div style={{ marginBottom: '20px' }} />

                            <Typography variant="body1" component="h2" >
                                Additional Types of Grades:
                                <ul>
                                    <li>COM = Complete</li>
                                    <li>CR = Credit Earned</li>
                                </ul>
                            </Typography>
                        </Paper>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default GradesHelpModal