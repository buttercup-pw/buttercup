import ms from 'ms';
import { lockArchive } from '../../shared/actions/archives';
import { getAllArchives } from '../../shared/selectors';

const __cache = {
  timer: null
};

export const setupArchiveActions = store => ({
  lockAllArchives() {
    const archives = getAllArchives(store.getState());
    if (archives) {
      archives.forEach(
        ({ id, status }) =>
          status !== 'locked' ? store.dispatch(lockArchive(id)) : ''
      );
    }
  },
  lockArchiveTimer() {
    if (__cache.timer) {
      clearTimeout(__cache.timer);
    }
    const state = store.getState();

    if (
      state.settings &&
      !state.settings.windowIsFocused &&
      state.settings.secondsUntilArchiveShouldClose !== '0'
    ) {
      __cache.timer = setTimeout(() => {
        this.lockAllArchives();
      }, ms(state.settings.secondsUntilArchiveShouldClose + 's'));
    }
  }
});