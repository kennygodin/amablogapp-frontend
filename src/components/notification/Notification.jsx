import './Notification.scss';
import { Alert, Snackbar } from '@mui/material';

const Notification = (props) => {
  const { notify, setNotify } = props;

  const handleClose = () => {
    setNotify({ ...notify, isOpen: false });
  };
  return (
    <div>
      <Snackbar
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose}>{notify.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
