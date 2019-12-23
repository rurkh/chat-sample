import { connect } from 'react-redux';
import Login from '../../components/Login';
import { loginStart } from '../../actions/auth.actions';

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
  user: state.user,
});

export default connect(mapStateToProps, {
  onLoginPress: loginStart,
})(Login);
