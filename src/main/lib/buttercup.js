import {
  importFromKDBX,
  importFrom1PIF,
  importFromLastPass,
  importFromBitwarden,
  importFromButtercup,
  importFromCSV
} from '@buttercup/importer';
import { ImportTypes } from '../../shared/buttercup/types';

/**
 * Import archive from file
 *
 * @export
 * @param {string} type
 * @param {string} filename
 * @param {string} password
 */
export function importArchive(type, filename, password) {
  switch (type) {
    case ImportTypes.KEEPASS:
      return importFromKDBX(filename, password).then(archive =>
        archive.getHistory()
      );
    case ImportTypes.ONE_PASSWORD:
      return importFrom1PIF(filename).then(archive => archive.getHistory());
    case ImportTypes.LASTPASS:
      return importFromLastPass(filename).then(archive => archive.getHistory());
    case ImportTypes.BITWARDEN:
      return importFromBitwarden(filename).then(archive =>
        archive.getHistory()
      );
    case ImportTypes.BUTTERCUP:
      return importFromButtercup(filename).then(archive =>
        archive.getHistory()
      );
    case ImportTypes.BROWSERS:
      return importFromCSV(filename).then(archive => archive.getHistory());
    default:
      throw new Error('Wrong import type provided');
  }
}
