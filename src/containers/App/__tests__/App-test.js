import expect from 'expect';
import ConnectedApp, { PlainApp } from '../App';
import { load as loadUser } from '../../../redux/modules/user';


describe('App', () => {
  it('should load user before rendering', (done) => {
    const getState = () => ({
      user: {}
    });
    const dispatch = expect.createSpy();

    PlainApp.fetchData(getState, dispatch)
      .then(() => {
        expect(dispatch)
          .toHaveBeenCalledWith(loadUser('gaeron'));
      })
      .then(done);
  });

  it('should not load user when already loaded', (done) => {
    const getState = () => ({
      user: {
        loaded: true,
        username: 'gaearon',
        name: 'User name'
      }
    });
    const dispatch = expect.createSpy().andCall(() => {
      throw new Error('Should not be called');
    });

    PlainApp.fetchData(getState, dispatch)
      .then(() => {
        done();
      });
  });
});
