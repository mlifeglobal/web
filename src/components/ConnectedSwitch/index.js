import { connect } from "react-redux";
import { Switch } from "react-router-dom";

function mapStateToProps(state) {
  return {
    location: state.router.location
  };
}

export default connect(mapStateToProps)(Switch);
