import { Dispatch } from "redux";
import { connect } from "react-redux";

import Alert from ".";
import { AlertActions } from "../../Constants/types";
import IRootState from "../../Reducers/Interfaces/IRootState";
import { closeAlert } from "../../Reducers/Alert/AlertActions";

const mapStateToProps = (state: IRootState) => ({ ...state.Alert })

const mapDispatchToProps = (dispatch: Dispatch<AlertActions>) => ({ closeAlert: () => dispatch(closeAlert()) })

const AlertContainer = connect(mapStateToProps, mapDispatchToProps);

export default AlertContainer(Alert);