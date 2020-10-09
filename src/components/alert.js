import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
} from 'react-bootstrap';

const AlertComp = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map((alert) => (

    <Alert key={alert.id} variant={alert.alertType}>
     <span className="text-center"> {alert.msg}</span>
    </Alert>

));

const mapStateToProps = (state) => ({
  alerts: state.Alert,
});

export default connect(mapStateToProps, {})(AlertComp);
