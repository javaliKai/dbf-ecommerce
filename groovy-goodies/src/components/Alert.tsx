import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { uiSliceActions } from '../store/uiSlice';

const Alert = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.ui.error);
  const alert = useAppSelector((state) => state.ui.alert);

  let alertMessage;
  let alertTitle;
  let alertBoxColor = 'green';
  let hide = true;

  if ((error && alert) || alert) {
    alertTitle = 'Success';
    alertMessage = alert;
    alertBoxColor = 'green';
    hide = false;
  } else if (error) {
    alertTitle = 'Error';
    alertMessage = error.message;
    alertBoxColor = 'red';
    hide = false;
  }

  useEffect(() => {
    const alertShowTimer = setTimeout(() => {
      dispatch(uiSliceActions.resetAlertError());
    }, 5000);
    return () => {
      clearTimeout(alertShowTimer);
    };
  }, [dispatch, alert, error]);

  return (
    <>
      {!hide && (
        <div className='fixed right-[1vw] bg-white z-20'>
          <div role='alert'>
            <div
              className={`bg-${alertBoxColor}-500 text-white font-bold rounded-t px-4 py-2`}
              style={
                alertBoxColor === 'green' ? { backgroundColor: 'green' } : {}
              }
            >
              {alertTitle}
            </div>
            <div
              className={`border border-t-0 border-${alertBoxColor}-400 rounded-b px-4 py-3 text-${alertBoxColor}-700`}
            >
              <p>{alertMessage}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
